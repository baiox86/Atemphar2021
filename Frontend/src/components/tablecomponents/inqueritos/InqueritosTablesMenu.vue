
<template>
  <div class="inqueritos">
    <br>
    <h1>{{this.title}}</h1>
    <br>
    <div class="dados">
      <div id="fields" class="tabela">
        <div class="buttonsRegisto">
            <div class="buttonAdicionarInquerito">
                <button v-on:click="toggleCriarInquerito()">
                    <i class="fas fa-plus-circle"></i> {{this.criarInqueritoText}}
                </button>
            </div>
        </div>
          <template v-if="criarInquerito">
              <keep-alive>
                  <FormAddInquerito/>
              </keep-alive>
          </template>
        
        <table class="w3-table-all" id="tabela" v-if="this.criarInquerito === false">
          <tr>
            <th>ID Inquérito</th>
            <th>ID Evento</th>
            <th>Nome Evento</th>
            <th>Data Evento</th>
            <th>Link</th>
            <th>Nº Questões</th>
            <th>Nº Respostas</th>
            <th>Estado</th>
            <!--<th>Dados </th>-->
          </tr>
          <!--ID, nome, tipo, data, local -->
          <tr class="conteudo" v-for="(inquerito, id) in allInqueritos" :key="id">
            <td class="idEvento">{{ inquerito.id }}</td>
            <td>{{ inquerito.idEvento }}</td>
            <td>{{ inquerito.nomeEvento }}</td>
            <td>{{ inquerito.dataEvento }}</td>
            <td><a :href="link + 'inquerito/' + inquerito.link" target="Inquerito">Link</a></td>
            <td>{{ inquerito.nrQuestoes }}</td>
            <td>{{ inquerito.nrRespostas }}</td>
            <td>{{inquerito.estado == 1 ? 'Ativo' : 'Fechado'}}</td>
            <td class="buttons">
              <div class="estadoToggleButton">
                <a class="fas fa-check" v-on:click="alterarEstado(inquerito)" title="Alterar Estado"></a>
              </div>
              <div class="listarRespostasButton">
                <a class="fas fa-file-alt" v-on:click="listarRespostas(inquerito)" title="Listar Respostas"></a>
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
  data() {
    return {
      allInqueritos: [],
      title: "Inquéritos",
      criarInquerito:false,
      criarInqueritoText : "Criar novo inquérito"
    };
  },
  activated() {
    axios
      .get("api/getAllInqueritosEvento", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allInqueritos = response.data;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {

      });
    this.title = "Inquéritos";
  },
  computed: {
    link(){
      return window.location.href;
    }
  },
  methods: {
      toggleCriarInquerito(){
          this.criarInquerito = !this.criarInquerito;
          if(this.criarInquerito){
              this.criarInqueritoText = "Voltar";
          }else {
            this.criarInqueritoText = "Criar novo inquérito";
          }
    },
    listarRespostas(inquerito) {
      bus.$emit("listarRespostasInquerito", inquerito);
    },
    alterarEstado(inquerito) {
      axios
              .patch(`api/editEstadoInquerito/${inquerito.id}/${inquerito.idEvento}`,null, {
                withCredentials: true,
                headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
              })
              .then(response => {
                inquerito.estado = 1-inquerito.estado;
                if( inquerito.estado === 0) {
                  this.$toasted.show("Inquérito fechado com sucesso!");
                }
                else {
                  this.$toasted.show("Inquérito ativado com sucesso!");
                }

                if(response.status == 409){
                  this.$toasted.error("Ocorreu um erro");
                }

              })
              .catch(error => {
                if(error.response.status === 401){
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
              });
    },
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.inqueritos h1 {
  text-align: center;
}

.inqueritos {
  font-family: "Open Sans";
}


.inqueritos .tabela {
  width: 100%;
  margin-bottom: 20px;
}

.inqueritos #tabela{
  width: 80%;
  margin: auto;
}
.inqueritos .dados .idEvento {
  width: 5%;
}
.inqueritos .tabela table td {
  border: 1px solid #ccc;
}

.inqueritos .dados table td {
  width: 15%;
}

.inqueritos .tabela table th {
  border: 1px solid #ccc;
}
.inqueritos .tabela .conteudo:hover {
  font-weight: bold;
  background-color: #e2e2e2;
}

.inqueritos .dados {
  display: flex;
  align-items: center;
  justify-content: center;
}

.inqueritos .verButton {
  cursor: pointer;
}
.inqueritos .verButton a:hover {
  font-weight: bold;
}

.inqueritos .editarButton {
  cursor: pointer;
}

.inqueritos .editarButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.inqueritos .estadoToggleButton {
  cursor: pointer;
}

.inqueritos .estadoToggleButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.inqueritos .estadoToggleButton {
  cursor: pointer;
}

.inqueritos .estadoToggleButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.inqueritos .listarRespostasButton {
  cursor: pointer;
}

.inqueritos .listarRespostasButton a:hover {
  font-weight: bold;
  font-size: 13px;

}

.inqueritos .dados .buttons {
  border-color: white;
  background-color: white;
  border-top: none;
}


.inqueritos .buttonAdicionarInquerito {
  margin-bottom: 5px;

}

.inqueritos .buttonsRegisto{
  margin-bottom: 5px;
  display: -webkit-box;
  margin-left:10%;
}

.inqueritos .buttonsRegisto button {
  text-align: center;
  cursor: pointer;
  background-color: rgba(246, 136, 72, 0.91);
  border: none;
  border-radius: 4px;
}

.inqueritos .buttonAdicionarInquerito button:hover {
  background-color: rgba(217, 107, 44, 0.91);
}
</style>