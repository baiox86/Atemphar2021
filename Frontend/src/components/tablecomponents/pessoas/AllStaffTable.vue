
<template>
  <div class="tabelaStaff">
    <div class="dados">
      <div id="fields" class="tabela">
        <div class="buttonAdicionarApoio">
          <button v-on:click="toggleRegistarApoio()">
            <template v-if="registarApoio">
              <i class="fas fa-angle-left"></i> Cancelar
            </template>
            <template v-else>
               <i class="fas fa-plus-circle"></i> Registar Apoio
            </template>
          </button>
        </div>
        <div class="novoApoio">
          <template v-if="registarApoio">
            <keep-alive>
              <RegistarApoio/>
            </keep-alive>
          </template>
        </div>

        <table class="w3-table-all" id="tabela">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <!--<th>Dados</th>-->
          </tr>
          <tr class="conteudo" v-for="(users, key) in allStaff" :key="key">
            <td class="idPessoa">{{ users.idPessoa }}</td>
            <td class="verButton">
              <a v-on:click="ver(users.idPessoa)" title="Ver Ficha de Pessoa">{{ users.nome }}</a>
            </td>
            <td>{{ users.email}}</td>
            <td>{{users.telefone}}</td>
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
  mounted() {
    bus.$on("refreshStaff", () => {
      this.registarApoio = false;
      //refresh à lista de staffs se tiver sido inserido um novo staff
    });
  },
  activated() {
    axios
      .get("api/getAllStaff", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allStaff = response.data;
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
      allStaff: [],
      tableKey: 0,
      registarApoio: false
    };
  },
  computed: {},
  methods: {
    toggleRegistarApoio() {
      this.registarApoio = !this.registarApoio;
    },
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

.tabelaStaff h1 {
  text-align: center;
}

.tabelaStaff {
  font-family: "Open Sans";
}

.tabelaStaff .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}
.tabelaStaff .tabela {
  width: 100%;
  margin-bottom: 20px;
}

.tabelaStaff #tabela {
  width: 70%;
  margin: auto;
}
.tabelaStaff .dados .idPessoa {
  width: 3%;
}
.tabelaStaff .tabela table td {
  border: 1px solid #ccc;
}

.tabelaStaff .dados table td {
  width: 25%;
}

.tabelaStaff .tabela table th {
  border: 1px solid #ccc;
}

.tabelaStaff .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabelaStaff .verButton {
  cursor: pointer;
}
.tabelaStaff .verButton a:hover {
  font-weight: bold;
}

.tabelaStaff .editarButton {
  cursor: pointer;
}

.tabelaStaff .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;
}

.tabelaStaff .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}

.tabelaStaff .buttonAdicionarApoio {
  margin-bottom: 5px;
  margin-left: 15%;
}

.tabelaStaff .buttonAdicionarApoio button {
  text-align: center;
  cursor: pointer;
  background-color: #a7ec82;
  border: none;
  border-radius: 4px;
}

.tabelaStaff .buttonAdicionarApoio button:hover {
  background-color: #72d33d;
}
</style>