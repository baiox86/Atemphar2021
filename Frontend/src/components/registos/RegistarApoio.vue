<template>
  <div>
    <div class="apoio">
      <div id="fields" class="fields">
        <template v-if="!isNovoStaff">
          <div class="staff">
            <label>Staff:<i class="obrigatorio">*</i></label>
            <br>
            <vue-single-select
                    v-model="input.inputStaff"
                    :options="allStaff"
                    placeholder="Escolher"
                    option-label="nome"
            ></vue-single-select>
          </div>
        </template>
        <template v-else>
        <template v-if="isNovoStaff && !isNovaPessoa">
          <div class="novoStaff">
            <label>Novo Membro do Staff:<i class="obrigatorio">*</i></label>
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
          <label>Nome:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="inputPessoa.nome" name="nome">
        </div>
        <div class="email">
          <label>Email:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="inputPessoa.email" name="email">
        </div>
        <div class="telefone">
          <label>Telefone:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="inputPessoa.telefone" name="telefone">
        </div>
        <div class="genero">
            <label>Género:<i class="obrigatorio">*</i></label>
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="m" value="M" > M
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="f"  value="F" > F
            <br>
        </div>
        <div class="zona">
          <label>Zona:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="inputPessoa.zona" name="zona">
        </div>
        <div class="idade">
          <label>Idade:<i class="obrigatorio">*</i></label>
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
              <input type="button" v-model="buttonTextStaff" v-on:click="toggleNovoStaff()" disabled>
            </a>
            <br>
        </div>
        <div class="evento">
          <label>Evento:<!-- Data: {{this.dataEvento = null ? "" : this.dataEvento }}--><i class="obrigatorio">*</i></label>
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
    axios
      .get("api/getAllStaff", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allStaff = response.data;
        if (errors.response.status === 401) {
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
       if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });
    axios
      .get("api/getAllPessoas", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoa = response.data;
      })
      .catch(error => {
        if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });
    axios
      .get("api/getAllPessoasNaoStaff", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoasNotStaff = response.data;
      })
      .catch(error => {
        if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });
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
              if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            this.dataEvento = response.data[0].dataEvento;
          }).catch(error => {
if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }

          });
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
      bus.$emit('refreshStaff');
      this.input.inputStaff = "";
      this.input.inputEventos = "";
      this.input.descricao = "";
      this.input.dataInicio = "";
      this.input.dataFim = "";
      this.input.pontos = "";
      this.isNovoStaff = false;
      this.isNovaPessoa = false;
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
            idStaffAux = this.input.inputStaff.idPessoa;
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

      if(new Date(this.input.dataInicio).getTime() > new Date(this.input.dataFim).getTime()){
        this.$toasted.error("A data de início do apoio não pode ser posterior à data de fim!");
        return;
      }

      axios
        .post(
          "api/postApoio",
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
          }
        })
        .catch((errors) => {
          if (errors.response.status === 400) {
            this.$toasted.error("Campos incorrectos ou incompletos!");
          }
          if (errors.response.status === 401) {
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
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

.apoio {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}
.apoio .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}

.apoio .fields .obrigatorio{
  color: red;
}

.apoio .staff {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.apoio .botaoNovoStaff {
  margin-right: 115px;
  grid-row-start: 1;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.apoio .botaoNovoStaff input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.apoio .botaoNovoStaff a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.apoio .novoStaff {
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 115px;
}
.apoio .botaoNovaPessoa {
  margin-right: 115px;
  grid-row-start: 2;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.apoio .botaoNovaPessoa input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.apoio .botaoNovaPessoa a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.apoio .nome {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.apoio .nome input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .email {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}

.apoio .email input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.apoio .telefone input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
}

.apoio .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 5;
}

.apoio .idade input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .zona {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 5;
}

.apoio .zona input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 6;
}

.apoio .nif input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.apoio .comoConheceu {
  /*margin-right: 115px;*/
  grid-column-start: 2;
  grid-row-start: 6;
  width: 50%;
  display: -webkit-box;
  height: 35px;
}

.apoio .comoConheceu select {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 30px;
}

.apoio .comoConheceu .atravesQuem {
  margin-top: 11px;
  width: 113%;
  margin-left: 9px;
}

.apoio .comoConheceu .local {
  margin-top: 16px;
  width: 100%;
  margin-left: 9px;
}

.apoio .comoConheceu .local input{
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  width: 113%;
  height: 35px;
}

.apoio .evento {
  grid-column-start: 1;
  grid-row-start: 7;
  margin-left: 115px;
}

.apoio .dataInicio {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 7;
}
.apoio .dataInicio input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.apoio .dataFim {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 8;
}
.apoio .dataFim input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.apoio .descricao {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 9;
}
.apoio .descricao textarea {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  border: 1px solid #a1a0a0;
  resize: none;
  border-radius: 4px;
}
.apoio .pontos {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 8;
}
.apoio .pontos input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.apoio .registar {
  margin-right: 115px;
  margin-bottom: 15px;
  grid-column-start: 2;
  grid-row-start: 10;
  align-self: end;
  justify-self: end;
}

.apoio .registar button {
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
.apoio .registar button:hover {
  background-color: #fab995;
}
</style>