<template>
  <div class="formNovoEmpresario">
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
        <div class="novoEmpresario">
          <label>Pessoa:<i class="obrigatorio">*</i></label>
          <br>
        <model-list-select :list="allPessoaNotInEmpresa"
                     v-model="input.inputPessoa"
                     option-value="idPessoa"
                     option-text="nome"
                     placeholder="Escolher">
        </model-list-select>
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
            <input type="radio" v-model="input.genero" name="m" value="M" > M
            <br>
            <input type="radio" v-model="input.genero" name="f"  value="F" > F
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
          <label>Como Conheceu: </label>
          <br>
          <select v-model="input.comoConheceu">
            <option>Pessoa</option>
            <option value="Local">Folheto em Local</option>
            <option>Redes Sociais</option>
            <option>E-Mail </option>
          </select>
          <template v-if="input.comoConheceu === 'Pessoa' || input.comoConheceu === 'Redes Sociais' || input.comoConheceu === 'E-Mail'">
            <!-- conheceu através de uma pessoa -->
            <!-- listar pessoas -->
            <!--
            <input name="inputPessoaConheceu" v-model="input.atravesDe" list="listaPessoaAtravesDe">
              <datalist id="listaPessoaAtravesDe">
                  <option v-for="(pessoa, key) in allPessoa" :key="key">{{pessoa.idPessoa}}: {{pessoa.nome}}</option> 
              </datalist>
              -->
              <div class="atravesQuem">
                <model-list-select :list="allPessoa"
                     v-model="input.atravesDe"
                     option-value="idPessoa"
                     option-text="nome"
                     placeholder="Escolher">
                </model-list-select>
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
        <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Registar</button>
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
import { ModelListSelect } from 'vue-search-select';
export default {
  props: {
    idEmpresa: {
        type: String,
        required: true
    }
  },
  mounted(){
    axios.get("api/getPessoasNaoEmEmpresa/" + this.idEmpresa, {withCredentials: true, headers: { Authorization: `Bearer ` + sessionStorage.getItem("token")}})
        .then(response =>{ 
        (this.allPessoaNotInEmpresa = response.data);
          if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
        }).catch(error => {
        if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });

    axios.get("api/getAllPessoas/", {withCredentials: true, headers: { Authorization: `Bearer ` + sessionStorage.getItem("token")}})
        .then(response =>{ 
        (this.allPessoa = response.data);
          if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
        }).catch(error => {
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
        dataNasc: "",
        telefone: "",
        zona: "",
        nif: "",
        comoConheceu: "Pessoa",
        atravesDe: ""
      },
      allPessoaNotInEmpresa: [],
      allPessoa: [],
      buttonText: "Adicionar Pessoa"
    };
  },
  methods: {
    toggleInsert: function(){
      if(this.input.jaFreq){
          this.buttonText = "Cancelar";
      }else{
          this.buttonText = "Adicionar Pessoa";
      }
      this.input.jaFreq = !this.input.jaFreq;
    },
    submit: function (){
      var partAux; 
       //se for um novo empresário
      if(!this.input.jaFreq){
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
        axios.post("api/postPessoa", 
        {
          nome: this.input.nome,
          email: this.input.email,
          telefone: this.input.telefone,
          zona: this.input.zona,
          dataNasc: this.input.dataNasc,
          genero: this.input.genero,
          nif: this.input.nif,
          comoConheceu: this.input.comoConheceu === "Local"? this.input.atravesDe : this.input.comoConheceu, 
          atravesDe:  this.input.comoConheceu === "Local"? null : this.input.atravesDe
        },
        {
          withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
        }).then((response)=>{
          if(response.data == '1062'){
                    this.$toasted.error("NIF ou email já existentes! Possível pessoa duplicada!");
                    return;
            }
          partAux = response.data
             axios.post("api/postEmpresario",
          {idEmpresario: partAux,
          idEmpresa: this.idEmpresa},
          {withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          }).then((response)=>{
            if(response.status === 201)
              bus.$emit("submitEmpresario", "Novo empresario inserido!")
              if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
          }).catch((error) =>{
            if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            this.$toasted.error("Erro a inserir novo Empresário!")

          })

        }).catch((error) =>{
          this.$toasted.error("Erro a inserir novo Empresário!")

        })
        return;
      }else{
          partAux = this.input.inputPessoa
      }
          
          axios.post("api/postEmpresario",
          {idEmpresario: partAux,
          idEmpresa: this.idEmpresa},
          {withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          }).then((response)=>{
            if(response.status === 201)
              bus.$emit("submitEmpresario", "Novo empresario inserido!")
              if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
          }
          }).catch((error) =>{
            if(error.error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            this.$toasted.error("Erro a inserir novo Empresário!")

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

.formNovoEmpresario{
  font-family: "Open Sans";
	display: flex;
  align-items: center;
  justify-content: center;
}

.formNovoEmpresario .form{
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 15px;
  background-color: oldlace;
  width: 100%;
}
.formNovoEmpresario .form .obrigatorio{
  color: red;
}
.formNovoEmpresario .novoEmpresario{
	grid-column-start: 1;
  grid-row-start: 1;
	margin-top: 10px;
  margin-left: 192px;
}

.formNovoEmpresario .novaPessoa{
	grid-column-start: 2;
	margin-top: 40px;
}

.formNovoEmpresario .novaPessoa input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.formNovoEmpresario .novaPessoa a {
  border: 1px solid #a1a0a0;
  height: 20px;
}
.formNovoEmpresario .nome{
  margin-left: 200px;
}
.formNovoEmpresario .nome input{
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.formNovoEmpresario .telefone{
  margin-left: 200px;
  grid-column-start: 1;
}

.formNovoEmpresario .telefone input{
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .zona{
  margin-left: 200px;
}

.formNovoEmpresario .zona input{
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .nif{
  margin-left: 200px;
}

.formNovoEmpresario .nif input{
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .email input{
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .idade input{
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .comoConheceu {
  width: 50%;
  display: -webkit-box;
}

.formNovoEmpresario .comoConheceu select {
  height: 30px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
}

.formNovoEmpresario .comoConheceu .atravesQuem {
  width: 88%;
  margin-left: 9px;
  margin-top: 17px;
}

.formNovoEmpresario .comoConheceu .local {
  width: 105%;
  margin-left: 9px;
}

.formNovoEmpresario .comoConheceu .local input{
  width: 86%;
  margin-top: 22px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.formNovoEmpresario .registar{
  margin-left: 192px;
  margin-bottom: 15px;
}

.formNovoEmpresario .registar button {
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
.formNovoEmpresario .registar button:hover {
  background-color: #fab995;
}

</style>