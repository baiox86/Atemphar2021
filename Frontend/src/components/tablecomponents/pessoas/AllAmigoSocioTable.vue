
<template>
  <div class="tabelaAmigoSocio">
    <div class="dados">
      <div id="fields" class="tabela">
        <div class="buttonAdicionarDonativo">
          
          <button v-on:click="toggleRegistarDonativo()">
            <template v-if="showFormDonativo">
              <i class="fas fa-angle-left"></i> Cancelar
            </template>
            <template v-else>
               <i class="fas fa-plus-circle"></i> Registar Donativo
            </template>
          </button>
        </div>
        <div>
          <template v-if="showFormDonativo">
            <RegistarDonativo :tipoDonativo="'p'"/>
          </template>
        </div>
        <table class="w3-table-all" id="tabela">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Estado do Estatuto: </th>
            <!--<th>Dados</th>-->
          </tr>
          <tr class="conteudo" v-for="(users, tableKey) in allAmigoSocio" :key="tableKey">
            <td class="idPessoa">{{ users.idPessoa }}</td>
            <td class="verButton">
              <a v-on:click="ver(users.idPessoa)" title="Ver Ficha de Pessoa">{{ users.nome }}</a>
            </td>
            <td>{{users.email}}</td>
            <td>{{users.telefone}}</td>
            <td>{{checkEstadoAmigoSocio(users.dataExpiracao)}} </td>
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
    bus.$on('refreshAmigoSocio', () =>{
        this.tableKey++;
        this.showFormDonativo = false;
        this.$forceUpdate();
    })
  },
  activated() {
    axios
      .get("api/getAllAmigoSocio", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allAmigoSocio = response.data;
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
      allAmigoSocio: null,
      showFormDonativo: false,
      tableKey: 0
    };
  },
  computed: {},
  methods: {
    toggleRegistarDonativo(){
      this.showFormDonativo = !this.showFormDonativo;
    },
    ver(idPessoa) {
      bus.$emit("viewPessoa", idPessoa);
    },
    editar(data) {
      bus.$emit("editarPessoa", data);
    },
    checkEstadoAmigoSocio(data){
      try{
      if(new Date(data).getTime() < new Date().getTime()){
        return "Expirado";
      }else{
        return "Válido";
      }
      }catch(error){

      }
    }
  }
};


</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

.tabelaAmigoSocio h1 {
  text-align: center;
}

.tabelaAmigoSocio {
  font-family: "Open Sans";
}

.tabelaAmigoSocio .tabela .conteudo:hover{
  font-weight: bold;
  background-color: #e2e2e2
  
}
.tabelaAmigoSocio .tabela {
  width: 100%;
  margin-bottom: 20px;
}
.tabela #tabela{
  width: 70%;
  margin: auto;
}
.tabelaAmigoSocio .dados .idPessoa {
  width: 3%;
}
.tabelaAmigoSocio .tabela table td {
  border: 1px solid #ccc;
}

.tabelaAmigoSocio .dados table td {
  width: 25%;
}

.tabelaAmigoSocio .tabela table th {
  border: 1px solid #ccc;
}

.tabelaAmigoSocio .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabelaAmigoSocio .verButton {
  cursor: pointer;
}
.tabelaAmigoSocio .verButton a:hover {
  font-weight: bold;
}

.tabelaAmigoSocio .editarButton {
  cursor: pointer;
}

.tabelaAmigoSocio .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;
}

.tabelaAmigoSocio .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}

.tabelaAmigoSocio .buttonAdicionarDonativo {
  margin-bottom: 5px;
  margin-left: 15%;
}

.tabelaAmigoSocio .buttonAdicionarDonativo button {
  text-align: center;
  cursor: pointer;
  background-color: #a7ec82;
  border: none;
  border-radius: 4px;
}

.tabelaAmigoSocio .buttonAdicionarDonativo button:hover {
  background-color: #72d33d;
}
</style>