<template>
  <div>
    <br>
    <h1>Editar Apoio</h1>
    <br>
    <div class="editarApoio">
      <div id="fields" class="fields">
        <template v-if="!isNovoStaff">
          <div class="staff">
            <label>Staff:<i class="obrigatorio">*</i></label>
            <br>
            <model-list-select
              :list="allStaff"
              v-model="input.inputStaff"
              option-value="idStaff"
              option-text="nome"
              placeholder="Escolher"
            ></model-list-select>
          </div>
        </template>
        <template v-else>
        <template v-if="isNovoStaff && !isNovaPessoa">
          <div class="novoStaff">
            <label>Novo Membro do Staff:</label>
            <model-list-select
            :list="allPessoasNotStaff"
            v-model="input.inputStaff"
            option-value="idPessoa"
            option-text="nome"
            placeholder="Escolher"
          ></model-list-select>
          </div>
          
        </template>
        <template v-if="isNovaPessoa">
        <div class="nome">
          <label>Nome:</label>
          <br>
          <input type="text" v-model="inputPessoa.nome" name="nome">
        </div>
        <div class="email">
          <label>Email:</label>
          <br>
          <input type="text" v-model="inputPessoa.email" name="email">
        </div>
        <div class="telefone">
          <label>Telefone:</label>
          <br>
          <input type="text" v-model="inputPessoa.telefone" name="telefone">
        </div>
        <div class="genero">
            <label>Género: </label>
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="m" value="M" > M
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="f"  value="F" > F
            <br>
        </div>
        <div class="zona">
          <label>Zona:</label>
          <br>
          <input type="text" v-model="inputPessoa.zona" name="zona">
        </div>
        <div class="idade">
          <label>Idade:</label>
          <br>
          <input type="text" v-model="inputPessoa.idade" name="idade">
        </div>
        <div class="nif">
          <label>NIF:</label>
          <br>
          <input type="text" v-model="inputPessoa.nif" name="nif">
        </div>
        <div class="comoConheceu">
          <label>Como Conheceu: </label>
          <br>
          <select v-model="inputPessoa.comoConheceu">
            <option>Pessoa</option>
            <option value="Local">Folheto em Local</option>
            <option>Redes Sociais</option>
            <option>E-Mail </option>
          </select>
          <template v-if="inputPessoa.comoConheceu === 'Pessoa' || inputPessoa.comoConheceu === 'Redes Sociais' || inputPessoa.comoConheceu === 'E-Mail'">
            <!-- conheceu através de uma pessoa -->
            <!-- listar pessoas -->
              <div class="atravesQuem">
                <model-list-select :list="allPessoa"
                     v-model="inputPessoa.atravesDe"
                     option-value="idPessoa"
                     option-text="nome"
                     placeholder="Escolher">
                </model-list-select>
              </div>
            
          </template> 
            <template v-else-if="inputPessoa.comoConheceu === 'Local'">
            <!-- conheceu através de um folheto num local -->
            <!--<label>Local:</label>
              <br>-->
              <div class="local">
                <input type="text" v-model="inputPessoa.atravesDe" name="local" placeholder="Local">
              </div>
            
          </template>
        </div>
        </template>
        <div class="botaoNovaPessoa">
          <a class="fas fa-user-plus">
            <input type="button" v-model="buttonTextPessoa" v-on:click="toggleNovaPessoa()">
          </a>
          <br>
        </div>
        </template>
        <div class="botaoNovoStaff">
            <a class="fas fa-user-plus">
              <input type="button" v-model="buttonTextStaff" v-on:click="toggleNovoStaff()">
            </a>
            <br>
        </div>
        <div class="evento">
          <label>Evento: Data: {{this.dataEvento = null ? "" : this.dataEvento }}</label>
          <br>
          <model-list-select
            :list="allEvents"
            v-model="input.inputEventos"
            option-value="idEvento"
            option-text="nomeEvento"
            placeholder="Escolher"
          ></model-list-select>
        </div>
        <div class="dataInicio">
          <label>Data Início:<i class="obrigatorio">*</i></label>
          <br>
          <input
            type="datetime-local"
            v-model="input.dataInicio"
            name="dataInicio"
            placeholder="Data Início"
          >
        </div>

        <div class="dataFim">
          <label>Data Fim:<i class="obrigatorio">*</i></label>
          <br>
          <input
            type="datetime-local"
            v-model="input.dataFim"
            name="dataFim"
            placeholder="Data Fim"
          >
        </div>

        <div class="descricao">
          <label>Descrição:</label>
          <br>
          <textarea type="text" v-model="input.descricao" name="descricao"></textarea>
        </div>

        <div class="pontos">
          <label>Pontos:<i class="obrigatorio">*</i></label>
          <br>
          <input type="number" v-model="input.pontos" name="pontos" min="0" max>
        </div>
        <div class="registar">
          <button class="registar" type="submit" v-on:click.prevent="submit()">
            <i class="far fa-save"></i> Registar
          </button>
        </div>
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

import { ModelListSelect } from "vue-search-select";
import { bus } from "../../main.js";
export default {
  activated() {
        this.input.inputStaff = this.dadosApoio.idStaff;
        this.input.inputEventos = this.dadosApoio.idEvento;
        this.input.descricao = this.dadosApoio.descricao;
        this.input.dataInicio = this.dadosApoio.dataInicio.substring(0, 22);
        this.input.dataFim =  this.dadosApoio.dataFim.substring(0, 22);
        this.input.pontos = this.dadosApoio.pontos;
    axios
      .get("api/getAllStaff", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allStaff = response.data;
        this.allStaff.push();
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        this.error = error;
      });
    axios
      .get("api/getAllEventos", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allEvents = response.data;
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        this.error = error;
      });
    axios
      .get("api/getAllPessoas", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoa = response.data;
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        this.error = error;
      });
    axios
      .get("api/getAllPessoasNotStaff", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoasNotStaff = response.data;
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        this.error = error;
      });
  },
  props: {
    dadosApoio: {
      required: true
    }
  },
  deactivated() {
    this.clearfields();
  },
  data() {
    var here = this;
    return {
      input: {
        inputStaff: "",
        inputPessoa: "",
        inputEventos: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
        pontos: ""
      },
      inputPessoa: {
        nome: "",
        inputPessoa: "",
        email: "",
        genero: "",
        telefone: "",
        zona: "",
        nif: "",
        comoConheceu: "Pessoa",
        atravesDe: ""
      },
      allStaff: [],
      allEvents: [],
      allPessoasNotStaff: [],
      allPessoa: [],
      dataEvento: "",
      isNovoStaff: false,
      isNovaPessoa: false,
      buttonTextPessoa: "Nova Pessoa",
      buttonTextStaff:  "Promover"
    };
  },
  watch: {
      'input.inputEventos': function(){
         axios.get("api/getDadosEvento/" + this.input.inputEventos, {withCredentials: true, headers: { Authorization: `Bearer ` + sessionStorage.getItem("token")}})
            .then(response => {
            this.dataEvento = response.data[0].dataEvento;
            this.countInqueritos = this.inqueritosData.length;
          }).catch(error => {if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }});
      }
  },
  methods: {
    toggleNovoStaff: function(){
        this.isNovoStaff = !this.isNovoStaff
      if(this.isNovoStaff){
        this.buttonTextStaff = "Cancelar"
      }else{
        this.buttonTextStaff = "Promover"
      }
    },
    toggleNovaPessoa: function() {
        this.isNovaPessoa = !this.isNovaPessoa
      if(this.isNovaPessoa){
        this.buttonTextPessoa = "Cancelar"
      }else{
        this.buttonTextPessoa = "Nova Pessoa"
      }
    },
    clearfields: function() {
      this.input.inputStaff = "";
      this.input.inputEventos = "";
      this.input.descricao = "";
      this.input.dataInicio = "";
      this.input.dataFim = "";
      this.input.pontos = "";
      this.isNovoStaff = false;
      this.isNovaPessoa = false;
    },
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    submit: function() {
      var idStaffAux
      //se não for um staff já existente
      if(this.isNovaPessoa || this.isNovoStaff){
      //se for uma pessoa completamente nova
        if(this.isNovaPessoa){
        //post pessoa

        }else if(this.isNovoStaff){
            idStaffAux = this.input.inputPessoa;
      }
          //promover pessoa
          //código de promoção aqui
      }else{
        //é um staff já existente
            idStaffAux = this.input.inputStaff;
      }

      
       if(idStaffAux === "" || idStaffAux == null || this.input.inputEventos === "" || this.input.inputEventos == null ||
     this.input.dataInicio === "" || this.input.dataInicio == null || this.input.dataFim === "" || this.input.dataFim == null
      || this.input.pontos === "" || this.input.pontos == null) {
        this.$toasted.error("Por favor preencher todos os campos obrigatórios.");
        return;
      }

      if(this.input.pontos < 0){
        this.$toasted.error("Os pontos não podem ser um valor negativo!");
        return;
      }

      if(this.input.dataInicio > this.input.dataFim){
        this.$toasted.error("A data de início do apoio não pode ser posterior à data de fim!");
        return;
      }


      axios
        .put(
          "api/editApoio/" + this.dadosApoio.idApoio,
          {
            idStaff: idStaffAux,
            idEvento: this.input.inputEventos,
            descricao: this.input.descricao,
            dataInicio: this.input.dataInicio,
            dataFim: this.input.dataFim,
            pontos: this.input.pontos
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          if (response.status === 201) {
            this.$toasted.error("Apoio inserido com sucesso!");
            this.clearfields();
            this.switchComponent('PersonsTablesMenu');
          }
        })
        .catch((errors, response) => {
          if (errors.response.status === 400) {
            this.$toasted.error("Campos incorrectos ou incompletos!");
          }

        });
    }
  },
  components: {
    ModelListSelect
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

h1 {
  text-align: center;
  font-family: "Open Sans";
}
.editarApoio {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}
.editarApoio .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}
.editarApoio .fields .obrigatorio{
  color: red;
}

.editarApoio .staff {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.editarApoio .botaoNovoStaff {
  margin-right: 115px;
  grid-row-start: 1;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.editarApoio .botaoNovoStaff input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.editarApoio .botaoNovoStaff a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.editarApoio .novoStaff {
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 115px;
}
.editarApoio .botaoNovaPessoa {
  margin-right: 115px;
  grid-row-start: 2;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.editarApoio .botaoNovaPessoa input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.editarApoio .botaoNovaPessoa a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.editarApoio .nome {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.editarApoio .nome input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .email {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}

.editarApoio .email input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.editarApoio .telefone input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
}

.editarApoio .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 5;
}

.editarApoio .idade input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .zona {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 5;
}

.editarApoio .zona input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 6;
}

.editarApoio .nif input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarApoio .comoConheceu {
  /*margin-right: 115px;*/
  grid-column-start: 2;
  grid-row-start: 6;
  width: 50%;
  display: -webkit-box;
  height: 35px;
}

.editarApoio .comoConheceu select {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 30px;
}

.editarApoio .comoConheceu .atravesQuem {
  margin-top: 11px;
  width: 110%;
  margin-left: 9px;
}

.editarApoio .comoConheceu .local {
  margin-top: 16px;
  width: 100%;
  margin-left: 9px;
}

.editarApoio .comoConheceu .local input{
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  width: 110%;
  height: 35px;
}

.editarApoio .evento {
  grid-column-start: 1;
  grid-row-start: 7;
  margin-left: 115px;
}

.editarApoio .dataInicio {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 7;
}
.editarApoio .dataInicio input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.editarApoio .dataFim {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 8;
}
.editarApoio .dataFim input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.editarApoio .descricao {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 9;
}
.editarApoio .descricao textarea {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  border: 1px solid #a1a0a0;
  resize: none;
  border-radius: 4px;
}
.editarApoio .pontos {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 8;
}
.editarApoio .pontos input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarApoio .registar {
  margin-right: 115px;
  margin-bottom: 15px;
  grid-column-start: 2;
  grid-row-start: 10;
  align-self: end;
  justify-self: end;
}

.editarApoio .registar button {
  height: 50px;
  font-size: medium;
  cursor: pointer;
  border: none;
  background-color: #e99d72;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
  margin-right: 15px;
}
.editarApoio .registar button:hover {
  background-color: #fab995;
}
</style>