<template>
  <div class="adicionarPalestraSimposio">
    <br>
    <div class="form">
      <div class="nome">
        <label>
          Nome:
          <i class="obrigatorio">*</i>
        </label>
        <br>
        <input type="text" v-model="input.nome" name="nome">
      </div>
      <div class="data">
        <label>
          Data:
          <i class="obrigatorio">*</i>
        </label>
        <br>
        <input type="datetime-local" v-model="input.data" name="data">
      </div>
      <!--
        <div class="oradorExistente">
            <label>Orador já existente?</label>
            <br>
            <input
              type="radio"
              v-model="input.oradorRecorrente"
              name="oradorRecorrente"
              v-bind:value="true"
            > Sim
            <br>
            <input
              type="radio"
              v-model="input.oradorRecorrente"
              name="oradorRecorrente"
              v-bind:value="false"
            > Não
            <br>
          </div>
      -->

      <div class="botaoOradorExistente">
        <a class="fas fa-user-plus">
          <input type="button" v-model="buttonText" v-on:click="toggleInsert()">
        </a>

        <br>
      </div>

      <template v-if="input.oradorRecorrente">
        <div class="orador">
          <label>
            Orador:
            <i class="obrigatorio">*</i>
          </label>
          <br>
          <!--
              <input name="inputOrador" v-model="input.inputOrador" list="listaOrador" key="orador-rec">
              <datalist id="listaOrador">
                <option
                  v-for="(orador, key) in allOrators"
                  :key="key"
                >{{orador.idOrador}}: {{orador.nome}}</option>
              </datalist>
          -->
          <model-list-select
            :list="allOrators"
            v-model="input.inputOrador"
            option-value="idOrador"
            option-text="nome"
            placeholder="Escolher"
          ></model-list-select>
        </div>
      </template>

      <template v-else>
        <div class="novoOrador">
          <div class="botaoPessoaExistente">
            <a class="fas fa-user-plus">
              <input type="button" v-model="buttonPessoaText" v-on:click="togglePessoaInsert()">
            </a>
          </div>
          <template v-if="input.notNovaPessoaOrador">
            <div class="listaPessoas">
              <label>
                Novo Orador:
                <i class="obrigatorio">*</i>
              </label>
              <br>

              <!--
                    <input name="inputPessoa" v-model="input.inputPessoa" list="listaPessoa" key="orador-new">
                    <datalist id="listaPessoa">
                      <option
                        v-for="(pessoa, key) in allPersons"
                        :key="key"
                      >{{pessoa.idPessoa}}: {{pessoa.nome}}</option>
                    </datalist>
              -->
              <model-list-select
                :list="allPersons"
                v-model="input.inputPessoa"
                option-value="idPessoa"
                option-text="nome"
                placeholder="Escolher"
              ></model-list-select>
            </div>
          </template>
          <!-- terceira opção ->inserir nova pessoa -->
          <template v-else>
            <div class="nomeOrador">
              <label>
                Nome:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="text" v-model="inputNovaPessoa.nome" name="nome">
            </div>
            <div class="email">
              <label>
                Email:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="text" v-model="inputNovaPessoa.email" name="email">
            </div>
            <div class="telefone">
              <label>
                Telefone:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="text" v-model="inputNovaPessoa.telefone" name="telefone">
            </div>
            <div class="genero">
              <label>
                Género:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="radio" v-model="inputNovaPessoa.genero" name="m" value="M"> M
              <br>
              <input type="radio" v-model="inputNovaPessoa.genero" name="f" value="F"> F
              <br>
            </div>
            <div class="zona">
              <label>
                Zona:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="text" v-model="inputNovaPessoa.zona" name="zona">
            </div>
            <div class="idade">
              <label>
                Data de Nascimento:
                <i class="obrigatorio">*</i>
              </label>
              <br>
              <input type="date" v-model="inputNovaPessoa.dataNasc" name="idade">
            </div>
            <div class="nif">
              <label>NIF:</label>
              <br>
              <input type="text" v-model="inputNovaPessoa.nif" name="nif">
            </div>
            <div class="comoConheceu">
              <label>Como Conheceu:</label>
              <br>
              <select v-model="inputNovaPessoa.comoConheceu">
                <option>Pessoa</option>
                <option value="Local">Folheto em Local</option>
                <option>Redes Sociais</option>
                <option>E-Mail</option>
              </select>
              <template
                v-if="inputNovaPessoa.comoConheceu === 'Pessoa' || inputNovaPessoa.comoConheceu === 'Redes Sociais' || inputNovaPessoa.comoConheceu === 'E-Mail'"
              >
                <div class="atravesQuem">
                  <model-list-select
                    :list="allPersonsWithOrators"
                    v-model="inputNovaPessoa.atravesDe"
                    option-value="idPessoa"
                    option-text="nome"
                    placeholder="Escolher"
                  ></model-list-select>
                </div>
              </template>
              <template v-else-if="inputNovaPessoa.comoConheceu === 'Local'">
                <!-- conheceu através de um folheto num local -->
                <div class="local">
                  <!--<label>Local:</label>
                  <br>-->
                  <input
                    type="text"
                    v-model="inputNovaPessoa.atravesDe"
                    name="local"
                    placeholder="Local"
                  >
                </div>
              </template>
            </div>
          </template>
          <div class="especialidade">
            <label>
              Especialidade:
              <i class="obrigatorio">*</i>
            </label>
            <br>
            <input name="inputEspecialidade" v-model="input.especialidade">
          </div>
        </div>
      </template>

      <div class="observacoes">
        <label>Observações:</label>
        <br>
        <textarea type="text" v-model="input.observacoes" name="observacoes"></textarea>
      </div>
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
  }
);

import { bus } from "../../main.js";
import { ModelListSelect } from "vue-search-select";
export default {
  mounted() {
    axios
      .get("api/getAllPessoasNaoOradores", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPersons = response.data;
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      });

    axios
      .get("api/getAllOradores", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allOrators = response.data;
      })
      .catch(error => {
        if (error.response.status === 401) {
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
        this.allPersonsWithOrators = response.data;
        if (errors.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$toasted.error("Sessão expirou.");
          bus.$emit("logout");
        }
      });
  },
  props: {
    idEvento: {
      type: String,
      required: true
    },
    dataEvento: {
      required: true
    },
    localEvento: {
      type: String,
      required: true
    }
  },
  data() {
    var here = this;
    return {
      input: {
        nome: "",
        tipoEvento: "PalestraSimposio",
        inputPessoa: "",
        inputOrador: "",
        data: "",
        local: this.localEvento,
        observacoes: "",
        especialidade: "",
        oradorRecorrente: true,
        notNovaPessoaOrador: true
        //False significa inserção nova pessoa como orador
      },
      inputNovaPessoa: {
        nome: "",
        email: "",
        genero: "",
        telefone: "",
        zona: "",
        nif: "",
        comoConheceu: "Pessoa",
        atravesDe: "",
        dataNasc: ""
      },
      buttonText: "Novo Orador",
      buttonPessoaText: "Adicionar Pessoa",
      allPersons: [],
      allOrators: [],
      allPersonsWithOrators: []
    };
  },
  methods: {
    clearFields: function() {
      (this.input.nome = ""),
        (this.input.oradorRecorrente = "true"),
        (this.input.notNovaPessoaOrador = "true"),
        (this.input.inputOrador = ""),
        (this.input.inputPessoa = ""),
        (this.input.data = ""),
        (this.input.local = ""),
        (this.input.observacoes = ""),
        (this.input.especialidade = ""),
        (this.inputNovaPessoa.nome = ""),
        (this.inputNovaPessoa.email = ""),
        (this.inputNovaPessoa.genero = ""),
        (this.inputNovaPessoa.telefone = ""),
        (this.inputNovaPessoa.zona = ""),
        (this.inputNovaPessoa.nif = ""),
        (this.inputNovaPessoa.comoConheceu = ""),
        (this.inputNovaPessoa.atravesDe = "");
    },
    submit: function() {
      var oradorAux;
      var eventoAux;
      //verificar se há outros campos obrigatorios vazios
      if (
        this.input.nome === "" ||
        this.input.oradorRecorrente === "" ||
        this.input.data === "" ||
        this.input.local === ""
      ) {
        this.$toasted.error("Campos obrigatorios vazios!");
        return;
      }

      var dataPalestraAux = new Date(this.input.data);
      dataPalestraAux.setHours(0);
      dataPalestraAux.setMinutes(0);
      var dataEventoAux = new Date(this.dataEvento);
      dataEventoAux.setHours(0);
      dataEventoAux.setMinutes(0);
      if (dataPalestraAux.getTime() != dataEventoAux.getTime()) {
        this.$toasted.error("Uma palestra tem de ocorrer no mesmo dia do Simpósio!");
        return;
      }

      //INSERÇÕES DE EVENTO

      //tratar do orador
      if (this.input.oradorRecorrente) {
        oradorAux = this.input.inputOrador;
        if(oradorAux == "" || oradorAux == null){
          this.$toasted.error("Selecionar ou inserir orador!!");
          return;
        }
      } else if (!this.input.notNovaPessoaOrador) {
        //inserir nova pessoa, oradorAux é o ID do insert
         if (
          this.inputNovaPessoa.nome == "" ||
          this.inputNovaPessoa.nome == null ||
          this.inputNovaPessoa.email == "" ||
          this.inputNovaPessoa.email == null ||
          this.inputNovaPessoa.telefone == "" ||
          this.inputNovaPessoa.telefone == null ||
          this.inputNovaPessoa.zona == "" ||
          this.inputNovaPessoa.zona == null ||
          this.inputNovaPessoa.genero == "" ||
          this.inputNovaPessoa.genero == null ||
          this.inputNovaPessoa.dataNasc == "" ||
          this.inputNovaPessoa.dataNasc == null
        ) {
          this.$toasted.error("campos em falta!");
          return;
        }

        if(this.inputNovaPessoa.telefone.length != 9){
          this.$toasted.error("Número de telefone de tamanho inválido!");
          return;
        }

        if(!/^\d+$/.test(this.inputNovaPessoa.telefone)){
          this.$toasted.error("caracteres inválidos no número de telefone!");
          return;
        }

        if(this.inputNovaPessoa.nif != "" && this.inputNovaPessoa.nif.length != 9){
          this.$toasted.error("NIF de tamanho inválido!");
          return;
        }

        if(/\S+@\S+\.\S+/.test(this.inputNovaPessoa.email)){
          this.$toasted.error("Formato de email inválido!");
          return;
        }

        

        if(this.inputNovaPessoa.comoConheceu.valueOf() != "Local".valueOf() && (this.inputNovaPessoa.atravesDe == null || this.inputNovaPessoa.atravesDe == "")){
          this.$toasted.error("Obrigatório selecionar pessoa por onde conheceu!");
          return;
        }

        axios
          .post(
            "api/postPessoa",
            {
              nome: this.inputNovaPessoa.nome,
              email: this.inputNovaPessoa.email,
              telefone: this.inputNovaPessoa.telefone,
              zona: this.inputNovaPessoa.zona,
              dataNasc: this.inputNovaPessoa.dataNasc,
              genero: this.inputNovaPessoa.genero,
              nif: this.inputNovaPessoa.nif,
              comoConheceu:
                this.inputNovaPessoa.comoConheceu === "Local"
                  ? this.inputNovaPessoa.atravesDe
                  : this.inputNovaPessoa.comoConheceu,
              atravesDe:
                this.inputNovaPessoa.comoConheceu === "Local"
                  ? null
                  : this.inputNovaPessoa.atravesDe
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
            oradorAux = response.data;
            //post na tabela de oradores
            axios
              .post(
                "api/postOrador",
                {
                  idOrador: oradorAux,
                  especialidade: this.input.especialidade
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
                  this.$toasted.error("Inserção de orador realizada com sucesso!");
                }
                
              })
              .catch(error => {
                if (error.response.status === 401) {
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
                this.$toasted.error("Erro a inserir pessoa nos oradores");

              });
            //post Evento
            axios
              .post(
                "api/postEvento",
                {
                  idOrador: oradorAux,
                  nome: this.input.nome,
                  data: this.input.data,
                  local: this.input.local,
                  tipoEvento: this.input.tipoEvento,
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
                  this.$toasted.error("Inserção de Evento realizada com sucesso!");
                }
                //obter SELECT ID e colocar na tabela de relacionamento
                eventoAux = response.data;
                axios
                  .post(
                    "api/postPalestraSimposio",
                    {
                      idPalestra: eventoAux,
                      idSimposio: this.idEvento
                    },
                    {
                      withCredentials: true,
                      headers: {
                        Authorization:
                          `Bearer ` + sessionStorage.getItem("token")
                      }
                    }
                  )
                  .then(response => {
                    if (response.status === 201) {
                      bus.$emit(
                        "submitPart",
                        "Nova palestra com nova pessoa como orador inserida!"
                      );
                      this.$forceUpdate();
                      return;
                    }
                  })
                  .catch();

                this.clearFields();
                return;
              })
              .catch(error => {
                if (error.response.status === 401) {
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
                this.$toasted.error("Erro na inserção de evento com nova pessoa!");

              });
          })
          .catch(error => {

          });
          return;
      } else {
        oradorAux = this.input.inputPessoa;
      }

      if (this.inputNovaPessoa) {
        axios
          .post(
            "api/postEvento",
            {
              idOrador: oradorAux,
              nome: this.input.nome,
              data: this.input.data,
              local: this.input.local,
              tipoEvento: this.input.tipoEvento,
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
            if (response.status === 401) {
              this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
            //obter SELECT ID e colocar na tabela de relacionamento
            eventoAux = response.data;
            axios
              .post(
                "api/postPalestraSimposio",
                {
                  idPalestra: eventoAux,
                  idSimposio: this.idEvento
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(() => {
                bus.$emit("submitPart", "Nova palestra inserida!");
                return;
              })
              .catch(error => {
                if (error.response.status === 401) {
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
              });
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.$toasted.error("Sessão expirou.");
              bus.$emit("logout");
            }
            this.$toasted.error("Erro na inserção de evento!");

          });
      }
    },
    toggleInsert: function() {
      if (this.input.oradorRecorrente) {
        this.buttonText = "Cancelar";
      } else {
        this.buttonText = "Novo Orador";
      }
      this.input.oradorRecorrente = !this.input.oradorRecorrente;
    },
    togglePessoaInsert: function() {
      if (this.input.notNovaPessoaOrador) {
        this.buttonPessoaText = "Cancelar";
      } else {
        this.buttonPessoaText = "Adicionar Pessoa";
      }
      this.input.notNovaPessoaOrador = !this.input.notNovaPessoaOrador;
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

.adicionarPalestraSimposio {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.adicionarPalestraSimposio .form {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 15px;
  background-color: oldlace;
  width: 100%;
}

.adicionarPalestraSimposio .form .obrigatorio {
  color: red;
}

.adicionarPalestraSimposio .nome {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 15px;
  margin-left: 192px;
}
.adicionarPalestraSimposio .nome input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}
.adicionarPalestraSimposio .data {
  grid-column-start: 2;
  margin-top: 15px;
}

.adicionarPalestraSimposio .data input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .observacoes {
  grid-column-start: 1;
  grid-row-start: 2;
  margin-left: 192px;
}
.adicionarPalestraSimposio .observacoes textarea {
  width: 80%;
  height: 150px;
  box-sizing: border-box;
  border: 1px solid #a1a0a0;
  resize: none;
  border-radius: 4px;
}

.adicionarPalestraSimposio .orador {
  height: 15px;
  width: 48%;
  grid-row-start: 2;
  grid-column-start: 2;
}

.adicionarPalestraSimposio .botaoOradorExistente {
  grid-row-start: 2;
  grid-column-start: 2;
  justify-self: center;
  margin-top: 30px;
  margin-left: 105px;
}

.adicionarPalestraSimposio .botaoOradorExistente input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.adicionarPalestraSimposio .botaoOradorExistente a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.adicionarPalestraSimposio .novoOrador .listaPessoas {
  width: 58%;
  grid-column-start: 1;
  grid-row-start: 3;
  margin-left: 192px;
}

.adicionarPalestraSimposio .novoOrador .botaoPessoaExistente {
  margin-top: 30px;
  grid-column-start: 2;
  grid-row-start: 3;
  justify-self: center;
  margin-left: 55px;
}

.adicionarPalestraSimposio .novoOrador .botaoPessoaExistente input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.adicionarPalestraSimposio .novoOrador .botaoPessoaExistente a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.adicionarPalestraSimposio .novoOrador {
  grid-row-start: 4;
  display: contents;
}
.adicionarPalestraSimposio .novoOrador .nomeOrador {
  grid-column-start: 1;
  grid-row-start: 4;
  margin-left: 192px;
}

.adicionarPalestraSimposio .novoOrador .nomeOrador input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .email {
  grid-column-start: 2;
  grid-row-start: 4;
}

.adicionarPalestraSimposio .novoOrador .email input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .telefone {
  grid-column-start: 2;
  grid-row-start: 5;
}

.adicionarPalestraSimposio .novoOrador .telefone input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .genero {
  grid-column-start: 1;
  grid-row-start: 6;
  margin-left: 192px;
}

.adicionarPalestraSimposio .novoOrador .zona {
  grid-column-start: 2;
  grid-row-start: 6;
}

.adicionarPalestraSimposio .novoOrador .zona input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .idade {
  grid-column-start: 1;
  grid-row-start: 5;
  margin-left: 192px;
}

.adicionarPalestraSimposio .novoOrador .idade input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .nif {
  grid-column-start: 2;
  grid-row-start: 7;
}

.adicionarPalestraSimposio .novoOrador .nif input {
  width: 70%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .especialidade {
  grid-column-start: 1;
  grid-row-start: 7;
  margin-left: 192px;
}

.adicionarPalestraSimposio .novoOrador .especialidade input {
  width: 80%;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 35px;
}

.adicionarPalestraSimposio .novoOrador .comoConheceu {
  grid-column-start: 1;
  grid-row-start: 8;
  margin-left: 192px;
  width: 39%;
  margin-bottom: 15px;
  display: -webkit-box;
}

.adicionarPalestraSimposio .novoOrador .comoConheceu select {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 30px;
}

.adicionarPalestraSimposio .novoOrador .comoConheceu .atravesQuem {
  margin-top: 15px;
  width: 98%;
  margin-left: 9px;
}

.adicionarPalestraSimposio .novoOrador .comoConheceu .local {
  margin-top: 22px;
  width: 100%;
  margin-left: 9px;
}

.adicionarPalestraSimposio .novoOrador .comoConheceu .local input {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  width: 103%;
  height: 35px;
}

.adicionarPalestraSimposio .registar {
  margin-left: 192px;
  margin-bottom: 30px;
  grid-column-start: 1;
  grid-row-start: 9;
}

.adicionarPalestraSimposio .registar button {
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
.adicionarPalestraSimposio .registar button:hover {
  background-color: #fab995;
}
</style>