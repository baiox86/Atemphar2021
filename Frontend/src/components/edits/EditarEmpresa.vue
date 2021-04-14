<template>
  <div>
    <br>
    <div class="voltarEmpresa">
      <button v-on:click="switchComponent('AllEmpresasTable')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>
    <br>
    <h1>Editar Empresa</h1>
    <br>
    <div class="editarEmpresa">
      <div id="fields" class="fields">
        <!-- fields: nome, morada, telefone, email, nif, observações-->
        <div class="nomeEmpresa">
          <label>Nome:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.nome" name="nome">
        </div>
        <div class="moradaEmpresa">
          <label>Morada:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.morada" name="morada">
        </div>

        <div class="telefoneEmpresa">
          <label>Telefone:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.telefone" name="telefone">
        </div>

        <div class="nifEmpresa">
          <label>NIF:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.nif" name="telefone">
        </div>

        <div class="emailEmpresa">
          <label>Email:</label>
          <br>
          <input type="email" v-model="input.email" name="email">
        </div>

        <div class="observacoes">
          <label>Obs.:</label>
          <br>
          <textarea type="observacoes" v-model="input.observacoes" name="observacoes"></textarea>
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
  props: {
    dadosEmpresa: {
      type: String,
      required: true
    }
  },
  activated() {
    this.input.nome = this.dadosEmpresa.nomeEmpresa;
    this.input.morada = this.dadosEmpresa.moradaEmpresa;
    this.input.telefone = this.dadosEmpresa.telefoneEmpresa;
    this.input.email = this.dadosEmpresa.emailEmpresa;
    this.input.nif = this.dadosEmpresa.nifEmpresa;
    this.input.observacoes = this.dadosEmpresa.observacoes;
  },
  deactivated() {
    this.clearfields();
  },
  data() {
    var here = this;
    return {
      input: {
        nome: null,
        morada: null,
        telefone: null,
        email: null,
        nif: null,
        observacoes: null
      }
    };
  },
  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    clearfields: function() {
      this.input.nome = null;
      this.input.morada = null;
      this.input.telefone = null;
      this.input.email = null;
      this.input.nif = null;
      this.input.observacoes = null;
    },
    submit: function() {
      
      if(this.input.nome == "" || this.input.nome == null ||
         this.input.morada == "" || this.input.morada == null ||
         this.input.telefone == "" || this.input.telefone == null ||
         this.input.nif == "" || this.input.nif == null ||
         this.input.email == "" || this.input.email == null){
           this.$toasted.error("Campos em falta!");
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

        if(!/^\d+$/.test(this.input.nif)){
          this.$toasted.error("caracteres inválidos no NIF!");
          return;
        }

        if(/\S+@\S+\.\S+/.test(this.input.email)){
          this.$toasted.error("Formato de email inválido!");
          return;
        }

      axios.put(
          "api/editEmpresa/" + this.dadosEmpresa.idEmpresa,
          {
            nome: this.input.nome,
            morada: this.input.morada,
            telefone: this.input.telefone,
            email: this.input.email,
            nif: this.input.nif,
            observacoes: this.input.observacoes
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
            this.$toasted.error("Empresa editada com sucesso!");
            this.clearfields();
            this.switchComponent('AllEmpresasTable');
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

h1 {
  text-align: center;
  font-family: "Open Sans";
}

.voltarEmpresa button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.voltarEmpresa i {
  font-size: 17px;
  margin-right: 3px;
}
.voltarEmpresa button:hover {
  background-color: #fdf5e6
}

.editarEmpresa {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}
.editarEmpresa .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}
.editarEmpresa .fields .obrigatorio{
  color: red;
}
.editarEmpresa .nomeEmpresa {
  grid-column-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.editarEmpresa .nomeEmpresa input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEmpresa .moradaEmpresa {
  grid-column-start: 2;
  margin-top: 10px;
  margin-right: 115px;
}

.editarEmpresa .moradaEmpresa input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.editarEmpresa .telefoneEmpresa {
  margin-left: 115px;
}

.editarEmpresa .telefoneEmpresa input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.editarEmpresa .nifEmpresa {
  margin-right: 115px;
}

.editarEmpresa .nifEmpresa input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEmpresa .emailEmpresa {
  margin-left: 115px;
}

.editarEmpresa .emailEmpresa input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEmpresa .observacoes {
  margin-right: 115px;
}
.editarEmpresa .observacoes textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
  resize: none;
}

.editarEmpresa .registar {
  margin-right: 115px;
  margin-top: 15px;
  margin-bottom: 15px;
  grid-column-start: 2;
  align-self: end;
  justify-self: end;
}

.editarEmpresa .registar button {
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
.editarEmpresa .registar button:hover {
  background-color: #fab995;
}
</style>