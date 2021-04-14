
<template :key="componentKey">
  <div class="fichaEvento">
    <br>
    <div class="voltar">
      <button  v-on:click="switchComponent('EventsTablesMenu')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>

    <h1>{{this.eventData.nomeEvento}}</h1>
    <br>
    <div class="dadosEvento">
      <div class="dadosGerais">
        <div class="nome">
          <label>Nome:</label>
          <br>
          {{this.eventData.nomeEvento}}
        </div>

        <div class="tipo">
          <label>Tipo de Evento:</label>
          <br>
          {{this.eventData.tipoEvento}}
        </div>

        <div>
          <label>Data:</label>
          <br>
          {{this.eventData.dataEvento}}
        </div>

        <div>
          <label>Local:</label>
          <br>
          {{this.eventData.localEvento}}
        </div>

        <div>
          <label>Obs:</label>
          <br>
          {{this.eventData.observacoes}}
        </div>

        <div v-if="this.eventData.nomeOrador">
          <label>Orador:</label>
          <br>
          {{this.eventData.nomeOrador}}
        </div>

        <div v-if="this.eventData.tipoEvento === 'Workshop'">
          <label>Custo:</label>
          <br>
          {{this.custo}}€
        </div>

        <!-- total de participantes, total de novos membros ,idade media participantes, gráfico idades? 
        Pessoa com mais Participações, Pessoa com mais Acompanhantes-->
        <div>
          <label>Total de novos participantes:</label>
          <br>
          {{this.countNovosMembros}}
        </div>

      </div>
    </div>

    <br>

    <template v-if="this.countParticipantes">
      <div class="participantes">
        <h2>Participantes: {{this.countParticipantes}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <!--<th>ID</th>-->
                <th>Nome</th>
                <th>Primeiro Evento?</th>
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.participanteData"
                :key="componentKey"
              >
                <!--<td class="idPessoa">{{ parts.idPessoa }}</td>-->
                <td class="verButton">
                  <a v-on:click="verPessoa(parts.idPessoa)" title="Ver Ficha de Pessoa">{{ parts.nome }}</a>
                </td>
                <td>{{ parts.flagPrimeiroEvento===1? "Sim" : "Não"}}</td>
                <td class="buttons">
                  <!--<div class="verButton">
                  <a v-on:click="ver(event.idEvento)">Ver</a>
                  </div>-->
                  <div class="apagarButton">
                    <a class="far fa-trash-alt" v-on:click="apagarParticipante(parts.idPessoa)" title="Apagar"></a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <div class="buttonAdicionarParticipante">
      <button v-if="!showFormParticipantes" type="button" v-on:click="enableFormParticipantes()">
        <i class="fas fa-user-plus"></i> Inserir participante
      </button>
    </div>

    <div v-if="showFormParticipantes">
      <FormNovoParticipante
        :idEvento="idEvento"
        :listaParticipantes="participanteData"
        :orador="eventData.idOrador"
      ></FormNovoParticipante>
      <div class="adicionarParticipanteCancelar">
        <button type="button" v-on:click="disableFormParticipantes()">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
    </div>

    <br>
    <br>
    <template v-if="this.eventData.tipoEvento === 'Simposio'">
      <div class="tabelaPalestras">
        <h2>Palestras: {{this.countPalestras}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <!--<th>ID</th>-->
                <th>Nome</th>
                <th>Orador</th>
                <!--<th>Data </th>
                <th>Local </th>-->
                <th>Observacoes</th>
              </tr>
              <tr
                class="conteudo"
                v-for="(palestra, componentKey) in this.palestraSimposioData"
                :key="componentKey"
              >
                <!--<td class="idPalestra">{{ palestra.idPalestra }}</td>-->
                <td>{{ palestra.nomeEvento }}</td>
                <td>{{ palestra.nomeOrador }}</td>
                <!--<td>{{ palestra.dataEvento }}</td>
                <td>{{ palestra.localEvento }}</td>-->
                <td>{{ palestra.observacoes}}</td>
                <td class="buttons">
                  <!--<div class="verButton">
                  <a v-on:click="ver(event.idEvento)">Ver</a>
                  </div>-->

                  <!--
                  <div class="editarButton">
                    <a class="fas fa-user-edit" v-on:click="editar(palestra.idEvento)" title="Editar"></a>
                  </div> -->
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <template v-if="this.eventData.tipoEvento === 'Simposio'">
      <div class="adicionarPalestra">
        <button v-if="!showFormPalestras" type="button" v-on:click="enableFormPalestras()">
          <i class="fas fa-plus-circle"></i> Inserir palestra
        </button>
      </div>
      <div v-if="showFormPalestras">
        <FormAddPalestraSimposio :idEvento="idEvento" :dataEvento="eventData.dataEvento" :localEvento="eventData.localEvento"></FormAddPalestraSimposio>
        <div class="adicionarPalestraCancelar">
          <button type="button" v-on:click="disableFormPalestras()">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </div>
    </template>

    <br>
    <br>
    <template
      v-if="this.eventData.tipoEvento === 'Simposio' || this.eventData.tipoEvento === 'Palestra' || this.eventData.tipoEvento === 'Tertulia'"
    >
      <h2>Inquéritos: {{this.countInqueritos}} </h2>
      
      <div class="buttonsInquerito">
        <div class="adicionarInquerito">
          <button v-if="!showFormInqueritos" type="button" v-on:click="enableFormInqueritos()">
            <i class="fas fa-pen"></i> Inserir Inquérito
          </button>
        </div>
        <div class="resultados">
          <button v-on:click="toggleEnableCharts()">Ver Resultados</button>
        </div>
        
      </div>
      <template v-if="enableCharts && this.countInqueritos > 0">
      <RelatorioStatsInquerito :dataInqueritos="inqueritosData"/> 
      </template>
      <div v-if="showFormInqueritos">
        <FormAddRespostaInquerito :idEvento="idEvento"></FormAddRespostaInquerito>
        
        <div class="adicionarInqueritoCancelar">
          <button type="button" v-on:click="disableFormInqueritos()">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
        
      </div>
      <br>
      <br>
    </template>
    <br>
    <div class="tabelaApoios">
      <template v-if="this.countApoios">
      <div class="participantes">
        <h2>Apoios: {{this.countApoios}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <!--<th>ID</th>-->
                <th>Nome Staff</th>
                <th>Data Início</th>
                <th>Data Fim </th>
                <th>Pontos </th>
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.apoiosEvento"
                :key="componentKey"
              >
                <td class="verButton">
                  <a v-on:click="verPessoa(parts.idPessoa)">{{ parts.nome }}</a>
                </td>
                <td class="dataInicio">{{parts.dataInicio}}</td>
                <td class="dataFim">{{parts.dataFim}}</td>
                <td class="pontos">{{parts.pontos}}</td>
                <td class="buttons">
                  <div class="editarButton">
                    <a class="fas fa-user-edit" v-on:click="editarApoio(parts)" title="Editar"></a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template> 
    </div>
    <br>
    <br>
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

import { bus } from "../../main.js";
var self = this;
//import router from "../router"
export default {
  props: {
    idEvento: {
      required: true
    }
  },
  created() {
    bus.$on("submitPart", text => {
      this.showFormParticipantes = false;
      this.showFormPalestras = false;
      window.alert(text);
      this.globalComponentKey++;
    });
  },
  activated() {
    axios
      .get("api/getDadosEvento/" + this.idEvento, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {

        this.eventData = response.data;
        this.custo = +this.eventData.custo;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        //---------------------------
        axios
          .get("api/getDadosParticipantesEvento/" + this.idEvento, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.status === 401) {
              this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
            this.participanteData = response.data;
            this.countParticipantes = this.participanteData.length;
            this.participanteData.forEach(element => {
              this.countNovosMembros += element.flagPrimeiroEvento;
            });
          })
          .catch(error => {

          });
        if (this.eventData.tipoEvento === "Simposio") {
          axios
            .get("api/getAllPalestrasSimposio/" + this.idEvento, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ` + sessionStorage.getItem("token")
              }
            })
            .then(response => {
              if (response.status === 401) {
                this.$toasted.error("Sessão expirou.");
                bus.$emit("logout");
              }
              this.palestraSimposioData = response.data;
              this.countPalestras = this.palestraSimposioData.length;
            })
            .catch(error => {

            });
        }

        axios
          .get("api/getApoiosEvento/" + this.idEvento, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          })
          .then(response => {
            this.apoiosEvento = response.data;
            this.countApoios = response.data.length;
          })
          .catch(error => {

          });

        this.$nextTick(() => {
          this.$forceUpdate();
        });

        //------------------------------------------------------
      })
      .catch(error => {
        this.error = error;
      });

    axios
      .get("api/getDadosInquerito/" + this.idEvento, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        this.inqueritosData = response.data;
        this.countInqueritos = this.inqueritosData.length;
      })
      .catch(error => {

      });

    this.$nextTick(()=>{
      this.forceRerender();
    });
  },
  deactivated() {
    this.eventData = [];
    this.globalComponentKey = 0;
    this.participanteData = [];
    this.palestraSimposioData = [];
    this.inqueritosData = [];
    (this.custo = 0), (this.componentKey = 0);
    this.showFormParticipantes = false;
    this.showFormPalestras = false;
    this.showFormInqueritos = false;
    this.showStatsInqueritos = false;
    //estatisticas:
    this.countParticipantes = 0;
    this.countNovosMembros = 0;
    this.mostReferrals = [];
    this.countPalestras = 0;
    this.countInqueritos = 0;
    this.enableCharts = false;
  },
  data() {
    return {
      eventData: [],
      globalComponentKey: 0,
      participanteData: [],
      palestraSimposioData: [],
      inqueritosData: [],
      apoiosEvento: [],
      custo: 0,
      componentKey: 0,
      palestrasComponentKey: 0,
      showFormParticipantes: false,
      showFormPalestras: false,
      showFormInqueritos: false,
      enableCharts: false,
      //estatisticas:
      countParticipantes: 0,
      countNovosMembros: 0,
      countPalestras: 0,
      mostReferrals: 0,
      countInqueritos: 0,
      countApoios: 0
    };
  },
  methods: {
    toggleEnableCharts(){
      this.enableCharts = !this.enableCharts;
    },
    forceRerender() {
      this.componentKey += 1;
      this.palestrasComponentKey += 1;
    },
    enableFormParticipantes() {
      this.showFormParticipantes = true;
    },
    enableFormPalestras() {
      this.showFormPalestras = true;
    },
    enableFormInqueritos() {
      if (this.countInqueritos == this.countParticipantes + 1) {
        alert(
          "Número de inquéritos não pode exceder o número de participantes + orador!"
        );
        return;
      }
      this.showFormInqueritos = true;
    },
    disableFormParticipantes() {
      this.showFormParticipantes = false;
    },
    disableFormPalestras() {
      this.showFormPalestras = false;
    },
    disableFormInqueritos() {
      this.showFormInqueritos = false;
    },
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    verPessoa(id) {
      bus.$emit("viewPessoa", id);
    },
    editarApoio(id){
      bus.$emit("editarApoio", id);
    },
    apagarParticipante(id){
    if(confirm("De certeza que pretende apagar esta participação?")){
     axios
      .delete("api/deleteParticipacao/" + id + "/" + this.idEvento, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then((response) => {
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        if(response.status === 201){
          bus.$emit("submitPart", "Participação eliminada!");
        }
      })
      .catch(error => {
        this.$toasted.error("Erro a eliminar participação!")

      });
    }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

.fichaEvento h1 {
  text-align: center;
}
.fichaEvento h2 {
  text-align: center;
  background-color: linen;
}

.fichaEvento .voltar button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.fichaEvento .voltar i {
  font-size: 17px;
  margin-right: 3px;
}
.fichaEvento .voltar button:hover {
  background-color: #fdf5e6
}

.fichaEvento {
  font-family: "Open Sans";
}
.fichaEvento .dadosEvento {
  background-color: rgb(238, 222, 192);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fichaEvento .dadosGerais {
  display: inline-grid;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: oldlace;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 65px;
  padding-right: 65px;
  grid-row-gap: 20px;
}

.fichaEvento .dadosGerais label {
  font-weight: bold;
}

.fichaEvento .nome {
  grid-column-start: 1;
}

.fichaEvento .tipo {
  grid-column-start: 2;
}

.fichaEvento .tabela {
  width: 70%;
}

.fichaEvento .tabela table td {
  border: 1px solid #ccc;
}

.fichaEvento .tabela table th {
  border: 1px solid #ccc;
}
.fichaEvento .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}

.fichaEvento .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fichaEvento .verButton {
  cursor: pointer;
}
.fichaEvento .verButton a:hover {
  font-weight: bold;
}

.fichaEvento .editarButton {
  cursor: pointer;
}

.fichaEvento .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;
}

.fichaEvento .apagarButton {
  cursor: pointer;
}

.fichaEvento .apagarButton a:hover {
  font-weight: bold;
}

.fichaEvento .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}

.fichaEvento .buttonAdicionarParticipante {
  float: right;
  margin-right: 18%;
}

.fichaEvento .buttonAdicionarParticipante button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .buttonAdicionarParticipante button:hover {
  background-color: #f88e68;
}

.fichaEvento .adicionarParticipanteCancelar {
  float: right;
  margin-right: 18%;
}

.fichaEvento .adicionarParticipanteCancelar button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .adicionarParticipanteCancelar button:hover {
  background-color: #f88e68;
}

.fichaEvento .adicionarPalestra {
  float: right;
  margin-right: 18%;
}

.fichaEvento .adicionarPalestra button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .adicionarPalestra button:hover {
  background-color: #f88e68;
}

.fichaEvento .adicionarPalestraCancelar {
  float: right;
  margin-right: 18%;
}

.fichaEvento .adicionarPalestraCancelar button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .adicionarPalestraCancelar button {
  background-color: #f88e68;
}

.fichaEvento .buttonsInquerito {
  float: right;
  margin-right: 18%;
}

.fichaEvento .buttonsInquerito .resultados{
  margin-left: -83%;
  margin-top: -17%;
}

.fichaEvento .buttonsInquerito button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .buttonsInquerito button:hover {
  background-color: #f88e68;
}
.fichaEvento .adicionarInqueritoCancelar {
  float: right;
  margin-right: 18%;
}

.fichaEvento .adicionarInqueritoCancelar button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEvento .adicionarInqueritoCancelar button:hover {
  background-color: #f88e68;
}
</style>