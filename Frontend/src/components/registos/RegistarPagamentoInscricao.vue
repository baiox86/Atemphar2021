<template>
<div>
  <br>
      <div class="voltarEvento">
            <button v-on:click="switchComponent('FormInscricoesEvento')">
                <i class="fas fa-reply"></i>Voltar
            </button>
            </div>
    <div>
        <div class="registarPagamentoInscricao">
            <div id="fields" class="fields">
               
                <h2>Registar Pagamento de Inscrição </h2>
                 <div class="participante">
                    <label>Participante:</label>
                    <input disabled type="text" v-model="dadosPessoa.nome">
               </div>
                <div class="valor">
                    <label>Valor (€):</label>
                    <input type="number"  step="0.01" v-model.number="input.valor">
               </div>
                <div class="recibo">
                  <label>Nº Recibo:</label>
                    <input type="number" v-model.number="input.recibo">
               </div>
               <div class="registar">
            <button class="registar" type="submit" v-on:click.prevent="submit()">
              <i class="far fa-save"></i> Guardar
            </button>
          </div>
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
 var instance = axios.create({
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          }
      });

import { bus } from "../../main.js";
export default {
  props:{
     dadosPessoa: {
        type: Object,
        required: true
        }
  },
    data() {
    return {
        input: {
            valor : null,
            recibo:null
        },
        
    };
  },
  computed: {
     link(){
      return window.location.href;
    },

  },
  activated() {
    this.input.valor = this.dadosPessoa.valor == -1 ? null : this.dadosPessoa.valor;
    this.input.recibo = this.dadosPessoa.recibo == -1 ? null : this.dadosPessoa.recibo;
  },

  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    clearFields: function() {
      bus.$emit('refreshEventos');
     
    },
    submit: function() {
        /*APAGAR O PAGAMENTO*/
      if(this.input.valor == null || this.input.valor == ""){
          instance
              .delete(
                  `/api/deletePagamentoEvento/${this.dadosPessoa.idEvento}/${this.dadosPessoa.idParticipante}`,
                  {
                      withCredentials: true,
                      headers: {
                          Authorization: `Bearer ` + sessionStorage.getItem("token")
                      }
                  }
              )
              .then(response => {
                  this.$toasted.show("Pagamento removido com sucesso!");
                  this.switchComponent('FormInscricoesEvento');
              })
              .catch((errors, response) => {

                  if (errors.response.status === 400) {
                      this.$toasted.error('Erro ao remvoer pagamento!');
                  }
                  if (errors.response.status === 401) {
                      this.$toasted.error('Sessão expirou!')
                      bus.$emit("logout");
                  }

              });

      }

    /*VERIFICA SE É POST OU UPDATE*/
    else if(this.dadosPessoa.valor != -1 || this.dadosPessoa.recibo != -1){
      /*NO CASO DE UPDATE, VERIFICA SE OS VALORES FORAM ALTERADOS*/
      if(this.dadosPessoa.valor == this.input.valor && this.dadosPessoa.recibo == this.input.recibo){
        this.$toasted.error("Valores não foram alterados");
        return;
      }else{
         instance
              .put(
                `/api/editPagamentoEvento/${this.dadosPessoa.idEvento}/${this.dadosPessoa.idParticipante}`,
                {
                  valor: this.input.valor,
                  recibo: this.input.recibo
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(response => {
                this.$toasted.show("Pagamento atualizado com sucesso!");
                this.switchComponent('FormInscricoesEvento');
              })
              .catch((errors, response) => {

                if (errors.response.status === 400) {
                 this.$toasted.error('Erro ao atualizar pagamento!');
                }
                if (errors.response.status === 401) {
                   this.$toasted.error('Sessão expirou!')
                    bus.$emit("logout");
                }
            
              });

      }
    }else{
      
      instance
              .post(
                "/api/postPagamentoEvento",
                {
                  idParticipante: this.dadosPessoa.idParticipante,
                  idEvento:  this.dadosPessoa.idEvento,
                  valor: this.input.valor,
                  recibo: this.input.recibo
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(response => {
                this.$toasted.show("Pagamento registado com sucesso!");
                this.switchComponent('FormInscricoesEvento');
              })
              .catch((errors, response) => {

                if (errors.response.status === 400) {
                 this.$toasted.error('Erro ao registar pagamento!');
                }
                if (errors.response.status === 401) {
                   this.$toasted.error('Sessão expirou!')
                    bus.$emit("logout");
                }
            
              });
    }
      this.input.valor = null;
      this.input.recibo = null;

    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");


.registarPagamentoInscricao {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.registarPagamentoInscricao .fields .obrigatorio{
  color: red;
}

.registarPagamentoInscricao .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
  height: 80%;
  margin-bottom: 20px;
}
.registarPagamentoInscricao .valor {
  grid-column-start: 1;
  margin-top: 10px;
  margin-left: 25%;
}

.registarPagamentoInscricao .participante input{
  margin-left:1.2%;
}

.registarPagamentoInscricao .valor input{
  margin-left:2.2%;
}

.registarPagamentoInscricao .recibo input{
  margin-left:3.5%;
  margin-top:10px;
}


.registarPagamentoInscricao .participante{
   display:inline-block;
   width: 30%;
   margin-left:25%;
}


.registarPagamentoInscricao .recibo{
   display:inline-block;
   width: 30%;
   margin-left:25%;
}

.registarPagamentoInscricao .registar {
  grid-column-start: 1;
  margin-top: 30px;
  margin-left: 50%;
}

.registarPagamentoInscricao .registar button {
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
.registarPagamentoInscricao .registar button:hover {
  background-color: #fab995;
}

</style>