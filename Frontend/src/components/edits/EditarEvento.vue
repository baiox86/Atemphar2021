<template>
  <div>
    <br>
    <div class="voltarEvento">
      <button v-on:click="switchComponent('EventsTablesMenu')">
        <i class="fas fa-reply"></i>Voltar
      </button>
    </div>
    <br>
    <h1>Editar Evento</h1>
    <br>
    <div class="editarEvento">
      <div id="fields" class="fields">
        <div class="nomeEvento">
          <label>Nome:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.nome" name="nome">
        </div>
        <div class="tipo">
          <label>Tipo de Evento:</label>
          <br>
          {{this.input.tipoEvento}}
        </div>

        <div class="data">
          <label>Data:<i class="obrigatorio">*</i></label>
          <br>
          <input type="datetime-local" v-model="input.data" name="data">
        </div>
        <div class="localEvento">
          <label>Local:<i class="obrigatorio">*</i></label>
          <br>
          <input type="text" v-model="input.local" name="local">
        </div>
        <div class="observacoes">
          <label>Observações:</label>
          <br>
          <textarea type="text" v-model="input.observacoes" name="observacoes"></textarea>
        </div>

        <template v-if="input.tipoEvento === 'Workshop'">
          <div class="custo">
            <label>Custo:<i class="obrigatorio">*</i></label>
            <br>
            <input type="number" v-model="input.custo" name="custo" min="0.01" step="0.01">
          </div>
        </template>

        <template v-if="input.tipoEvento === 'Workshop' || input.tipoEvento === 'Palestra'">
          <div class="botaoOradorExistente">
            <a class="fas fa-user-plus">
              <input type="button" v-model="buttonText" v-on:click="toggleInsert()">
            </a>
            <br>
          </div>
          <template v-if="input.oradorRecorrente">
            <div class="orador">
              <label>Orador:</label><i class="obrigatorio">*</i>
              <br>
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
                <br>
              </div>
              <template v-if="input.notNovaPessoaOrador">
                <div class="listaPessoas">
                  <label>Novo Orador:<i class="obrigatorio">*</i></label>
                  <br>
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
                <div class="nome">
                  <label>Nome:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="text" v-model="inputNovaPessoa.nome" name="nome">
                </div>
                <div class="email">
                  <label>Email:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="text" v-model="inputNovaPessoa.email" name="email">
                </div>
                <div class="telefone">
                  <label>Telefone:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="text" v-model="inputNovaPessoa.telefone" name="telefone">
                </div>
                <div class="genero">
                  <label>Género:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="radio" v-model="inputNovaPessoa.genero" name="m" value="M"> M
                  <br>
                  <input type="radio" v-model="inputNovaPessoa.genero" name="f" value="F"> F
                  <br>
                </div>
                <div class="zona">
                  <label>Zona:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="text" v-model="inputNovaPessoa.zona" name="zona">
                </div>
                <div class="idade">
                  <label>Data de Nascimento:<i class="obrigatorio">*</i></label>
                  <br>
                  <input type="date" v-model="inputNovaPessoa.dataNasc" name="idade">
                </div>
                <div class="nif">
                  <label>NIF:</label>
                  <br>
                  <input type="text" v-model="inputNovaPessoa.nif" name="nif">
                </div>
                <div class="comoConheceu">
                  <label>Como Conheceu:<i class="obrigatorio">*</i></label>
                  <br>
                  <select v-model="inputNovaPessoa.comoConheceu">
                    <option>Pessoa</option>
                    <option value="Local">Folheto em Local</option>
                    <option>Redes Sociais</option>
                    <option>E-Mail</option>
                  </select>

                  <template
                    v-if="inputNovaPessoa.comoConheceu === 'Pessoa' || inputNovaPessoa.comoConheceu === 'Redes Sociais' || input.comoConheceu === 'E-Mail'"
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
                <label>Especialidade:<i class="obrigatorio">*</i></label>
                <br>
                <input name="inputEspecialidade" v-model="input.especialidade">
              </div>
            </div>
          </template>
        </template>

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

import { ModelListSelect } from "vue-search-select";
import { bus } from "../../main.js";
export default {
  props: {
    dadosEvento: {
      type: String,
      required: true
    }
  },
  activated() {
    axios
      .get("api/getAllPessoasNaoOradores", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.allPersons = response.data;
      })
      .catch(error => {
       if(error.response.status === 401){
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
        if(response.status === 401){
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

      })
      .catch(error => {
       if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
      });

      (this.input.nome = this.dadosEvento.nomeEvento),
      (this.input.tipoEvento = this.dadosEvento.tipoEvento),
      (this.input.inputOrador = this.dadosEvento.idOrador),
      (this.input.data = this.dadosEvento.dataEvento.substring(0, 22)),
      (this.input.local = this.dadosEvento.localEvento),
      (this.input.observacoes = this.dadosEvento.observacoes),
      (this.input.custo = parseFloat(this.dadosEvento.custo));
  },
  data() {
    var here = this;
    return {
      input: {
        nome: "",
        tipoEvento: "",
        oradorRecorrente: true,
        inputOrador: "",
        inputPessoa: "",
        data: "",
        local: "",
        observacoes: "",
        custo: "",
        especialidade: "",
        notNovaPessoaOrador: true
      },
      inputNovaPessoa: {
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
      allPersons: [],
      allOrators: [],
      allPersonsWithOrators: [],
      buttonText: "Novo Orador",
      buttonPessoaText: "Adicionar Pessoa"
    };
  },
  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    clearFields: function() {
      (this.input.nome = ""),
        (this.input.tipoEvento = ""),
        (this.input.oradorRecorrente = "true"),
        (this.input.inputOrador = ""),
        (this.input.inputPessoa = ""),
        (this.input.data = ""),
        (this.input.local = ""),
        (this.input.observacoes = ""),
        (this.input.custo = ""),
        (this.input.especialidade = "");
        this.switchComponent('EventsTablesMenu');
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
    },
    submit: function() {
      //axios.post

      //Eventos com orador: Palestras e Workshops
      //Eventos com custo: Workshops

      //verificar se o tipo de palestra está vazio:
      if (this.input.tipoEvento === "") {
        this.$toasted.error("Tipo de evento vazio!");
        return;
      }
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

      //validar a existencia do ID escolhido de Pessoa (para prevenir inserções manuais incorrectas)

      //verificar se orador é novo ou antigo, inserir orador novo na tabela.-
      var oradorAux;
      //se a palestra for uma palestra com orador
      if (
        this.input.tipoEvento === "Palestra" ||
        this.input.tipoEvento === "Workshop"
      ) {
        //se for um orador novo
        if (!this.input.oradorRecorrente) {
          //se também for uma pessoa nova
          if (!this.input.notNovaPessoaOrador) {
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

        if(!/\S+@\S+\.\S+/.test(this.inputNovaPessoa.email)){
          this.$toasted.error("Formato de email inválido!");
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
                        Authorization:
                          `Bearer ` + sessionStorage.getItem("token")
                      }
                    }
                  )
                  .then(response => {
                    if (response.code === 201) {
                      this.$toasted.error("Inserção de evento realizada com sucesso!");
                      this.switchComponent('EventsTablesMenu')
                    }
                    if(response.data == '1062'){
                      this.$toasted.error("NIF ou email já existentes! Possível pessoa duplicada!");
                      return;
                    }
                  })
                  .catch(error => {
                    this.$toasted.error("Erro a inserir pessoa nos oradores");

                  });
                //post Evento
                axios
                  .put(
                    "api/editEvento/" + this.dadosEvento.idEvento,
                    {
                      idOrador: oradorAux,
                      nomeEvento: this.input.nome,
                      dataEvento: this.input.data,
                      localEvento: this.input.local,
                      tipoEvento: this.input.tipoEvento,
                      observacoes: this.input.observacoes
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
                    if (response.code === 201) {
                      this.$toasted.error("Inserção de pessoa realizada com sucesso!");
                    }
                    this.clearFields();
                    this.switchComponent('EventsTablesMenu')
                  })
                  .catch(error => {
                    this.$toasted.error("Erro na inserção de evento com nova pessoa!");

                  });
              })
              .catch(error => {
                if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
              });
            bus.$emit(
              "submitPart",
              "Nova pessoa como orador inserida!"
            );
            this.$forceUpdate();

            return;
          } else {
            //se não for uma pessoa nova
            //post orador
            axios
              .post(
                "/api/postOrador",
                {
                  idOrador: this.input.inputPessoa,
                  especialidade: this.input.especialidade
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                  }
                }
              )
              .then(response => {})
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
        } else {
          //se for um orador já existente
          if (
            !this.allOrators.some(
              item => item.idOrador == this.input.inputOrador
            )
          ) {
            this.$toasted.error("ID de Orador introduzido inexistente ou vazio!");
            return;
          } else {
            oradorAux = this.input.inputOrador;
          }
        }
      }

      //---------------------------------------------------------------------------------------------------

      //INSERÇÕES DE EVENTO
      //Evento: idOrador, nome, data, local, tipoEvento, observacoes
      switch (this.input.tipoEvento) {
        case "Palestra":
          axios
            .put(
              "api/editEvento/" + this.dadosEvento.idEvento,
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
                this.$toasted.error("Evento" + this.input.nome + "Editado com sucesso!");
                this.clearFields();
                this.switchComponent('EventsTablesMenu')
              }
            })
            .catch(error => {
              if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
              this.$toasted.error("Erro na inserção de evento!");

            });
          break;

        case "Workshop":

          if(this.input.custo == "" || this.input.custo == null){
            this.$toasted.error("Custo inválido!");
            return;
          }
          //inserir workshop e custo
          axios
            .put(
              "api/editEvento/" + this.dadosEvento.idEvento,
              {
                idOrador: oradorAux,
                nomeEvento: this.input.nome,
                dataEvento: this.input.data,
                localEvento: this.input.local,
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
                axios
                  .put(
                    "api/editWorkshop/" + this.dadosEvento.idEvento,
                    {
                      custo: this.input.custo
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
                      this.$toasted.error("Workshop Editado!");
                      this.clearFields();
                      this.switchComponent('EventsTablesMenu')
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

          break;

        default:
          //isto significa que é um evento sem orador, sem custo.
          axios
            .put(
              "api/editEvento/" + this.dadosEvento.idEvento,
              {
                idOrador: null,
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
                this.$toasted.error("Evento" + this.input.nome + " editado com sucesso!");
                this.clearFields();
                this.switchComponent('EventsTablesMenu')
              }
            })
            .catch(error => {
              if(error.response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            }
            });
          break;
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
@import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

h1 {
  text-align: center;
  font-family: "Open Sans";
}

.voltarEvento button {
  font-size: 20px;
  margin-left: 25px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eedec0;
}
.voltarEvento i {
  font-size: 17px;
  margin-right: 3px;
}
.voltarEvento button:hover {
  background-color: #fdf5e6
}

.editarEvento {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.editarEvento .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}

.editarEvento .fields .obrigatorio{
  color: red;
}

.editarEvento .nomeEvento {
  grid-column-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.editarEvento .nomeEvento input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarEvento .tipo {
  margin-right: 115px;
  margin-top: 10px;
}
.editarEvento .tipo select {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarEvento .data {
  margin-left: 115px;
}
.editarEvento .data input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEvento .localEvento {
  margin-right: 115px;
}
.editarEvento .localEvento input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarEvento .observacoes {
  margin-left: 115px;
}
.editarEvento .observacoes textarea {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  border: 1px solid #a1a0a0;
  resize: none;
  border-radius: 4px;
}

.editarEvento .custo {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}
.editarEvento .custo input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarEvento .orador {
  height: 15px;
  margin-left: 115px;
  width: 82%;
  grid-row-start: 4;
  grid-column-start: 1;
  margin-bottom: 55px;
}

.editarEvento .botaoOradorExistente {
  margin-right: 115px;
  grid-row-start: 4;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.editarEvento .botaoOradorExistente input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.editarEvento .botaoOradorExistente a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.editarEvento .novoOrador {
  grid-row-start: 5;
  margin-left: 115px;
  display: contents;
}

.editarEvento .novoOrador .listaPessoas {
  width: 82%;
  grid-column-start: 1;
  grid-row-start: 5;
  margin-left: 115px;
}

.editarEvento .novoOrador .botaoPessoaExistente {
  margin-right: 115px;
  justify-self: end;
  margin-top: 30px;
  grid-column-start: 2;
  grid-row-start: 5;
}

.editarEvento .novoOrador .botaoPessoaExistente input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.editarEvento .novoOrador .botaoPessoaExistente a {
  border: 1px solid #a1a0a0;
  height: 20px;
}

.editarEvento .novoOrador .nome {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 6;
}
.editarEvento .novoOrador .nome input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEvento .novoOrador .email {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 6;
}
.editarEvento .novoOrador .email input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}
.editarEvento .novoOrador .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 7;
}
.editarEvento .novoOrador .telefone input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEvento .novoOrador .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 7;
}

.editarEvento .novoOrador .zona {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 8;
}
.editarEvento .novoOrador .zona input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.editarEvento .novoOrador .idade {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 8;
}
.editarEvento .novoOrador .idade input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.editarEvento .novoOrador .especialidade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 9;
}
.editarEvento .novoOrador .especialidade input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}
.editarEvento .novoOrador .nif {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 9;
}
.editarEvento .novoOrador .nif input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}
.editarEvento .novoOrador .comoConheceu {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 10;
  width: 50%;
  display: -webkit-box;
  height: 35px;
}

.editarEvento .novoOrador .comoConheceu select {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 30px;
}

.editarEvento .novoOrador .comoConheceu .atravesQuem {
  margin-top: 11px;
  width: 118%;
  margin-left: 9px;
}

.editarEvento .novoOrador .comoConheceu .local {
  margin-top: 16px;
  width: 100%;
  margin-left: 9px;
}

.editarEvento .novoOrador .comoConheceu .local input {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  width: 122%;
  height: 35px;
}

.editarEvento .registar {
  margin-right: 115px;
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 11;
  align-self: end;
  justify-self: end;
}

.editarEvento .registar button {
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
.editarEvento .registar button:hover {
  background-color: #fab995;
}
</style>