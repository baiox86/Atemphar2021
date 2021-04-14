<template>
    <div>
        <div class="registarCriacaoinscricaoEvento">
            <div id="fields" class="fields">
                <div class="evento">
                    <label>Evento:* <i class="obrigatorio"></i></label>
                    <div class="autocomplete">          
                        <vue-single-select 
                            v-model="input.evento"
                            :options="allEventos"
                            v-bind:placeholder= "eventoText"
                            option-label="nome"
                        ></vue-single-select>  
                    </div>
                </div>
                <div class="linkEvento">
                   <label>Link para Inscrição:* <i class="obrigatorio"></i></label>
                   <a v-bind:href="linkInscricao">{{linkInscricao}}</a>
                </div>

                 <div class="registar">
                    <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Criar Link</button>
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
export default {
    data() {
    var here = this;
    return {
        input: {
            evento : null
        },
        eventoText: "Procurar por nome, data ou local",
        allEventos : [],
        linkInscricao :""
    };
  },
  computed: {
     link(){
      return window.location.href;
    }
  },
  activated() {
    axios
      .get("api/getAllEventosIdNome", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allEventos = response.data
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
  
  },

  methods: {
    clearFields: function() {
      bus.$emit('refreshEventos');
     
    },
    submit: function() {
      if(this.input.evento == null){
         this.$toasted.error('Selecione um evento!');
         return;
      }

      if(this.input.evento.tokenRegisto != ""){
        this.$toasted.error('Evento já possui link para inscrição!');
        return;
      }
      
      axios
      .get(`api/getLinkRegistoEvento/${this.input.evento.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.linkInscricao = this.link +  "inscricaoEvento/" + response.data;
        this.input.evento.tokenRegisto = response.data;
        bus.$emit('refreshEventos');

        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }


        this.$toasted.show("Link criado com sucesso!")
      })
      .catch(error => {
         if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });



    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");


.registarCriacaoinscricaoEvento {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.registarCriacaoinscricaoEvento .fields .obrigatorio{
  color: red;
}

.registarCriacaoinscricaoEvento .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
  height: 80%;
  margin-bottom: 20px;
}
.registarCriacaoinscricaoEvento .evento {
  grid-column-start: 1;
  margin-top: 10px;
  margin-left: 15%;
}


.registarCriacaoinscricaoEvento .evento .autocomplete{
   display:inline-block;
   width: 30%;
   margin-left:7%;
}

.registarCriacaoinscricaoEvento .linkEvento {
  grid-column-start: 1;
  margin-top: 10px;
  margin-left: 15%;
}


.registarCriacaoinscricaoEvento .linkEvento a{
   display:inline-block;
   width: 30%;
   margin-left:1%;
}

.registarCriacaoinscricaoEvento .registar {
  margin-top: 30px;
  margin-left: 30%;
}

.registarCriacaoinscricaoEvento .registar button {
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
.registarCriacaoinscricaoEvento .registar button:hover {
  background-color: #fab995;
}

</style>