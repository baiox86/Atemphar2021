<template>
  <div>
    <div class="registarPessoa">
    <div class="form">
      <!--<div class="novaPessoa">
        <a class="fas fa-user-plus">
          <input type="button" v-model="buttonText" v-on:click="toggleInsert()">
        </a>
        <br>
      </div>-->
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
          <input type="radio" v-model="input.genero" name="M" value="M"> Masculino
          <br>
          <input type="radio" v-model="input.genero" name="F" value="F"> Feminino
          <br>
          <input type="radio" v-model="input.genero" name="O" value="O"> Outro
          <br>
        </div>
         <div class="subscritor">
          <label>Subscritor:<i class="obrigatorio">*</i></label>
          <br>
          <input type="radio" v-model="input.subscritor" name="Sim" value="1"> Subscritor
          <br>
          <input type="radio" v-model="input.subscritor" name="Nao" value="0"> Não subscritor
          <br>
        </div>
        <div class="zona">
          <label>Zona:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.zona" name="zona">
        </div>
        <div class="idade">
          <label>Data Nasc.:<i class="obrigatorio">*</i></label>
          <br>
          <input type="date" v-model="input.dataNasc" name="idade">
        </div>
        <div class="nif">
          <label>NIF:</label>
          <br>
          <input type="text" v-model="input.nif" name="nif">
        </div>         
        <div class="comoConheceu">
          <label>Como Conheceu:<i class="obrigatorio">*</i></label>
          <br>
          <select v-model="input.comoConheceu">
            <option>Pessoa</option>
            <option value="Local">Folheto em Local</option>
            <option>Redes Sociais</option>
            <option>E-Mail</option>
          </select>
          <template
            v-if="input.comoConheceu === 'Pessoa'"
          >
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
      <div class="registar">
        <button type="submit" v-on:click.prevent="submit()">
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

import { bus } from "../../main.js";
import { ModelListSelect } from "vue-search-select";
export default {
  activated() {
    axios
      .get("api/getAllPessoasIdNome/", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        if (response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
        this.allPessoa = response.data;

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
        subscritor: "",
        zona: "",
        nif: "",
        dataNasc: "",
        comoConheceu: "Pessoa",
        atravesDe: ""
      },
      allPessoa: [],
      buttonText: "Adicionar Pessoa"
    };
  },
  methods: {
    clearFields(){
      bus.$emit('refreshPessoas');
      this.input.jaFreq = true,
      this.input.nome = "",
      this.input.inputPessoa = "",
      this.input.email = "",
      this.input.genero = "",
      this.input.subscritor = "";
      this.input.telefone = "",
      this.input.zona = "",
      this.input.nif = "",
      this.input.dataNasc = "",
      this.input.comoConheceu = "Pessoa",
      this.input.atravesDe = "",
      this.buttonText = "Adicionar Pessoa"
      
    },
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
          this.input.subscritor == "" ||
          this.input.subscritor == null ||
          this.input.dataNasc == "" ||
          this.input.dataNasc == null
          
        ) {
          this.$toasted.error("Campos em falta!");
          return;
        }



        if(this.input.telefone.length > 15){
          this.$toasted.error("Número de telefone com tamanho inválido!");
          return;
        }


        if(!/^\d+$/.test(this.input.telefone)){
          this.$toasted.error("Caracteres inválidos no número de telefone!");
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

        if(new Date(this.input.dataNasc).getTime() > new Date().getTime() ){
          this.$toasted.error("Data Inválida!");
          return;
        }



        if(this.input.comoConheceu === 'Local' && (this.input.atravesDe == null || this.input.atravesDe == "")){
          this.$toasted.error("Obrigatório selecionar pessoa por onde conheceu!");
          return;
        }


        axios
          .post(
            "api/postPessoa/",
            {
              nome: this.input.nome,
              email: this.input.email,
              telefone: this.input.telefone,
              zona: this.input.zona,
              dataNasc: this.input.dataNasc,
              genero: this.input.genero,
              subscritor: this.input.subscritor,
              nif: this.input.nif == "" ? null : this.input.nif,
              comoConheceu:
                this.input.comoConheceu === "Local"
                  ? this.input.atravesDe
                  : this.input.comoConheceu,
              atravesQuem:
                this.input.comoConheceu === "Local"
                  ? null
                  : this.input.atravesDe.id
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ` + sessionStorage.getItem("token")
              }
            }
          )
          .then(response => {
            if (response.status == 401) {
                this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
            if (response.status == 201) {
                this.$toasted.show("Pessoa inserida com sucesso!");
                this.clearFields();
            }
            if(response.data == '1062'){
              this.$toasted.error("NIF ou email já existentes! Possível pessoa duplicada!");
              return;
            }
          })
          .catch(error => {
             if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            this.$toasted.error("Erro a registar Pessoa!");
          })
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
.registarPessoa {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.registarPessoa .form {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}
.registarPessoa .form .obrigatorio{
  color: red;
}
.registarPessoa .nome {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.registarPessoa .nome input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.registarPessoa .email {
  grid-column-start: 2;
  grid-row-start: 1;
  margin-top: 10px;
  margin-right: 115px;
}

.registarPessoa .email input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.registarPessoa .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 2;
}

.registarPessoa .telefone input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.registarPessoa .zona {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 2;
}

.registarPessoa .zona input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.registarPessoa .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.registarPessoa .nif input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}




.registarPessoa .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.registarPessoa .idade input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.registarPessoa .comoConheceu {
  width: 50%;
  display: -webkit-box;
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
}


.registarPessoa .comoConheceu select {
  height: 30px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
}

.registarPessoa .comoConheceu .atravesQuem {
  width: 117%;
  margin-left: 9px;
  margin-top: 17px;
}

.registarPessoa .comoConheceu .local {
  width: 105%;
  margin-left: 9px;
}

.registarPessoa .comoConheceu .local input {
  width: 117%;
  margin-top: 22px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.registarPessoa .registar {
  margin-right: 115px;
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 5;
  justify-self: end;
}

.registarPessoa .registar button {
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
.registarPessoa .registar button:hover {
  background-color: #fab995;
}
</style>