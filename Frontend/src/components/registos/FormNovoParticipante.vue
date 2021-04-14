<template>
  <div class="formNovoParticipante">
    <br>
    <br>
    <div class="form">
      <div class="novaPessoa">
        <a class="fas fa-user-plus">
          <input type="button" v-model="buttonText" v-on:click="toggleInsert()">
        </a>
        <br>
      </div>

      <template v-if="input.jaFreq">
        <!-- já frequentou, user existente -->
        <div class="novoParticipante">
          <label>Pessoa:<i class="obrigatorio">*</i></label>
          <br>
          <!--
          <input name="inputPessoa" v-model="input.inputPessoa" list="listaPessoa">
          <datalist id="listaPessoa">
            <option v-for="(pessoa, key) in allPessoa" :key="key">{{pessoa.idPessoa}}: {{pessoa.nome}}</option> 
          </datalist>
          -->
          <vue-single-select
                  v-model="input.inputPessoa"
                  :options="allPessoaInEvento"
                  placeholder= "Escolher"
                  option-label="nome"
          ></vue-single-select>
        </div>
      </template>
      <template v-else>
        <!-- não frequentou, user novo -->
        <div class="nome">
          <label>Nome:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.nome" name="nome">
        </div>
        <div class="email">
          <label>Email:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.email" name="email">
        </div>
        <div class="telefone">
          <label>Telefone:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.telefone" name="telefone">
        </div>
        <div class="genero">
          <label>Género:<i class="obrigatorio">*</i></label>
          <br>
          <input type="radio" v-model="input.genero" name="m" value="M"> M
          <br>
          <input type="radio" v-model="input.genero" name="f" value="F"> F
          <br>
        </div>
        <div class="zona">
          <label>Zona:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.zona" name="zona">
        </div>
        <div class="idade">
          <label>Data de Nascimento:<i class="obrigatorio">*</i></label>
          <br>
          <input type="date" v-model="input.dataNasc" name="idade">
        </div>
        <div class="nif">
          <label>NIF:</label>
          <br>
          <input type="text" v-model="input.nif" name="nif">
        </div>
        <div class="comoConheceu">
          <label>Como Conheceu:</label>
          <br>
          <select v-model="input.comoConheceu">
            <option>Pessoa</option>
            <option value="Local">Folheto em Local</option>
            <option>Redes Sociais</option>
            <option>E-Mail</option>
          </select>
          <template
            v-if="input.comoConheceu === 'Pessoa' || input.comoConheceu === 'Redes Sociais' || input.comoConheceu === 'E-Mail'"
          >
            <!-- conheceu através de uma pessoa -->
            <!-- listar pessoas -->
            <!--
            <input name="inputPessoaConheceu" v-model="input.atravesDe" list="listaPessoaAtravesDe">
              <datalist id="listaPessoaAtravesDe">
                  <option v-for="(pessoa, key) in allPessoa" :key="key">{{pessoa.idPessoa}}: {{pessoa.nome}}</option> 
              </datalist>
            -->
            <div class="atravesQuem">
              <vue-single-select
                      v-model="input.atravesDe"
                      :options="allPessoa"
                      placeholder= "Procurar por nome,email ou telemóvel"
                      option-label="nome"
              ></vue-single-select>
            </div>
          </template>
          <template v-else-if="input.comoConheceu === 'Local'">
            <!-- conheceu através de um folheto num local -->
            <!--<label>Local:</label>
            <br>-->
            <div class="local">
              <input type="text" v-model="input.atravesDe" name="local" placeholder="Local">
            </div>
          </template>
        </div>
      </template>
      <div class="registar">
        <button type="submit" v-on:click.prevent="submit()">
          <i class="far fa-save"></i> Registar
        </button>
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

import { bus } from "../../main.js";
import { ModelListSelect } from "vue-search-select";
export default {
  props: {
    idEvento: {
      type: String,
      required: true
    }
  },
  mounted() {
    axios
      .get("api/getPessoasNaoEmEvento/" + this.idEvento, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoaInEvento = response.data;
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        this.error = error;
      });

      axios
      .get("api/getAllPessoasIdNome/", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPessoa = response.data;
        if (response.status === 401) {
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
  },
  data() {
    var here = this;
    return {
      input: {
        jaFreq: true,
        nome: "",
        inputPessoa: "",
        email: "",
        genero: "",
        telefone: "",
        zona: "",
        nif: "",
        dataNasc: "",
        comoConheceu: "Pessoa",
        atravesDe: ""
      },
      allPessoaInEvento: [],
      allPessoa: [],
      buttonText: "Adicionar Pessoa"
    };
  },
  methods: {
    toggleInsert: function() {
      if (this.input.jaFreq) {
        this.buttonText = "Cancelar";
      } else {
        this.buttonText = "Adicionar Pessoa";
      }
      this.input.jaFreq = !this.input.jaFreq;
    },
    checkIfNoEvents: function(aux) {
      return (aux = 0 ? true : false);
    },
    submit: function() {
      var partAux;
      //se for uma nova pessoa
      if (!this.input.jaFreq) {
        //validar campos
         if (
          this.input.nome == "" ||
          this.input.nome == null ||
          this.input.email == "" ||
          this.input.email == null ||
          this.input.telefone == "" ||
          this.input.telefone == null ||
          this.input.zona == "" ||
          this.input.zona == null ||
          this.input.genero == "" ||
          this.input.genero == null ||
          this.input.dataNasc == "" ||
          this.input.dataNasc == null
        ) {
          this.$toasted.error("campos em falta! 1");
          return;
        }

        if(this.input.telefone.length != 9){
          this.$toasted.error("Número de telefone de tamanho inválido!");
          return;
        }

        if(!/^\d+$/.test(this.input.telefone)){
          this.$toasted.error("caracteres inválidos no número de telefone!");
          return;
        }

        if(this.input.nif != "" && this.input.nif.length != 9){
          this.$toasted.error("NIF de tamanho inválido!");
          return;
        }


        if(!/\S+@\S+\.\S+/.test(this.input.email)){
          this.$toasted.error("Formato de email inválido!");
          return;
        }

         if(this.input.comoConheceu.valueOf() != "Local".valueOf() && (this.input.atravesDe == null || this.input.atravesDe == "")){
          this.$toasted.error("Obrigatório selecionar pessoa por onde conheceu!");
          return;
        }


        //(nome, email, telefone, zona, idade, genero, nif, comoConheceu, atravesQuem)
        axios
          .post(
            "api/postPessoa",
            {
              nome: this.input.nome,
              email: this.input.email,
              telefone: this.input.telefone,
              zona: this.input.zona,
              idade: this.input.dataNasc,
              genero: this.input.genero,
              nif: this.input.nif,
              comoConheceu:
                this.input.comoConheceu === "Local"
                  ? this.input.atravesDe.id
                  : this.input.comoConheceu,
              atravesDe:
                this.input.comoConheceu === "Local"
                  ? null
                  : this.input.atravesDe
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ` + sessionStorage.getItem("token")
              }
            }
          )
          .then(response => {
            if(response.data == '1062'){
                    this.$toasted.error("NIF ou email já existentes! Possível pessoa duplicada!");
                    return;
            }
            partAux = response.data;
            if(response.status === 201){
              this.$toasted.error("Nova pessoa inserida com sucesso!");
            axios
              .post(
                "api/postParticipacaoEvento",
                {
                  idParticipante: partAux,
                  idEvento: this.idEvento,
                  flagPrimeiroEvento: true
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(response => {
                if (response.status === 201)
                  bus.$emit("submitPart", "Novo participante inserido!");
                  return;
                if (response.status === 401) {
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
          }})
          .catch(error => {
            if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            this.$toasted.error("Erro a inserir Participante!");
          });
          return;
      } else {
        if(this.input.inputPessoa == "" || this.input.inputPessoa == null){
          this.$toasted.error("Erro: por favor selecionar ou inserir participante!");
        }
        partAux = this.input.inputPessoa;
        var hasEventosAux;
        //verificar se ainda não participou em eventos
        axios
          .get("api/getEventosParticipante/" + this.idPessoa, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.status === 401) {
              this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
              return;
            }
            hasEventosAux = this.checkIfNoEvents(response.data.length);
            axios
              .post(
                "api/postParticipacaoEvento",
                {
                  idParticipante: partAux.idPessoa,
                  idEvento: this.idEvento,
                  flagPrimeiroEvento: hasEventosAux
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(response => {
                if (response.status === 201){
                  bus.$emit("submitPart", "Novo participante inserido!");
                  return;
                }
                if (response.status === 401) {
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
              return;
          }
          )
          .catch(error => {
           if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
          });
      }
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

.formNovoParticipante {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.formNovoParticipante .form {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 15px;
  background-color: oldlace;
  width: 100%;
}

.formNovoParticipante .form .obrigatorio{
  color: red;
}

.formNovoParticipante .novoParticipante {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 192px;
}

.formNovoParticipante .novaPessoa {
  grid-column-start: 2;
  margin-top: 40px;
}

.formNovoParticipante .novaPessoa input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.formNovoParticipante .novaPessoa a {
  border: 1px solid #a1a0a0;
  height: 20px;
}
.formNovoParticipante .nome {
  margin-left: 200px;
}
.formNovoParticipante .nome input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.formNovoParticipante .telefone {
  margin-left: 200px;
}

.formNovoParticipante .telefone input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .zona {
  margin-left: 200px;
}

.formNovoParticipante .zona input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .nif {
  margin-left: 200px;
}

.formNovoParticipante .nif input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .email input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .idade input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .comoConheceu {
  width: 50%;
  display: -webkit-box;
}

.formNovoParticipante .comoConheceu select {
  height: 30px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
}

.formNovoParticipante .comoConheceu .atravesQuem {
  width: 88%;
  margin-left: 9px;
  margin-top: 17px;
}

.formNovoParticipante .comoConheceu .local {
  width: 105%;
  margin-left: 9px;
}

.formNovoParticipante .comoConheceu .local input {
  width: 86%;
  margin-top: 22px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoParticipante .registar {
  margin-left: 192px;
  margin-bottom: 15px;
}

.formNovoParticipante .registar button {
  height: 50px;
  font-size: medium;
  cursor: pointer;
  border: none;
  background-color: #e99d72;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}
.formNovoParticipante .registar button:hover {
  background-color: #fab995;
}
</style>