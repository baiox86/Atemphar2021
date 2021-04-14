
<template>
  <div class="eventos">
    <div class="menuEventos" >
      <button class="menuE" id="menuE" v-on:click="switchTable('Todos')" :disabled="title === 'Eventos'">Todos</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Palestra')" :disabled="title === 'Palestra'">Palestra</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Simposio')" :disabled="title === 'Simpósio'">Simpósio</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Workshop')" :disabled="title === 'Workshop'">Workshop</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Piquenique')" :disabled="title === 'Piquenique'">Piquenique</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Jantar Solidariedade')" :disabled="title === 'Jantar Solidariedade'">Jantar Solidariedade</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Mini-Gala')" :disabled="title === 'Mini-Gala'">Mini-Gala</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Apoio Solidariedade')" :disabled="title === 'Apoio Solidariedade'">Apoio Solidariedade</button>
      <button class="menuE" id="menuE" v-on:click="switchTable('Tertulia')" :disabled="title === 'Tertulia'">Tertúlia</button>
    </div>
    <br>
    <h1>{{this.title}}</h1>
    <br>
    <div class="dados">
      <div id="fields" class="tabela">
        <div class="buttonsRegisto">
          <div class="buttonAdicionarEvento">
            <button v-on:click="toggleRegistarEvento()">
              <i class="fas fa-plus-circle"></i> {{this.registarText}}
            </button>
          </div>
          <div v-if="isEventos" class="buttonInscricaoEvento">
            <button v-on:click="toggleInscricaoEvento()">
              <i class="fas fa-plus-circle"></i> {{this.criarInscricaoEventoText}}
            </button>
          </div>
          <div v-if=isPalestra class="buttonAdicionarPresenca">
           <button  v-on:click="toggleRegistarPalestra()">
            <i class="fas fa-plus-circle"></i> {{this.registarPresencaText}}
            </button>
          </div>

        </div>
        <template v-if="registarEvento">
          <keep-alive>
          <RegistarEvento/>
          </keep-alive>
        </template>

        <template v-if="registarPresencasPalestra && isPalestra">
          <keep-alive>
          <RegistarPresencasPalestra/>
          </keep-alive>
        </template>

        <template v-if="criarInscricaoEvento && isEventos">
          <keep-alive>
          <RegistoCriacaoInscricaoEvento/>
          </keep-alive>
        </template>
        
        <table class="w3-table-all" id="tabela" v-if="!registarPresencasPalestra">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Local</th>
            <th>Inquérito</th>
            <th>Preço</th>
            <th>Link Inscrição </th>
            <!--<th>Dados </th>-->
          </tr>
          <!--ID, nome, tipo, data, local -->
          <tr class="conteudo" v-for="(event, tableKey) in allEvents" :key="tableKey">
            <td class="idEvento">{{ event.idEvento }}</td>
            <td class="verButton">
              <a v-on:click="ver(event.idEvento)" title="Ver Ficha de Evento">{{ event.nomeEvento }}</a>
            </td>
            <td>{{ event.tipoEvento == 'Simposio'? 'Simpósio' : event.tipoEvento}}</td>
            <td>{{ event.dataEvento }}</td>
            <td>{{ event.localEvento }}</td>
            <td v-if="event.idInquerito !== -1">Sim</td>
            <td v-else>Não</td>
            <td>{{event.custo}}</td>

            <td v-if="event.tokenRegisto !== '' && event.tokenRegisto != null "><a v-bind:href="link + 'inscricaoEvento/' + event.tokenRegisto" target="Inscricao" >Link</a></td>
            <td v-else>Sem Link</td>
            <td class="buttons">
              <div class="editarButton">
                <a class="fas fa-user-edit" v-on:click="editar(event)" title="Editar"></a>
              </div>
              <div class="verInscricoesButton">
                <a class="fas fa-check" v-on:click="editarInscricoes(event)" title="Consultar Inscrições"></a>
              </div>
              <div class="associarInqueritoButton">
                <a class="fas fa-file-alt" v-on:click="associarInquerito(event.idEvento)" title="Associar Inquérito"></a>
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
import FormAddInquerito from "../../registos/FormAddInquerito";
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
    components: {FormAddInquerito},
    mounted(){
    bus.$on('refreshEventos', ()=>{
        this.registarEvento = false;
        this.switchTable('Todos');
        this.title = 'Eventos';
    })
  },
  activated() {
    axios
      .get("api/getAllEventos", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allEvents = response.data;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });
    this.title = "Eventos";

  },
  data() {
    return {
      allEvents: '',
      tableKey: 0,
      title: "Eventos",
      registarEvento: false,
      registarPresencasPalestra : false,
      criarInscricaoEvento : false,
      registarText: "Registar Evento",
      registarPresencaText: "Introduzir Presenças",
      criarInscricaoEventoText: "Criar inscrição para Evento"
    };
  },
  computed: {
    isPalestra: function(){
      return this.title === "Palestras"
    },
    link(){
      return window.location.href;
    },
    isEventos: function(){
      return this.title === "Eventos"
    },
  },
  methods: {
        associarInquerito(data){
          bus.$emit("associarInquerito",data);
        },
    toggleRegistarEvento(){
      this.registarEvento = !this.registarEvento;
       if(this.registarEvento){
          this.registarText = "Voltar";
      }else{
          this.registarText = "Registar Evento";
      }
    },
    toggleRegistarPalestra(){
      this.registarPresencasPalestra = !this.registarPresencasPalestra;
      if(this.registarPresencasPalestra){
          this.registarPresencaText = "Voltar";
      }else{
          this.registarPresencaText = "Introduzir Presenças";
      }
    },
     toggleInscricaoEvento(){
      this.criarInscricaoEvento = !this.criarInscricaoEvento;
      if(this.criarInscricaoEvento){
          this.criarInscricaoEventoText = "Voltar";
      }else{
          this.criarInscricaoEventoText = "Criar inscrição para Evento";
      }
    },

    ver(idEvento) {
      bus.$emit("viewEvento", idEvento);
    },
    editar(data) {
      bus.$emit("editarEvento", data);
    },
    editarInscricoes(data) {
      bus.$emit("editInscricoes", data);
    },
    switchTable(tipo){
      if(tipo === 'Todos'){
        axios
      .get("api/getAllEventos", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allEvents = response.data;
        this.title = 'Eventos';
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });
      }else{
        axios
      .get("api/getAllEventosOfTipo/" + tipo, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allEvents = response.data;
        this.title = (tipo === "Simposio" ? "Simpósios" :
                      tipo === "Tertulia" ? "Tertúlias" :
                      tipo === "Jantar Solidariedade" ? "Jantares de Solidariedade" :
                      tipo === "Apoio Solidariedade" ? "Apoios de Solidariedade" :
                      tipo + 's' );
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        this.tableKey++;
        this.$forceUpdate();
      })
      .catch(error => {

      });
        
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.eventos h1 {
  text-align: center;
}

.eventos {
  font-family: "Open Sans";
}

.eventos .menuEventos {
  text-align: center;
  display: flex;
  width: 100%;
}
.eventos .menuEventos button {
  border: 1px solid #5BABCD;
  padding: 3px;
  cursor: pointer;
  color: white;
}

.eventos .menuEventos .menuE{
  background-color: rgb(39, 134, 175);
  flex-grow: 1;
}

.eventos .menuEventos #menuE:hover {
  background-color: #5BABCD;
}

.eventos .menuEventos .menuE:enabled{
  background-color: rgb(39, 134, 175);
}

.eventos .menuEventos .menuE:disabled {
  background-color: #5BABCD;
}
.eventos .tabela {
  width: 100%;
  margin-bottom: 20px;
}

.eventos #tabela{
  width: 80%;
  margin: auto;
}
.eventos .dados .idEvento {
  width: 5%;
}
.eventos .tabela table td {
  border: 1px solid #ccc;
}

.eventos .dados table td {
  width: 15%;
}

.eventos .tabela table th {
  border: 1px solid #ccc;
}
.eventos .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}

.eventos .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.eventos .verButton {
  cursor: pointer;
}
.eventos .verButton a:hover {
  font-weight: bold;
}

.eventos .editarButton {
  cursor: pointer;
}

.eventos .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.eventos .verInscricoesButton {
  cursor: pointer;
}

.eventos .verInscricoesButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.eventos .associarInqueritoButton {
  cursor: pointer;
}

.eventos .associarInqueritoButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.eventos .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
}

.eventos .buttonAdicionarEvento {
  margin-bottom: 5px;
}

.eventos .buttonAdicionarEvento button {
  text-align: center;
  cursor: pointer;
  background-color: #a2e3fb;
  border: none;
  border-radius: 4px;
}

.eventos .buttonInscricaoEvento {
  margin-bottom: 5px;

}

.eventos .buttonInscricaoEvento button:hover {
  background-color: #43cbfd;;
}

.eventos .buttonAdicionarPresenca button {
  text-align: center;
  cursor: pointer;
  background-color: #a2e3fb;
  border: none;
  border-radius: 4px;
}


.eventos .buttonsRegisto{
  margin-bottom: 5px;
  display: -webkit-box;
  margin-left:15%;
}

.eventos .buttonsRegisto button {
  text-align: center;
  cursor: pointer;
  background-color: #a2e3fb;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
}

.eventos .buttonAdicionarEvento button:hover {
  background-color: #43cbfd;;
}
.eventos .buttonAdicionarPresenca button:hover {
  background-color: #43cbfd;;
}
</style>