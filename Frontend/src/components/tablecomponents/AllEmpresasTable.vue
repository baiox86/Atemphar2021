
<template>
  <div class="empresas">
    <br>
    <h1>Empresas</h1>
    <br>
    <div class="dados">
      <div id="fields" class="tabela">
        <div class="buttonsRegisto">
        <div class="buttonAdicionarEmpresa">
          <button v-on:click="toggleRegistarEmpresa()">
            <i class="fas fa-plus-circle"></i> {{this.registarEmpresaText}}
          </button>
          </div>
        <div class="buttonAdicionarDonativo">
          <button v-on:click="toggleRegistarDonativo()">
            <i class="fas fa-plus-circle"></i> {{this.registarDonativoText}}
          </button>
        </div>
        </div>

        <template v-if="registarEmpresa">
          <keep-alive>
          <RegistarEmpresa/>
          </keep-alive>
        </template>

        <template v-if="showFormDonativo">
            <RegistarDonativo :tipoDonativo="'e'"/>
          </template>
        
        <table class="w3-table-all" id="tabela">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <!--<th>Dados </th>-->
          </tr>
          <!--ID, nome, tipo, data, local -->
          <tr class="conteudo" v-for="(empresa, tableKey) in allEmpresas" :key="tableKey">
            <td class="verButton"><a v-on:click="ver(empresa.idEmpresa)" title="Ver Ficha de Empresa"> {{ empresa.nomeEmpresa }} </a></td>
            <td>{{ empresa.emailEmpresa }}</td>
            <td>{{ empresa.telefoneEmpresa }}</td>
            <td class = "buttons">
              <div class="editarButton">
                  <a class="fas fa-user-edit" v-on:click="editarEmpresa(empresa)" title="Editar"> </a>
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
import { bus } from "../../main.js";
//import router from "../router"
export default {
  created() {
    bus.$on('refreshEmpresa', () =>{
        this.showFormDonativo = false;
        this.$forceUpdate();
    })
  },
  mounted(){
    bus.$on('refreshEmpresas', () =>{
        this.registarEmpresa = false;
         axios.get("api/getAllEmpresas", {withCredentials: true, headers: { Authorization: `Bearer ` + sessionStorage.getItem("token")}})
        .then(response => {(this.allEmpresas = response.data)
        if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
        }).catch(error => {
        this.error = error;
      });
        this.tableKey++;
        this.$forceUpdate();
    })
  },
  activated(){
    axios.get("api/getAllEmpresas", {withCredentials: true, headers: { Authorization: `Bearer ` + sessionStorage.getItem("token")}})
        .then(response => {(this.allEmpresas = response.data)
        if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
        }).catch(error => {
        this.error = error;
      });
  },
  data() {
    return {
      allEmpresas: [],
      tableKey: 0,
      registarEmpresa: false,
      registarEmpresaText: "Registar Empresa",
      showFormDonativo: false,
      registarDonativoText: "Registar Donativo"
    }
  },
  methods: {
    toggleRegistarDonativo(){
      this.showFormDonativo = !this.showFormDonativo;
      if(this.showFormDonativo){
        this.registarDonativoText = "Cancelar";
      }else{
        this.registarDonativoText = "Registar Donativo";
      }
    },
    toggleRegistarEmpresa(){
      this.registarEmpresa = !this.registarEmpresa;
      if(this.registarEmpresa){
        this.registarEmpresaText = "Cancelar";
      }else{
        this.registarEmpresaText = "Registar Empresa";
      }
    },
    ver(idEmpresa){
        bus.$emit('viewEmpresa', idEmpresa);
    },
    editarEmpresa(data){
        bus.$emit("editarEmpresa", data);
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");


.empresas h1 {
  text-align: center;
}

.empresas{
	font-family: "Open Sans";
}

.empresas .menuEventos{
  text-align: center;
  display: flex;
}

.empresas .tabela{
	width: 100%;
  margin-bottom: 20px;
}

.empresas #tabela{
  width: 80%;
  margin: auto;
}

.empresas .tabela table td{
  border: 1px solid #ccc;
}

.empresas .dados table td{
  width: 25%;
}

.empresas .tabela table th{
  border: 1px solid #ccc;
}
.empresas .tabela .conteudo:hover{
  font-weight: bold;
  background-color: #e2e2e2
  
}

.empresas .dados{
	display: flex;
  align-items: center;
  justify-content: center;
}

.empresas .verButton{
  cursor: pointer;
  
}
.empresas .verButton a:hover{
  font-weight: bold;
}

.empresas .editarButton{
  cursor: pointer;
  
}

.empresas .editarButton a:hover{
  font-weight: bold;
  font-size: 13px;

}

.empresas .dados .buttons{
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}

.empresas .buttonsRegisto{
  margin-bottom: 5px;
  margin-left: 15%;
  display: -webkit-box;
}

.empresas .buttonsRegisto button {
  text-align: center;
  cursor: pointer;
  background-color: #ffe885;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
}

.empresas .buttonsRegisto button:hover {
  background-color: #ffdd47;
}

</style>