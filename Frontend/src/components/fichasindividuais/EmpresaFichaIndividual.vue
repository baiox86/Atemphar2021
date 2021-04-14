
<template :key="componentKey">
<div class="fichaEmpresa">
    <br>
    <div class="voltar">
      <button  v-on:click="switchComponent('AllEmpresasTable')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>

    <h1>{{this.empresaData.nomeEmpresa}}</h1>
    <br>
    <div class="dadosEmpresa">
      <div class="dadosGerais">
        <div class="nome">
          <label>Morada:</label>
          <br>
          {{this.empresaData.moradaEmpresa}}
        </div>

        <div class="telefoneEmpresa">
          <label>Telefone:</label>
          <br>
          {{this.empresaData.telefoneEmpresa? this.empresaData.telefoneEmpresa : "N.A."}}
        </div>

        <div>
          <label>Email:</label>
          <br>
          {{this.empresaData.emailEmpresa? this.empresaData.emailEmpresa : "N.A."}}
        </div>

        <div>
          <label>NIF:</label>
          <br>
          {{this.empresaData.nifEmpresa}}
        </div>

        <div>
          <label>Obs:</label>
          <br>
          {{this.empresaData.observacoes}}
        </div>

      </div>
    </div>

    <br>

    <template v-if="this.countEmpresarios">
      <div class="empresarios">
        <h2>Representantes / Empresários: {{this.countEmpresarios}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <th>Nome</th>
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.empresarioData"
                :key="componentKey"
              >
                <td class="verButton">
                  <a v-on:click="verPessoa(parts.idPessoa)" title="Ver Ficha de Pessoa">{{ parts.nome }}</a>
                </td>
                <td class="buttons">
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <div class="buttonAdicionarEmpresario">
      <button v-if="!showFormEmpresarios" type="button" v-on:click="enableFormEmpresarios()">
        <i class="fas fa-user-plus"></i> Inserir Empresário
      </button>
    </div>

    <div v-if="showFormEmpresarios">
      <FormNovoEmpresario
        :idEmpresa="idEmpresa"
      ></FormNovoEmpresario>
      <div class="adicionarEmpresarioCancelar">
        <button type="button" v-on:click="disableFormEmpresarios()">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
    </div>
    <br>
    <br>

    <template v-if="this.countDonativosEmpresa > 0">
      <div class="apoiosRealizou">
        <h2>Donativos que realizou: {{this.countDonativosEmpresa}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <th>Quantidade:</th>
                <th>Data:</th>
                <th>Obs.:</th>
              </tr>
              <tr
                class="conteudo"
                v-for="(donativo, componentKey) in this.donativosEmpresaData"
                :key="componentKey"
              >
                <td>{{ donativo.quantidadeDonativo}}</td>
                <td>{{ donativo.dataDonativo}}</td>
                <td>{{ donativo.observacoes}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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

import { bus } from "../../main.js";
var self = this;
//import router from "../router"
export default {
  props: {
    idEmpresa: {
      type: String,
      required: true
    }
  },
  created() {
  },
  activated() {
    axios
      .get("api/getDadosEmpresa/" + this.idEmpresa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.empresaData = response.data[0];
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        //---------------------------
        axios
          .get("api/getDadosEmpresariosEmpresa/" + this.idEmpresa, {
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
            this.countEmpresarios = response.data.length;
            this.empresarioData = response.data;
            this.$nextTick(this.forceRerender());
          })
          .catch(error => {
            this.error = error;
          });
      })
      .catch(error => {
        this.error = error;
      });
    axios
          .get("api/getDonativosEmpresa/" + this.idEmpresa, {
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
            this.countDonativosEmpresa = response.data.length;
            this.donativosEmpresaData = response.data;
          })
          .catch(error => {

          });
  },
  deactivated() {
    this.empresaData = [],
    this.globalComponentKey = 0,
    this.empresarioData = [],
    this.donativosEmpresaData = [],
    this.componentKey = 0,
    this.showFormEmpresarios = false,
    this.countEmpresarios = 0,
    this.countDonativosEmpresa = 0
  },
  data() {
    return {
      empresaData: [],
      globalComponentKey: 0,
      empresarioData: [],
      donativosEmpresaData: [],
      componentKey: 0,
      showFormEmpresarios: false,
      //estatisticas:
      countEmpresarios: 0,
      countDonativosEmpresa: 0
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
      this.palestrasComponentKey += 1;
    },
    enableFormEmpresarios() {
      this.showFormEmpresarios = true;
    },
    
    disableFormEmpresarios() {
      this.showFormEmpresarios = false;
    },
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    verPessoa(id) {
      bus.$emit("viewPessoa", id);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

.fichaEmpresa h1 {
  text-align: center;
}
.fichaEmpresa h2 {
  text-align: center;
  background-color: linen;
}

.fichaEmpresa .voltar button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.fichaEmpresa .voltar i {
  font-size: 17px;
  margin-right: 3px;
}
.fichaEmpresa .voltar button:hover {
  background-color: #fdf5e6
}

.fichaEmpresa {
  font-family: "Open Sans";
}
.fichaEmpresa .dadosEmpresa {
  background-color: rgb(238, 222, 192);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fichaEmpresa .dadosGerais {
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

.fichaEmpresa .dadosGerais label {
  font-weight: bold;
}

.fichaEmpresa .nome {
  grid-column-start: 1;
}

.fichaEmpresa .telefoneEmpresa {
  grid-column-start: 2;
}

.fichaEmpresa .tabela {
  width: 70%;
}


.fichaEmpresa .tabela table th {
  border: 1px solid #ccc;
}
.fichaEmpresa .tabela table td {
  border: 1px solid #ccc;
}
.fichaEmpresa .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}

.fichaEmpresa .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fichaEmpresa .verButton {
  cursor: pointer;
}
.fichaEmpresa .verButton a:hover {
  font-weight: bold;
}


.fichaEmpresa .apagarButton {
  cursor: pointer;
}

.fichaEmpresa .apagarButton a:hover {
  font-weight: bold;
}

.fichaEmpresa .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}

.fichaEmpresa .buttonAdicionarEmpresario {
  float: right;
  margin-right: 18%;
}

.fichaEmpresa .buttonAdicionarEmpresario button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEmpresa .buttonAdicionarEmpresario button:hover {
  background-color: #f88e68;
}

.fichaEmpresa .adicionarEmpresarioCancelar {
  float: right;
  margin-right: 18%;
}

.fichaEmpresa .adicionarEmpresarioCancelar button {
  text-align: center;
  cursor: pointer;
  background-color: #f7ae94;
  border: none;
  border-radius: 4px;
}

.fichaEmpresa .adicionarEmpresarioCancelar button:hover {
  background-color: #f88e68;
}

</style>