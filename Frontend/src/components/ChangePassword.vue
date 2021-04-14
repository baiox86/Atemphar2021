
<template>
  <div class="novaPass">
    <div class="atempharlogo">
      <div class="imagem">
        <a href="http://www.atemphar.org">
          <img src="../assets/logo_atemphar.png">
        </a>
      </div>
      <div class="txtTitle">Plataforma de Dados</div>
    </div>
    <br>
    <div class="conteudo">
      <div id="login" class="w3-panel">
        <h1>Alterar Password</h1>
        <div id="fields" class="campos">
          Nova Password:
          <label>
            <input type="password" name="passNova" v-model="input.newPassword">
          </label>
          <br>Confirmar Password:
          <label>
            <input type="password" name="passConfirm" v-model="input.confPassword">
          </label>
          <br>
          <label>
            <button type="submit" v-on:click.prevent="altPassword()">Submeter</button>
          </label>
        </div>
      </div>
    </div>

    <br>
    <footer class="creditos">
      <img src="../assets/ipl_logo.png">
      <label class="uc">
        ESTG, Engenharia Informática,
        <br>UC Projeto Informático, 2019/20
      </label>
      <div class="autores">
        <label class="titulo">Desenvolvido por:</label>
        <br>
        <label>[Francisco Silva e Ricardo Soares]@2020, [João Dias e Cristiana Sousa]@2019</label>
      </div>
    </footer>
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

//import router from "../router"
export default {
  data() {
    return {
      input: {
        newPassword: "",
        confPassword: ""
      },
      isTokenValid: "",
      userID: ""
    };
  },
  mounted() {},
  methods: {
    altPassword: function(event) {
      if (
        this.input.newPassword === "" ||
        this.input.newPassword === null ||
        this.input.confPassword === "" ||
        this.input.newPassword === null
      ) {
        this.$toasted.error("Todos os campos são obrigatórios!");
        return;
      }
      if (this.input.newPassword === this.input.confPassword) {
        let password = this.input.confPassword.replace(/["\"\'"]/g, "");
        axios
          .put("/api/changePassword/" + this.$route.params.token, {
            passwordChange: password
          })
          .then(response => {
            if (response.status === 201) {
              this.$toasted.error("Password alterada com sucesso!");
              this.$router.push("/");
            }
          })
          .catch(error => {
            this.$toasted.error("Erro a contactar o servidor.");

          });
      } else {
        this.$toasted.error("As passwords introduzidas não correspondem!");
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://fonts.googleapis.com/css?family=Actor");

.novaPass .atempharlogo {
  background-image: url("../assets/campo_trigo.jpg");
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100%;
}

.novaPass .atempharlogo .imagem {
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 10px;
}

.novaPass .atempharlogo .imagem img {
  width: 90%;
  margin-top: 10px;
}
.novaPass .atempharlogo .txtTitle {
  grid-column-start: 2;
  grid-row-start: 3;
  color: #ffffff;
  font-family: "Berlin Sans FB";
  font-size: 5vw;
  margin-right: 20px;
}

#login {
  margin: auto;
  width: 25%;
  padding: 10px;
  border: 3px solid lightgray;
  overflow: hidden;
  
}

.novaPass .conteudo{
  min-height: calc(100vh - 360px);
}

#fields {
  padding: 3px;
}

.novaPass .campos input {
  margin-bottom: 15px;
  width: 100%;
}

.novaPass .creditos {
  background-color: #f1f1f1;
  display: grid;
  height: 59px;

}

.novaPass .creditos img {
  width: 150px;
  grid-column-start: 1;
  grid-row-start: 1;
  margin-left: 30px;
}

.novaPass .creditos .uc {
  grid-column-start: 2;
  grid-row-start: 1;
  align-self: end;
  justify-self: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.novaPass .creditos .autores {
  grid-column-start: 3;
  grid-row-start: 1;
  align-self: center;
  justify-self: end;
  margin-right: 30px;
  font-size: 10px;
  font-family: "Actor";
}

.novaPass .creditos .titulo {
  font-weight: bold;
}
</style>