<template>
  <div class="inscricaoEvento">
    <div class="atempharlogo">
      <div class="imagem">
        <a href="http://www.atemphar.org">
          <img src="../../assets/logo_atemphar.png">
        </a>
      </div>
      <div class="txtTitle">Plataforma de Dados</div>
    </div>
    <br>
    <div class="conteudo" v-if="isEventoValido">
      <div id="inscricaoEvento" class="w3-panel">
        <h1>Inscrição em Evento</h1>
        <div class="informacoesEvento">
            <h3><b>Informações do Evento</b></h3>
            <p><b>Nome:</b> {{evento.nomeEvento}}</p>
            <p><b>Data:</b> {{evento.dataEvento}}</p>
            <p><b>Local:</b> {{evento.localEvento}}</p>
            <p><b>Tipo de Evento:</b> {{evento.tipoEvento}}</p>
            

        </div>
        <br>
        <div class="buttons">
           <div class="primeiroEvento">
            <button class="primeiroEvento" type="submit" v-on:click.prevent="isPrimeiroEvento = 1">
              <i class="fa fa-plus"></i> É o Primeiro Evento</button>
          </div>
             <div class="jaParticipou">
            <button class="jaParticipou" type="submit" v-on:click.prevent="isPrimeiroEvento = 0">
              <i class="fa fa-user"></i> Já Participei
            </button>
          </div>
        </div>
        <div id="fields" v-if="isPrimeiroEvento == 0" class="campos">
          <div class="form">
            Email:
            <label>
              <input type="email" name="email" v-model="input.email">
            </label>
            <br>Telemóvel:
            <label>
              <input type="number" name="telemovel" v-model="input.telemovel">
            </label>
            <br>
            <div class="registarInscricao">
              <button type="submit" v-on:click.prevent="registar()">
                <i class="far fa-save"></i> Registar Inscrição
              </button>
            </div>
        </div>
        </div>
        <div class="novaPessoa" v-if="isPrimeiroEvento == 1">
        <div class="form">
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
            <input type="radio" v-model="inputPessoa.genero" name="m" value="M"> Masculino
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="f" value="F"> Feminino
            <br>
            <input type="radio" v-model="inputPessoa.genero" name="o" value="O"> Outro
            <br>
          </div>
          <div class="zona">
            <label>Zona:<i class="obrigatorio">*</i></label>
            <br>
            <input type="text" v-model="inputPessoa.zona" name="zona">
          </div>
          <div class="idade">
            <label>Data Nasc.:<i class="obrigatorio">*</i></label>
            <br>
            <input type="date" v-model="inputPessoa.dataNasc" name="idade">
          </div>
          <div class="nif">
            <label>NIF:</label>
            <br>
            <input type="text" v-model="inputPessoa.nif" name="nif">
          </div>
          <div class="comoConheceu">
            <label>Como Conheceu:<i class="obrigatorio">*</i></label>
            <br>
            <select v-model="inputPessoa.comoConheceu">
              <option>Pessoa</option>
              <option value="Local">Folheto em Local</option>
              <option>Redes Sociais</option>
              <option>E-Mail</option>
            </select>
              <div class="atravesQuem" v-if="inputPessoa.comoConheceu === 'Pessoa'">
                <label>Nome da Pessoa que Conheceu:<i class="obrigatorio">*</i></label>
                <br>
                <input type="text" v-model="inputPessoa.atravesDe" name="atravesDe">
              </div>
            <template v-else-if="inputPessoa.comoConheceu === 'Local'">
              <div class="local">
                <input type="text" v-model="inputPessoa.atravesDe" name="local" placeholder="Local">
              </div>
            </template>
          </div>
        <div class="registar">
          <button type="submit" v-on:click.prevent="registarPessoa()">
            <i class="far fa-save"></i> Registar Inscrição
          </button>
        </div>
    </div>
        </div>
      </div>
    </div>
    <div v-else class="conteudo">
        <h1>Link Inválido!</h1>
    </div>

    <footer class="creditos">
      <img src="../../assets/ipl_logo.png">
      <label class="uc">
        ESTG, Engenharia Informática,
        <br>UC Projeto Informático, 2019/20
      </label>
      <div class="autores">
        <label class="titulo">Desenvolvido por:</label>
        <br>
        <label>[Francisco Silva e Ricardo Soares]@2020, [João Dias e Cristiana Sousa]@2019</label>
      </div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
var axios = require("axios");
var instance = axios.create({
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          }
      });
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) { 
        bus.$emit("logout");
      }
 });
export default {
  data() {
    return {
      input: {
        email: "",
        telemovel: ""
      },
      inputPessoa:{
        nome: "",
        email: "",
        genero: "",
        telefone: "",
        zona: "",
        nif: null,
        dataNasc: "",
        comoConheceu: "Pessoa",
        atravesDe: "",
        idInserido : null
      },
      changedDate :"",
      isEventoValido:false,
      evento : null,
      pessoa : null,
      isPrimeiroEvento :-1
    };
  },
  computed: {
     
  },
   async created() {
       await instance
      .get(`/api/getDadosEventosByToken/${this.$route.params.token}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.evento = response.data
        this.isEventoValido = true   
        
      })
      .catch(error => {
          if(error.response.status === 404 || error.response.status === 410){
              this.isEventoValido = false   
          }
          
      });
  
  },
  methods: {
    validar(email,telemovel){
        if(email != ""){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         
         if(!re.test(email)){
             this.$toasted.error("Formato de email inválido!");
            return false;
         }
        }else if(telemovel != ""){
            if(this.input.telemovel.length < 9){
                this.$toasted.error("Número de telemóvel tem de conter no mínimo 9 dígitos!");
                return false;
            }
           if(!/^\d+$/.test(telemovel)){
                this.$toasted.error("Número de telemóvel só pode conter dígitos!");
                return false;
           }
        }else{
            this.$toasted.error("Por favor insira um endereço de email ou um número de telemóvel!");
            return false;
        }

        return true;
    },
    registar: function() {
        if(!this.validar(this.input.email,this.input.telemovel)){
            return;
        }
        if(this.input.email != ""){
               instance
                .post(
                    "/api/postParticipacaoEventoEmail",
                    {
                    email : this.input.email,
                    idEvento : this.evento.idEvento
                    }
              )
              .then(response => {
                this.$toasted.show("Confirme a inscrição no seu email!");
                this.clearFields();
                this.isPrimeiroEvento = -1;
              })
              .catch((errors, response) => {
                if(error.response.status === 401){
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
                this.$toasted.error("Erro a registar a inscrição!");
              });
               
        }else {
          instance
                  .post(
                          "/api/postParticipacaoEventoTelemovel",
                          {
                            telemovel: this.input.telemovel,
                            idEvento: this.evento.idEvento
                          }
                  )
                  .then(response => {
                    this.$toasted.show("Confirme a inscrição no seu email!");
                    this.clearFields();
                    this.isPrimeiroEvento = -1;
                  })
                  .catch((errors, response) => {
                    if (error.response.status === 401) {
                      this.$toasted.error("Sessão expirou.");
                      bus.$emit("logout");
                    }
                    this.$toasted.error("Erro a registar a inscrição!");
                  });

        }

    },
     clearFields(){
      this.inputPessoa.jaFreq = true,
      this.inputPessoa.nome = "",
      this.inputPessoa.inputPessoa = "",
      this.inputPessoa.email = "",
      this.inputPessoa.genero = "",
      this.inputPessoa.telefone = "",
      this.inputPessoa.zona = "",
      this.inputPessoa.nif = "",
      this.inputPessoa.dataNasc = "",
      this.inputPessoa.comoConheceu = "Pessoa",
      this.inputPessoa.atravesDe = "",
      this.input.email = "",
      this.input.telemovel = ""
      
    },
    registarPessoa(){
       if (
          this.inputPessoa.nome == "" ||
          this.inputPessoa.nome == null ||
          this.inputPessoa.email == "" ||
          this.inputPessoa.email == null ||
          this.inputPessoa.telefone == "" ||
          this.inputPessoa.telefone == null ||
          this.inputPessoa.zona == "" ||
          this.inputPessoa.zona == null ||
          this.inputPessoa.genero == "" ||
          this.inputPessoa.genero == null ||
          this.inputPessoa.dataNasc == "" ||
          this.inputPessoa.dataNasc == null
        ) {
           this.$toasted.error("Campos obrigatórios em falta!");
          return;
        }

        if(!this.validar(this.inputPessoa.email,this.inputPessoa.telefone)){
          return;
        }

        if(this.inputPessoa.nif != null && this.inputPessoa.nif != "" && this.inputPessoa.nif.length != 9){
           this.$toasted.error("NIF de tamanho inválido!");
          return;
        }

        

        if(this.inputPessoa.comoConheceu ===  'Local' && (this.inputPessoa.atravesDe == null || this.inputPessoa.atravesDe == "")){
           this.$toasted.error("Obrigatório selecionar pessoa por onde conheceu!");
          return;
        }

      if(new Date(this.inputPessoa.dataNasc).getTime() > new Date().getTime() ){
        this.$toasted.error("Data Inválida!");
        return;
      }


      if(this.inputPessoa.comoConheceu === "Local" && (this.inputPessoa.atravesDe == null || this.inputPessoa.atravesDe == "")){
          this.$toasted.error("Obrigatório indicar local por onde conheceu!");
          return;
        }


        //(nome, email, telefone, zona, idade, genero, nif, comoConheceu, atravesQuem)
      instance
          .post(
            `/api/postPessoaInscricao/${this.$route.params.token}`,
            {
              nome: this.inputPessoa.nome,
              email: this.inputPessoa.email,
              telefone: this.inputPessoa.telefone,
              zona: this.inputPessoa.zona,
              dataNasc: this.inputPessoa.dataNasc,
              genero: this.inputPessoa.genero,
              nif: this.inputPessoa.nif,
              comoConheceu:
                this.inputPessoa.comoConheceu === "Local"
                  ? this.inputPessoa.atravesDe
                  : this.inputPessoa.comoConheceu,
              atravesQuemNome:
                this.inputPessoa.comoConheceu === "Pessoa"
                  ? null
                  : this.inputPessoa.atravesDe
            }
          )
          .then(response => {
            if (response.status == 401) {
                 this.$toasted.error("Sessão expirou.");
                bus.$emit("logout");
            }
            if (response.status == 201) {
              this.inputPessoa.idInserido = response.data;

              /*REGISTA A SUA INSCRICAO*/
              instance
                      .post(
                              "/api/postParticipacaoEventoEmail",
                              {
                                email: this.inputPessoa.email,
                                idEvento: this.evento.idEvento
                              }
                      )
                      .then(response => {
                        this.$toasted.show("Confirme a inscrição no seu email!");
                        this.clearFields();
                        this.isPrimeiroEvento = -1;
                      })
                      .catch((errors, response) => {
                        if (error.response.status === 401) {
                          this.$toasted.error("Sessão expirou.");
                          bus.$emit("logout");
                        }
                        this.$toasted.error("Erro a registar a inscrição!");
                      });
            }

          }).catch(error => {
             if(error.response.status === 401){
               this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
             this.$toasted.error("Erro a registar Pessoa!");
          })
    }
    }
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://fonts.googleapis.com/css?family=Actor");

.inscricaoEvento .atempharlogo {
  background-image: url("../../assets/campo_trigo.jpg");
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100%;
}

.inscricaoEvento .atempharlogo .imagem {
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 10px;
}

.inscricaoEvento .atempharlogo .imagem img {
  width: 90%;
  margin-top: 10px;
}
.inscricaoEvento .atempharlogo .txtTitle {
  grid-column-start: 2;
  grid-row-start: 3;
  color: #ffffff;
  font-family: "Berlin Sans FB";
  font-size: 5vw;
  margin-right: 20px;
}

#inscricaoEvento {
  margin: auto;
  width: 80%%;
  padding: 10px;
  overflow: hidden;
  
}
.inscricaoEvento{
  height: 100%;
}

.inscricaoEvento .campos{
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;

}

.inscricaoEvento .novaPessoa{
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;

}

.inscricaoEvento .conteudo{

  min-height: calc(100vh - 425px)
}

.inscricaoEvento .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}

.inscricaoEvento .informacoesEvento{
  margin: auto;
  width:30%;
  padding: 10px;
  border: 3px solid lightgray;
  overflow: hidden;
}

.inscricaoEvento .informacoesEvento h3
{
     text-align: left;
}

#fields {
  padding: 3px;
}

.inscricaoEvento .campos input {
  margin-bottom: 15px;
  width: 100%;
}

.inscricaoEvento .creditos {
  background-color: #f1f1f1;
  display: grid;
  height: 59px;

}

.inscricaoEvento .creditos img {
  width: 150px;
  grid-column-start: 1;
  grid-row-start: 1;
  margin-left: 30px;
}

.inscricaoEvento .creditos .uc {
  grid-column-start: 2;
  grid-row-start: 1;
  align-self: end;
  justify-self: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.inscricaoEvento  .creditos .autores {
  grid-column-start: 3;
  grid-row-start: 1;
  align-self: center;
  justify-self: end;
  margin-right: 30px;
  font-size: 10px;
  font-family: "Actor";
}

.inscricaoEvento .creditos .titulo {
  font-weight: bold;
}

.buttons {
  margin: auto;
  margin-bottom:40px;
  margin-top:10px;
  width: 50%;
}

.primeiroEvento {
  float :left;
  width: 20%;
  height: 50px;
  margin-left: 30%;
  }

.primeiroEvento button {
  height: 50px;
  width: 80%;
  font-size: medium;
  cursor: pointer;
  border: none;
  background-color: #e99d72;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}
.primeiroEvento button:hover {
  background-color: #fab995;
}


.jaParticipou {
  margin-top: 1%;
  height:30px
}

.jaParticipou button {
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
.jaParticipou button:hover {
  background-color: #fab995;
}

.inscricaoEvento .form{
  width:50%;
  margin-left:25%;
}

.inscricaoEvento .nome {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.inscricaoEvento .nome input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .email {
  grid-column-start: 2;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.inscricaoEvento .email input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.inscricaoEvento .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 2;
}

.inscricaoEvento .telefone input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .zona {
  margin-left: 115px;
  grid-column-start: 2;
  grid-row-start: 2;
}

.inscricaoEvento .zona input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.inscricaoEvento .nif input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .genero {
  margin-left: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}


.inscricaoEvento .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.inscricaoEvento .idade input {
  width: 100%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .comoConheceu {
  width: 50%;
  display: -webkit-box;
  margin-left: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
  margin-bottom:20px;
}

.inscricaoEvento .comoConheceu select {
  height: 30px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
}

.inscricaoEvento .comoConheceu .atravesQuem {
  width: 117%;
  margin-left: 20px;

}

.inscricaoEvento .comoConheceu .local {
  width: 105%;
  margin-left: 9px;
}

.inscricaoEvento .comoConheceu .local input {
  width: 117%;
  margin-top: 22px;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.inscricaoEvento .registar {
  margin-left: 115px;
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 5;
  justify-self: end;
}

.inscricaoEvento .registar button {
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

.inscricaoEvento .registarInscricao {
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 5;
  justify-self: end;
}

.inscricaoEvento .registarInscricao button {
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
</style>