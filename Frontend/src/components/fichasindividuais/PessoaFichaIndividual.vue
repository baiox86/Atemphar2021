
<template :key="componentKey">
  <div class="fichaPessoa">
    <br>
    <div class="voltar">
      <button v-on:click="switchComponent('PersonsTablesMenu')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>
    <h1>Ficha Individual de {{this.pessoaData.nome}}</h1>
    <br>
    <div class="dadosPessoa">
      <div class="dadosGerais">
        <div class="nome">
          <label>Nome:</label>
          <br>
          {{this.pessoaData.nome}}
        </div>
        <div class="genero">
          <label>Género:</label>
          <br>
          {{this.pessoaData.genero == 'M' ? 'Masculino' : this.pessoaData.genero == 'F' ? 'Feminino' : 'Outro'}}
        </div>
        <div class="idade">
          <label>Data Nasc.:</label>
          <br>
          {{this.pessoaData.dataNasc}}
        </div>
        <div class="email">
          <label>Email:</label>
          <br>
          {{this.pessoaData.email}}
        </div>
        <div class="telefone">
          <label>Telefone:</label>
          <br>
          {{this.pessoaData.telefone}}
        </div>
        <div class="zona">
          <label>Zona:</label>
          <br>
          {{this.pessoaData.zona}}
        </div>
        <div class="nif">
          <label>NIF:</label>
          <br>
          {{this.pessoaData.nif}}
        </div>

        <div class="comoConheceu">
          <label>Como conheceu a associação:</label>
          <br>
          <!-- código para formatar e apresentar dados -->
          <template
            v-if="this.pessoaData.comoConheceu === 'Redes Sociais' || this.pessoaData.comoConheceu === 'E-Mail'"
          >{{this.pessoaData.comoConheceu}}</template>
          <template
            v-else-if="this.pessoaData.comoConheceu === 'Pessoa'"
          >{{this.pessoaData.atravesQuemNome}}</template>
          <template
            v-else-if="this.pessoaData.comoConheceu == null || this.pessoaData.comoConheceu === ''"
          >N/A</template>
          <template v-else>{{this.pessoaData.comoConheceu}}</template>
          <br>
        </div>
        <div class="numPessoasTrouxe">Trouxe {{this.numPessoasTrouxe}} pessoas à organização</div>
        <div
          class="primeiroEventoData"
        ><label>Primeiro evento foi no dia: </label>{{this.primeiroEventoData.dataEvento}}</div>
        <template v-if="numApoio > 0">
          <div class="numPontosStaff">
          <label>Pontuação Staff:</label>
          <br>
           {{this.pontosStaff}}</div>
        </template>

        <template v-if="this.numDonativos > 0">
      <!--<label> Dados de Amigo Sócio: </label>-->
      <div class="morada">
        <label>Morada: </label>
        <br>
        {{this.amigoSocioData[0].morada}}
      </div>
        <div class="codP">
          <label>Código Postal: </label>
          <br>
          {{this.amigoSocioData[0].codPostal}}
        </div>
        <div class="estatuto">
          <label>Estatuto de Amigo Sócio:</label> Expira dia {{this.amigoSocioData[0].dataExpiracao}}
        </div>
        
      </template>
      </div>
      
    </div>

    <template v-if="this.numEventos > 0">
      <div class="eventosParticipou">
        <h2>Eventos em que participou: {{this.numEventos}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <!--<th> Ações </th>-->
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.participacaoData"
                :key="componentKey"
              >
                <td class="verButton">
                  <a
                    v-on:click="verEvento(parts.idEvento)"
                    title="Ver Ficha de Evento"
                  >{{ parts.nomeEvento }}</a>
                </td>
                <td>{{ parts.tipoEvento }}</td>
                <td class="buttons">
                  <div class="apagarButton">
                    <a
                      class="far fa-trash-alt"
                      v-on:click="apagarParticipacao(parts.idEvento)"
                      title="Apagar"
                    ></a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <template v-if="this.numOrador > 0">
      <div class="eventosApresentou">
        <h2>Eventos que apresentou: {{this.numOrador}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <!--<th>Ações</th>-->
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.oradorData"
                :key="componentKey"
              >
                <td class="verButton">
                  <a
                    v-on:click="verEvento(parts.idEvento)"
                    title="Ver Ficha de Evento"
                  >{{ parts.nomeEvento }}</a>
                </td>
                <td>{{ parts.tipoEvento }}</td>

                <td class="buttons">
                  <div class="editarButton">
                    <a class="fas fa-user-edit" v-on:click="editarEvento(parts)" title="Editar"></a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <template v-if="this.numApoio > 0">
      <div class="apoiosRealizou">
        <h2>Apoios que realizou: {{this.numApoio}}</h2>
        <div class="dados">
          <div id="fields" class="tabela">
            <table class="w3-table-all">
              <tr>
                <th>Evento:</th>
                <th>Tipo:</th>
                <th>Pontos:</th>
              </tr>
              <tr
                class="conteudo"
                v-for="(parts, componentKey) in this.apoioData"
                :key="componentKey"
              >
                <td class="verButton">
                  <a
                    v-on:click="verEvento(parts.idEvento)"
                    title="Ver Ficha de Evento"
                  >{{ parts.nomeEvento }}</a>
                </td>
                <td>{{ parts.tipoEvento}}</td>
                <td>{{ parts.pontos }}</td>
                <td class="buttons">
                  <div class="editarButton">
                    <a class="fas fa-user-edit" v-on:click="editarApoio(parts.idApoio)" title="Editar"></a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>

    <template v-if="this.numDonativos > 0">
      <div class="apoiosRealizou">
        <h2>Donativos que realizou: {{this.numDonativos}}</h2>
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
                v-for="(parts, componentKey) in this.amigoSocioData"
                :key="componentKey"
              >
                <td>{{ parts.quantidadeDonativo}}</td>
                <td>{{ parts.dataDonativo }}</td>
                <td>{{ parts.observacoes}}</td>
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
  }
);

import { bus } from "../../main.js";
var self = this;
//import router from "../router"
export default {
  props: {
    idPessoa: {
      required: true
  }
  },
  created() {},
  activated() {
    axios
      .get("api/getDadosPessoa/" + this.idPessoa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {


        this.pessoaData = response.data;
        axios
          .get("api/getDadosPrimeiroEventoPessoa/" + this.idPessoa, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          })
          .then(response => {
            this.primeiroEventoData = response.data[0];
            if (response.status === 401) {
              this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
          })
          .catch(error => {

          });

        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });

    axios
      .get("api/getEventosOrador/" + this.idPessoa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradorData = response.data;
        this.numOrador = this.oradorData.length;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        this.forceRerender();
      })
      .catch(error => {

      });

    axios
      .get("api/getPessoasTrouxe/" + this.idPessoa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.numPessoasTrouxe = response.data[0].count;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });

    axios
      .get("api/getEventosParticipante/" + this.idPessoa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.participacaoData = response.data;
        this.numEventos = this.participacaoData.length;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });

    axios
      .get("api/getApoiosStaff/" + this.idPessoa, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        if (response.status === 200) {
          this.apoioData = response.data;
          this.numApoio = this.apoioData.length;
          this.calcularPontos();
        }
      })
      .catch(error => {
        this.error = error;
      });

    axios
      .get("api/getDonativosPessoa/" + this.idPessoa, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem("token")
        }
      })
      .then(response => {
        this.amigoSocioData = response.data;
        this.numDonativos = response.data.length;
        this.$nextTick(this.forceRerender());
      })
      .catch(error => {

      });

    this.$nextTick(this.forceRerender());
  },
  deactivated() {
    this.pessoaData = [];
    this.primeiroEventoData = [];
    this.participacaoData = [];
    this.oradorData = [];
    this.amigoSocioData = [];
    this.apoioData = [];
    this.globalComponentKey = 0;
    //estatisticas
    this.numEventos = 0;
    this.numOrador = 0;
    this.numApoio = 0;
    this.numDonativos = 0;
    this.numPessoasTrouxe = 0;
    this.pontosStaff = 0;
    this.idadePessoa = 0;
  },
  data() {
    return {
      pessoaData: [],
      oradorData: [],
      apoioData: [],
      primeiroEventoData: [],
      participacaoData: [],
      amigoSocioData: [],
      globalComponentKey: 0,
      //estatisticas
      numEventos: 0,
      numOrador: 0,
      numApoio: 0,
      numDonativos: 0,
      numPessoasTrouxe: 0,
      pontosStaff: 0,
      idadePessoa: 0
    };
  },
  methods: {
    editarApoio(id){
      bus.$emit("editarApoio", id);
    },
    calcularPontos() {
      this.apoioData.forEach(el => {
        this.pontosStaff += parseInt(el.pontos, 10);
      });
    },
    forceRerender() {
      this.componentKey += 1;
      this.palestrasComponentKey += 1;
      this.$forceUpdate();
    },
    verEvento(idEvento) {
      bus.$emit("viewEvento", idEvento);
    },
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    editarEvento(data) {
      bus.$emit("editarEvento", data);
    },
    apagarParticipacao(id) {
      if (confirm("De certeza que pretende apagar esta participação?")) {
        axios
          .delete("api/deleteParticipacao/" + this.idPessoa + "/" + id, {
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
            if (response.status === 201) {
              bus.$emit("refreshFichaPessoa", "Participação eliminada!");
            }
          })
          .catch(error => {
            this.$toasted.error("Erro a eliminar participação!");

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

.fichaPessoa h1 {
  text-align: center;
}
.fichaPessoa h2 {
  text-align: center;
  background-color: linen;
}

.fichaPessoa {
  font-family: "Open Sans";
}

.fichaPessoa .voltar button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.fichaPessoa .voltar i {
  font-size: 17px;
  margin-right: 3px;
}
.fichaPessoa .voltar button:hover {
  background-color: #fdf5e6
}
.fichaPessoa .dadosPessoa {
  background-color: rgb(238, 222, 192);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fichaPessoa .dadosGerais {
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

.fichaPessoa .dadosGerais label {
  font-weight: bold;
}

.fichaPessoa .nome {
  grid-column-start: 1;
}

.fichaPessoa .idade {
  grid-column-start: 1;
}

.fichaPessoa .genero{
  grid-column-start: 2;
}

.fichaPessoa .tabela {
  width: 70%;
}

.fichaPessoa .tabela table td {
  border: 1px solid #ccc;
}

.fichaPessoa .tabela table th {
  border: 1px solid #ccc;
}

.fichaPessoa .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}

.fichaPessoa .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fichaPessoa .verButton {
  cursor: pointer;
}
.fichaPessoa .verButton a:hover {
  font-weight: bold;
}

.fichaPessoa .apagarButton {
  cursor: pointer;
}

.fichaPessoa .apagarButton a:hover {
  font-weight: bold;
}

.fichaPessoa .editarButton {
  cursor: pointer;
}

.fichaPessoa .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;
}

.fichaPessoa .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
  width: 1%;
}
</style>