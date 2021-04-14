
<template :componentAux="componentAux">
  <div class="menuTabelaPessoas">
    <div class="menuPessoas">
      <button class="menuP" id="menuP" v-on:click="switchTable('AllPersonsTable')" :disabled="componentAux === 'AllPersonsTable'">Todas</button>
      <button class="menuP" id="menuP" v-on:click="switchTable('AllStaffTable')" :disabled="componentAux === 'AllStaffTable'">Staff</button>
      <button class="menuP" id="menuP" v-on:click="switchTable('AllAmigoSocioTable')" :disabled="componentAux === 'AllAmigoSocioTable'">Amigo Sócio</button>
      <button class="menuP" id="menuP" v-on:click="switchTable('AllEmpresarioTable')" :disabled="componentAux === 'AllEmpresarioTable'">Empresário</button>
     <!-- <button class="menuP" id="menuP" v-on:click="wipAlert()">Sócio Efetivo</button> -->
      <button class="menuP" id="menuP" v-on:click="switchTable('AllOradorTable')" :disabled="componentAux === 'AllOradorTable'">Orador</button>
      <button class="menuP" id="menuP" v-on:click="switchTable('AllParticipanteTable')" :disabled="componentAux === 'AllParticipanteTable'">Participante</button>
    </div>
    <br>
    <h1>{{this.title}}</h1>
    <br>
    <keep-alive>
    <component :is="componentAux"></component>
    </keep-alive>
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
import Vue from 'vue';
//import router from "../router"
export default {
  mounted(){
  },
  data() {
    return {
      componentAux: "AllPersonsTable",
      title: 'Todas'
    };
  },
  methods: {
    switchTable: function(table){
      switch(table){
        case 'AllPersonsTable': this.title = 'Pessoas'
        break;
        case 'AllStaffTable': this.title = 'Staff'
        break;
        case 'AllAmigoSocioTable': this.title = 'Amigos Sócios'
        break;
        case 'AllEmpresarioTable': this.title = 'Empresários'
        break;
        case 'AllOradorTable': this.title = 'Oradores'
        break;
        case 'AllParticipanteTable': this.title = 'Participantes'
      }
      this.componentAux = table;
    },
    wipAlert: function(){
      alert('Work in Progress!');
    }
  }
};


</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");


.menuTabelaPessoas {
  font-family: "Open Sans";
}
.menuTabelaPessoas .menuPessoas{
  text-align: center;
  display: flex;
  width: 100%;
}
.menuTabelaPessoas .menuPessoas button{
  border: 1px solid #B3CC47;
  padding: 3px;
  cursor: pointer;
  color: white;
}

.menuTabelaPessoas .menuPessoas .menuP{
  background-color: rgb(140, 167, 20);
  flex-grow: 1;
}
.menuTabelaPessoas .menuPessoas #menuP:hover{
  background-color: #B3CC47;
  
}
.menuTabelaPessoas .menuPessoas .menuP:disabled {
  background-color: #B3CC47;
  color: white;
}

.menuTabelaPessoas .menuPessoas .menuP:enabled {
  background-color: rgb(140, 167, 20);
}


</style>