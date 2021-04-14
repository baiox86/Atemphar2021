
<template>
  <div class="tabelaOrador">
    <div class="dados">
      <div id="fields" class="tabela">
        <table class="w3-table-all">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <!--<th>Dados</th>-->
          </tr>
          <tr class="conteudo" v-for="(users, key) in allOrador" :key="key">
            <td class="idPessoa">{{ users.idOrador }}</td>
            <td class="verButton">
              <a v-on:click="ver(users.idOrador)" title="Ver Ficha de Pessoa">{{ users.nome }}</a>
            </td>
            <td>{{users.email}}</td>
            <td>{{users.telefone}}
            <td class="buttons">
              <!--<div class="verButton">
                  <a v-on:click="ver(users.idPessoa)"> Ver </a>
              </div>-->
              <div class="editarButton">
                <a class="fas fa-user-edit" v-on:click="editar(users)" title="Editar"></a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
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

var self = this;
import { bus } from "../../../main.js";
//import router from "../router"
export default {
  activated() {
    axios
      .get("api/getAllOradores", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allOrador = response.data;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });
  },
  data() {
    return {
      allOrador: null
    };
  },
  computed: {},
  methods: {
    ver(idPessoa) {
      bus.$emit("viewPessoa", idPessoa);
    },
    editar(data) {
      bus.$emit("editarPessoa", data);
    }
  }
};


</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

.tabelaOrador h1 {
  text-align: center;
}

.tabelaOrador {
  font-family: "Open Sans";
}

.tabelaOrador .tabela .conteudo:hover{
  font-weight: bold;
  background-color: #e2e2e2
  
}
.tabelaOrador .tabela {
  width: 70%;
  margin-bottom: 20px;
}
.tabelaOrador .dados .idPessoa {
  width: 3%;
}
.tabelaOrador .tabela table td {
  border: 1px solid #ccc;
}

.tabelaOrador .dados table td {
  width: 25%;
}

.tabelaOrador .tabela table th {
  border: 1px solid #ccc;
}

.tabelaOrador .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabelaOrador .verButton {
  cursor: pointer;
}
.tabelaOrador .verButton a:hover {
  font-weight: bold;
}

.tabelaOrador .editarButton {
  cursor: pointer;
}

.tabelaOrador .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;
}

.tabelaOrador .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}
</style>