<template>
  <div>
    <br>
    <div class="voltarPessoa">
      <button v-on:click="switchComponent('PersonsTablesMenu')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>
    <br>
    <h1>Editar Pessoa</h1>
    <br>
    <div class="editarPessoa">
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
          <input type="radio" v-model="input.genero" name="m" value="M"> M
          <br>
          <input type="radio" v-model="input.genero" name="f" value="F"> F
          <br>
        </div>        
        <div class="subscritor">
          <label>Subscritor:<i class="obrigatorio">*</i></label>
          <br>
          <input type="radio" v-model="input.subscritor" name="s" value="1"> Subcritor
          <br>
          <input type="radio" v-model="input.subscritor" name="n" value="0"> Não subscritor
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
          <label>Como Conheceu:<i class="obrigatorio">*</i></label>
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
  props: {
    dadosPessoa: {
      type: String,
      required: true
    }
  },
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


    this.input.nome = this.dadosPessoa.nome;
    this.input.email = this.dadosPessoa.email;
    this.input.genero = this.dadosPessoa.genero;
    this.input.subscritor = this.dadosPessoa.subscritor;
    this.input.telefone = this.dadosPessoa.telefone;
    this.input.zona = this.dadosPessoa.zona;
    this.input.nif = this.dadosPessoa.nif;
    this.input.dataNasc = this.dadosPessoa.dataNasc;
    this.input.comoConheceu = 
    (this.dadosPessoa.comoConheceu === 'Pessoa' ? this.dadosPessoa.comoConheceu :
     this.dadosPessoa.comoConheceu === 'E-Mail' ? this.dadosPessoa.comoConheceu :
     this.dadosPessoa.comoConheceu === 'Redes Sociais'? this.dadosPessoa.comoConheceu:
     'Local'
    );
    this.input.atravesDe = (this.dadosPessoa.comoConheceu === 'Pessoa' ? this.dadosPessoa.atravesQuem :
     this.dadosPessoa.comoConheceu === 'E-Mail' ? this.dadosPessoa.atravesQuem :
     this.dadosPessoa.comoConheceu === 'Redes Sociais'? this.dadosPessoa.atravesQuem:
     this.dadosPessoa.comoConheceu
    );
  },
  deactivated() {
    this.input.nome = "";
    this.input.email = "";
    this.input.genero = "";
    this.input.subscritor = "";
    this.input.telefone = "";
    this.input.zona = "";
    this.input.nif = "";
    this.input.dataNasc = "";
    this.input.comoConheceu = "";
    this.input.atravesDe = "";
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
        subscritor: "",
        telefone: "",
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
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
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
          this.input.subscritor == "" ||
          this.input.subscritor == null ||
          this.input.dataNasc == "" ||
          this.input.dataNasc == null
        ) {
          this.$toasted.error("campos em falta!");
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
        .put(
          "api/editPessoa/" + this.dadosPessoa.idPessoa,
          {
            nome: this.input.nome,
            email: this.input.email,
            telefone: this.input.telefone,
            zona: this.input.zona,
            dataNasc: this.input.dataNasc,
            genero: this.input.genero,
            subscritor: this.input.subscritor,
            nif: this.input.nif,
            comoConheceu:
              this.input.comoConheceu === "Local"
                ? this.input.atravesDe
                : this.input.comoConheceu,
            atravesDe:
              this.input.comoConheceu === "Local" ? null : this.input.atravesDe.id
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
              this.$toasted.error("Pessoa editada com sucesso!");
              this.switchComponent('PersonsTablesMenu');
            }
            if(response.data == '1062'){
              this.$toasted.error("NIF ou email já existentes! Possível pessoa duplicada!");
              return;
            }
        })
        .catch(error => {

          this.$toasted.error("Erro a editar Pessoa!");
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

.voltarPessoa button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.voltarPessoa i {
  font-size: 17px;
  margin-right: 3px;
}
.voltarPessoa button:hover {
  background-color: #fdf5e6
}

.editarPessoa {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.editarPessoa .form {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}

.editarPessoa .form .obrigatorio{
  color: red;
}

.editarPessoa .nome {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.editarPessoa .nome input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .email {
  grid-column-start: 2;
  grid-row-start: 1;
  margin-top: 10px;
  margin-right: 115px;
}

.editarPessoa .email input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.editarPessoa .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 2;
}

.editarPessoa .telefone input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .zona {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 2;
}

.editarPessoa .zona input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.editarPessoa .nif input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}

.editarPessoa .subscritor {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 5;
}

.editarPessoa .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.editarPessoa .idade input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .comoConheceu {
  width: 50%;
  display: -webkit-box;
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
}

.editarPessoa .comoConheceu select {
  height: 30px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
}

.editarPessoa .comoConheceu .atravesQuem {
  width: 117%;
  margin-left: 9px;
  margin-top: 17px;
}

.editarPessoa .comoConheceu .local {
  width: 105%;
  margin-left: 9px;
}

.editarPessoa .comoConheceu .local input {
  width: 117%;
  margin-top: 22px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.editarPessoa .registar {
  margin-right: 115px;
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 5;
  justify-self: end;
}

.editarPessoa .registar button {
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
.editarPessoa .registar button:hover {
  background-color: #fab995;
}
</style>