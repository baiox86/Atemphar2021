<template>
  <div>
    <div class="empresa">
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
          <label >Telefone:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.telefone" name="telefone"/>
        </div>

        <div class="nifEmpresa">
          <label >NIF:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.nif" name="nif"/>
        </div>

        <div class="emailEmpresa">
          <label>Email:<i class="obrigatorio">*</i></label>
          <br>
          <input type="email" v-model="input.email" name="email">
        </div>

        <div class="observacoes">
          <label>Obs.:</label>
          <br>
          <textarea type="observacoes" v-model="input.observacoes" name="observacoes"></textarea>
        </div>

        <div class="registar">
          <button class="registar" type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Registar</button>
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

import { ModelListSelect } from 'vue-search-select';
import { bus } from "../../main.js";
export default {
  activated(){
  },
  deactivated(){
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
    clearfields: function() {
            this.input.nome = null;
            this.input.morada = null;
            this.input.telefone = null;
            this.input.email = null;
            this.input.nif = null;
            this.input.observacoes = null;
            bus.$emit('refreshEmpresas');
    },
    submit: function (){
      //verificar campos obrigatórios

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

        if(this.input.nif.length != 9){
          this.$toasted.error("NIF de tamanho inválido!");
          return;
        }

        if(!/^\d+$/.test(this.input.nif)){
          this.$toasted.error("caracteres inválidos no NIF!");
          return;
        }

        if(!/\S+@\S+\.\S+/.test(this.input.email)){
          this.$toasted.error("Formato de email inválido!");
          return;
        }

       axios.post("api/postEmpresa",  {
          nomeEmpresa: this.input.nome,
          moradaEmpresa: this.input.morada,
          telefoneEmpresa: this.input.telefone,
          emailEmpresa: this.input.email,
          nifEmpresa: this.input.nif,
          observacoes: this.input.observacoes
       }, {withCredentials: true,
          headers:  {Authorization: `Bearer ` + sessionStorage.getItem("token")},}).
          then(response => {

          if(response.status === 201){
            this.$toasted.show("criado com suce")
            this.clearfields();
          }
        })
       .catch( (errors, response) => {
         if(errors.response.status === 400){
            this.$toasted.error("Campos incorrectos ou incompletos!");
          }
          if(errors.response.status === 401){
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

.empresa{
	  font-family: "Open Sans";
	  display: flex;
  	align-items: center;
  	justify-content: center;
}
.empresa .fields{
    display: inline-grid;
    grid-row-gap: 10px;
    grid-column-gap: 50px;
    background-color: oldlace;
    width: 100%;
}

.empresa .fields .obrigatorio{
  color: red;
}

.empresa .nomeEmpresa{
	grid-column-start: 1;
	margin-top: 10px;
  margin-left: 115px;
}

.empresa .nomeEmpresa input{
	width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.empresa .moradaEmpresa{
	grid-column-start: 2;
	margin-top: 10px;
  margin-right: 115px;
}

.empresa .moradaEmpresa input{
	width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.empresa .telefoneEmpresa{
  margin-left: 115px;
}

.empresa .telefoneEmpresa input{
	width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.empresa .nifEmpresa{
  margin-right: 115px;
}

.empresa .nifEmpresa input{
	width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.empresa .emailEmpresa{
  margin-left: 115px;
}

.empresa .emailEmpresa input{
	width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.empresa .observacoes{
  margin-right: 115px;
}
.empresa .observacoes textarea{
	width: 100%;
  height: 150px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
  resize: none;
}

.empresa .registar{
  margin-right: 115px;
  margin-top: 15px;
  margin-bottom: 15px;
  grid-column-start: 2;
  align-self: end;
  justify-self: end;

}

.empresa .registar button{
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
.empresa .registar button:hover {
  background-color: #fab995;
}

</style>