<template>
<div class= "all">
<div class="atempharlogo">
  <div class="imagem">
    <a href="http://www.atemphar.org">
      <img src="../assets/logo_atemphar.png">
    </a>
  </div>
    <div class="txtTitle">
    Plataforma de Dados
    </div> 
      <template v-if="!(PanelComponent === 'LoginScreen')">
      <div class="logoutButton" v-on:click="logout"> Logout </div>
      </template>
</div>
<div class="menu" id="menuTopBar">
  <!-- botões do menu -->
  <button id="menuPessoa" class="menuItem Pessoas" v-on:click="switchComponent('PersonsTablesMenu')" :disabled="PanelComponent === 'PersonsTablesMenu'">Pessoas</button>
  <button id="menuEvento" class="menuItem Eventos" v-on:click="switchComponent('EventsTablesMenu')" :disabled="PanelComponent === 'EventsTablesMenu'">Eventos</button>
  <button id="menuEmpresa" class="menuItem Empresa" v-on:click="switchComponent('AllEmpresasTable')" :disabled="PanelComponent === 'AllEmpresasTable'">Empresas</button>
  <button id="menuInquerito" class="menuItem Inquerito" v-on:click="switchComponent('InqueritosTablesMenu')" :disabled="PanelComponent === 'InqueritosTablesMenu'">Inquéritos</button>
  <button id="menuRelatorio" class="menuItem Relatorio" v-on:click="switchComponent('RelatorioGlobalBase')" :disabled="PanelComponent === 'RelatorioGlobalBase'">Relatórios</button>
</div>
</div>
</template>

<script>
/* eslint-disable */ 
import { bus } from "../main.js";
var axios = require("axios");
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) { 
        bus.$emit("logout");
      }
 });

var self = this;
export default {
  props: {
        PanelComponent: {
            type: String,
            required: true
        }
  },
  name: 'Index',
   methods: {
    tempClick: function (event) {

    },
    logout: function(){
      bus.$emit("logout");
      sessionStorage.removeItem("token");

    },
    switchComponent(comp) {
      bus.$emit('switchComp', comp);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');


.all .atempharlogo{
  background-image: url("../assets/campo_trigo.jpg");
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100%;
  
}

.all .atempharlogo .imagem{
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 10px;
  
}

.all .atempharlogo .imagem img{
  width: 90%;
  margin-top: 10px;
  
}
.all .atempharlogo .txtTitle {
  grid-column-start: 2;
  grid-row-start: 3;
  color: #FFFFFF;
  font-family: "Berlin Sans FB";
  font-size: 5vw;
  margin-right: 20px;
}
.all .helpButton{
  color: #FFFFFF;
  font-family: "Berlin Sans FB";
  cursor: pointer;
  font-size: 15px;
  grid-column-start: 1;
  margin-left: 15px;
  margin-top: 5px;
  width: 15%;
}

.all  .logoutButton{
  text-align: right;
  color: #FFFFFF;
  cursor: pointer;
  font-family: "Berlin Sans FB";
  font-size: 15px;
  grid-column-start: 2;
  margin-top: 5px;
  margin-right: 20px;
  grid-row-start: 1;
  width: 10%;
  justify-self: end;

}

.all .menu{
  width: 100%;
  overflow: hidden;
  display: flex
}
.all .menu button {
  border: none;
  outline: none;
  cursor: pointer;
  /*padding: 20px 5.48vw;*/
  padding: 20px 2.48vw;
  transition: 0.3s;
}

.all .menuItem {
  font-size: 3vw;
  font-family: "Open Sans";
  margin: auto;
  /*width: 25%;*/
  width: 15%;
  
}

.all .menuItem.Pessoas {
  background-color: #B3CC47;
  flex-grow: 4;
}


.all #menuPessoa:hover{
  background-color: rgb(140, 167, 20);
}

.all .menuItem.Pessoas:disabled {
  background-color: rgb(140, 167, 20);
  color: white;
  text-underline-position: under;
  text-decoration-line: underline;
}

.all .menuItem.Pessoas:enabled {
  background-color: #B3CC47;
}

.all .menuItem.Eventos{
  background-color: #5BABCD;
  flex-grow: 4;
}

.all #menuEvento:hover{
  /*background-color:rgb(33, 76, 150);*/
  background-color: rgb(39, 134, 175);
}

.all .menuItem.Eventos:enabled{
  background-color:#5BABCD;
}

.all .menuItem.Eventos:disabled{
  background-color:rgb(39, 134, 175);
  color: white;
  text-underline-position: under;
  text-decoration-line: underline;

}

.all .menuItem.Inquerito{
  background-color: #EF864A;
  flex-grow: 4;
}

.all #menuInquerito:hover{
  background-color: rgb(236, 107, 32);
}

.all .menuItem.Inquerito:disabled{
  background-color: rgb(236, 107, 32);
  color: white;
  text-underline-position: under;
  text-decoration-line: underline;
}

.all .menuItem.Inquerito:enabled{
  background-color: #EF864A;
}

.all .menuItem.Empresa{
  background-color: #FFDB3D;
  flex-grow: 4;
}

.all #menuEmpresa:hover{
  background-color: rgb(238, 199, 26);
}

.all .menuItem.Empresa:disabled{
  background-color: rgb(238, 199, 26);
  color: white;
  text-underline-position: under;
  text-decoration-line: underline;
}

.all .menuItem.Empresa:enabled{
  background-color: #FFDB3D;
}

.all .menuItem.Relatorio{
  background-color: #EA599D;
  flex-grow: 4;
}


.all #menuRelatorio:hover{
  background-color: rgb(221, 61, 136);
}

.all .menuItem.Relatorio:disabled{
  background-color: rgb(221, 61, 136);;
  color: white;
  text-underline-position: under;
  text-decoration-line: underline;
}

.all .menuItem.Relatorio:enabled{
  background-color: #EA599D;
}

</style>
