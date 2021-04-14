
<template>
  <div class="login">
    <br>
    <template v-if="!this.changePassBool">
      <div id="fazerLogin" class="w3-panel">
        <h1>Login</h1>
        <div id="fields" class="campos">
          <form>
          <label>
            <input type="email" name="username" v-model="input.username" placeholder="Username">
          </label>
          <label>
            <input type="password" name="password" v-model="input.password" placeholder="Password">
          </label>
          <br>
          <div class="buttons">
            <label>
              <button type="submit" v-on:click.prevent="doLogin()">Login</button>
            </label>
            
            <br>
            <label class="reset">
              <a v-on:click.prevent="show()">Esqueci-me da password</a>
            </label>
          </div>
          </form>
        </div>
      </div>
    </template>
    <template v-else>
      <div id="mudarPass" class="w3-panel">
        <div id="fields" class="camposMudarPass">
          <h3>Alterar Password</h3>
          <label>
            Introduza o seu email:
            <input type="email" v-model="input.username" placeholder="e-mail">
          </label>
          <label class="btnEnviar">
            <button v-on:click.prevent="alterPass()">Enviar</button>
          </label>
          <label class="btnCancelar">
            <button v-on:click.prevent="hide()">Cancelar</button>
          </label>
        </div>
      </div>
      <template v-if="alertBool">{{this.alertString}}</template>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
var axios = require("axios");
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) { 
        bus.$emit("logout");
      }
 });
 var instance = axios.create({
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          }
      });

//import router from "../router"
export default {
  name: "LoginScreen",
  data() {
    var here = this;
    return {
      input: {
        username: "",
        password: ""
      },
      changePassBool: false,
      alertBool: false,
      alertString: "Foi enviado um email com instruções."
    };
  },
  mounted() {
    axios
      .get("api/validateToken", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        if (response.status === 201) {
          this.$emit("auth", true);
        }
        if (response.status === 401) {
          this.$emit("auth", false);
        }
      });
  },
  activated() {
    this.input.username = "";
    this.input.password = "";
  },
  methods: {
     alterPass: function() {
      instance
        .post("api/requestPasswordReset", {
          username: this.input.username.replace(/["\"\'"]/g, "")},
        )
        .then(response => {
              this.alertString = "Foi enviado um email com instruções.";
              this.showAlert()
        })
         .catch(error =>{
          this.alertString = "Ocorreu um erro";
          this.showAlert()
        });
    },
    showAlert: function() {
      this.alertBool = true;
    },
    show: function() {
      this.changePassBool = true;
    },
    hide: function() {
      this.changePassBool = false;
      this.alertBool = false;
    },
    doLogin: function(event) {

      let data = {
        username: this.input.username.replace(/["\"\'"]/g, ""),
        password: this.input.password.replace(/["\"\'"]/g, "")
      };

      axios
        .post("api/login", data)
        .then(response => {
          sessionStorage.setItem("token", response.data.token);
          this.$emit("auth", true);
        })
        .catch(errors => {

          this.$toasted.error("Email ou Password incorrectos!");
        });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

#fazerLogin {
  width: 30%;
  padding: 10px;
  border: 3px solid lightgray;
  overflow: hidden;
}

#mudarPass {
  padding: 10px;
  border: 3px solid lightgray;
  width: 25%;
}

.login {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

#fields {
  padding: 3px;
}

.login .campos input {
  margin-bottom: 15px;
  width: 100%;
}

.login .campos button {
  cursor: pointer;
}

.login .campos .buttons {
  display: flex;
}



.login .campos a {
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
  color: #0645ad;
  text-decoration: underline;
}


.login .camposMudarPass button {
  cursor: pointer;
}

.login .camposMudarPass .btnEnviar {
  margin-left: 10px;
}

.login .camposMudarPass input {
  width: 75%;
}
</style>