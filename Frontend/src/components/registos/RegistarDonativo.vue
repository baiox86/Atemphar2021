<template>
  <div>
    <div class="registarDonativo">
      <div class="fields">
        <template v-if="tipoDonativo == 'p'">
          <div class="novaPessoa">
            <a class="fas fa-user-plus">
              <input type="button" v-model="buttonText" v-on:click="toggleInsert()" />
            </a>
          </div>

          <template v-if="!input.novaPessoa">
            <!-- já frequentou, user existente -->
            <div class="listaPessoas">
              <label>
                Pessoa:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <!--
          <input name="inputPessoa" v-model="input.inputPessoa" list="listaPessoa">
          <datalist id="listaPessoa">
            <option v-for="(pessoa, key) in allPessoa" :key="key">{{pessoa.idPessoa}}: {{pessoa.nome}}</option> 
          </datalist>
              -->
              <model-list-select
                :list="allPersons"
                v-model="input.idPessoa"
                option-value="idPessoa"
                option-text="nome"
                placeholder="Escolher"
              ></model-list-select>
            </div>
          </template>
          <template v-else>
            <!-- user novo -->
            <div class="nome">
              <label>
                Nome:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="text" v-model="inputPessoa.nome" name="nome" />
            </div>
            <div class="email">
              <label>
                Email:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="text" v-model="inputPessoa.email" name="email" />
            </div>
            <div class="telefone">
              <label>
                Telefone:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="text" v-model="inputPessoa.telefone" name="telefone" />
            </div>
            <div class="genero">
              <label>
                Género:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="radio" v-model="inputPessoa.genero" name="m" value="M" /> M
              <br />
              <input type="radio" v-model="inputPessoa.genero" name="f" value="F" /> F
              <br />
            </div>
            <div class="zona">
              <label>
                Zona:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="text" v-model="inputPessoa.zona" name="zona" />
            </div>
            <div class="idade">
              <label>
                Data de Nascimento:
                <i class="obrigatorio">*</i>
              </label>
              <br />
              <input type="date" v-model="inputPessoa.dataNasc" name="idade" />
            </div>
            <div class="nif">
              <label>NIF:</label>
              <br />
              <input type="text" v-model="inputPessoa.nif" name="nif" />
            </div>
            <div class="comoConheceu">
              <label>Como Conheceu:</label>
              <br />
              <select v-model="inputPessoa.comoConheceu">
                <option>Pessoa</option>
                <option value="Local">Folheto em Local</option>
                <option>Redes Sociais</option>
                <option>E-Mail</option>
              </select>
              <template
                v-if="inputPessoa.comoConheceu === 'Pessoa' || inputPessoa.comoConheceu === 'Redes Sociais' || inputPessoa.comoConheceu === 'E-Mail'"
              >
                <div class="atravesQuem">
                  <model-list-select
                    :list="allPersons"
                    v-model="inputPessoa.atravesDe"
                    option-value="idPessoa"
                    option-text="nome"
                    placeholder="Escolher"
                  ></model-list-select>
                </div>
              </template>
              <template v-else-if="inputPessoa.comoConheceu === 'Local'">
                <!-- conheceu através de um folheto num local -->
                <!--<label>Local:</label>
                <br>-->
                <div class="local">
                  <input
                    type="text"
                    v-model="inputPessoa.atravesDe"
                    name="local"
                    placeholder="Local"
                  />
                </div>
              </template>
            </div>
          </template>
        </template>
        <template v-else-if="tipoDonativo == 'e'">
          <div class="empresario">
            <label>
              Empresario:
              <i class="obrigatorio">*</i>
            </label>
            <br />
            <model-list-select
              :list="allEmpresarios"
              v-model="input.idEmpresario"
              option-value="idPessoa"
              option-text="nome"
              placeholder="Escolher"
            ></model-list-select>
          </div>
          <div class="empresa">
            <label>Empresa: {{this.empresaEmpresario}}</label>
          </div>
        </template>
        <div class="quantidade">
          <label>
            Quantidade:
            <i class="obrigatorio">*</i>
          </label>
          <br />
          <input
            type="number"
            v-model="input.quantidadeDonativo"
            name="quantidade"
            min="0.01"
            step="0.01"
          />
        </div>
        <div class="data">
          <label>
            Data:
            <i class="obrigatorio">*</i>
          </label>
          <br />
          <input type="date" v-model="input.dataDonativo" name="data" />
        </div>
        <template v-if="(isNovoAmigoSocio || input.novaPessoa ) && tipoDonativo != 'e'">
          <div class="morada">
            <label>
              Morada:
              <i class="obrigatorio">*</i>
            </label>
            <br />
            <textarea type="text" v-model="input.morada" name="observacoes"></textarea>
          </div>
          <div class="codPostal">
            <label>
              Código Postal:
              <i class="obrigatorio">*</i>
            </label>
            <br />
            <input type="text" v-model="input.codigoPostal" name="observacoes" />
          </div>
        </template>
        <div class="observacoes">
          <label>Observações:</label>
          <br />
          <textarea type="text" v-model="input.observacoes" name="observacoes"></textarea>
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
  }
);

import { bus } from "../../main.js";
import { ModelListSelect } from "vue-search-select";
export default {
  props: {
    tipoDonativo: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (this.tipoDonativo === "p") {
      axios
        .get("api/getAllPessoas", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ` + sessionStorage.getItem("token")
          }
        })
        .then(response => {
          this.allPersons = response.data;
        })
        .catch(error => {

        });
    } else {
      axios
        .get("api/getAllEmpresarios", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ` + sessionStorage.getItem("token")
          }
        })
        .then(response => {
          this.allEmpresarios = response.data;
        })
        .catch(error => {

        });
    }
  },
  data() {
    var here = this;
    return {
      input: {
        novaPessoa: false,
        idEmpresario: "",
        idPessoa: "",
        dataDonativo: "",
        morada: "",
        codigoPostal: "",
        quantidadeDonativo: 0.01,
        observacoes: ""
      },
      inputPessoa: {
        nome: "",
        email: "",
        genero: "",
        dataNasc: "",
        telefone: "",
        zona: "",
        nif: "",
        comoConheceu: "Pessoa",
        atravesDe: ""
      },
      isNovoAmigoSocio: true,
      allPersons: [],
      allEmpresarios: [],
      empresaEmpresario: "",
      buttonText: "Adicionar Pessoa"
    };
  },
  watch: {
    "input.idPessoa": function() {
      axios
        .get("api/getAmigoSocio/" + this.input.idPessoa, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ` + sessionStorage.getItem("token")
          }
        })
        .then(response => {
          this.checkIfAmigoSocio(response.data.length === 0);
        })
        .catch(error => {

        });
    },
    "input.idEmpresario": function() {
      axios
        .get("api/getDadosEmpresario/" + this.input.idEmpresario, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ` + sessionStorage.getItem("token")
          }
        })
        .then(response => {
          this.empresaEmpresario = response.data[0].nomeEmpresa;
        })
        .catch(error => {

        });
    }
  },
  methods: {
    checkIfAmigoSocio: function(status) {
      if (status) {
        this.isNovoAmigoSocio = true;
      } else {
        this.isNovoAmigoSocio = false;
      }
    },
    clearFields: function() {
      switch (this.tipoDonativo) {
        case "p":
          bus.$emit("refreshAmigoSocio");
          break;
        case "e":
          bus.$emit("refreshEmpresa");
          break;
      }
    },
    toggleInsert: function() {
      if (!this.input.novaPessoa) {
        this.buttonText = "Cancelar";
      } else {
        this.buttonText = "Adicionar Pessoa";
      }
      this.input.novaPessoa = !this.input.novaPessoa;
    },
    submit: function() {
      if (this.input.dataDonativo == "" || this.input.dataDonativo == null) {
        this.$toasted.error("campos em falta!");
        return;
      }
      switch (this.tipoDonativo) {
        case "p":
          //se a pessoa já for amigo sócio, não é necessário inserir na tabela. Se não for, tem de se inserir.
          //se for uma pessoa nova, está garantido não ser amigo sócio

          var idPessoaAux = this.input.idPessoa;

          if (this.input.quantidadeDonativo === 0) {
            this.$toasted.error("Não se pode efetuar um donativo de quantidade 0!");
            return;
          }
          if (
            this.input.dataDonativo == "" ||
            this.input.dataDonativo == null
          ) {
            this.$toasted.error("Campos obrigatórios em falta!");
            return;
          }

          if (this.input.novaPessoa) {
            if (
              this.inputPessoa.nome == "" ||
              this.inputPessoa.nome == null ||
              this.inputPessoa.email == "" ||
              this.inputPessoa.email == null ||
              this.inputPessoa.genero == "" ||
              this.inputPessoa.genero == null ||
              this.inputPessoa.telefone == "" ||
              this.inputPessoa.telefone == null ||
              this.inputPessoa.zona == "" ||
              this.inputPessoa.zona == null ||
              this.inputPessoa.dataNasc == "" ||
              this.inputPessoa.dataNasc == null ||
              this.input.codigoPostal == "" ||
              this.input.codigoPostal == null ||
              this.input.morada == "" ||
              this.input.morada == null
            ) {
              this.$toasted.error("campos em falta!");
              return;
            }

            if (this.inputPessoa.telefone.length != 9) {
              this.$toasted.error("Número de telefone de tamanho inválido!");
              return;
            }

            if (!/^\d+$/.test(this.inputPessoa.telefone)) {
              this.$toasted.error("caracteres inválidos no número de telefone!");
              return;
            }


            if(this.inputPessoa.nif != "" && this.inputPessoa.nif.length != 9){
          this.$toasted.error("NIF de tamanho inválido!");
          return;
        }

            if (!/\S+@\S+\.\S+/.test(this.inputPessoa.email)) {
              this.$toasted.error("Formato de email inválido!");
              return;
            }


            if (
              this.inputPessoa.comoConheceu.valueOf() != "Local".valueOf() &&
              (this.inputPessoa.atravesDe == null ||
                this.inputPessoa.atravesDe == "")
            ) {
              this.$toasted.error("Obrigatório selecionar pessoa por onde conheceu!");
              return;
            }

            axios
              .post(
                "api/postPessoa",
                {
                  nome: this.inputPessoa.nome,
                  email: this.inputPessoa.email,
                  telefone: this.inputPessoa.telefone,
                  zona: this.inputPessoa.zona,
                  dataNasc: this.inputPessoa.dataNasc,
                  genero: this.inputPessoa.genero,
                  nif: this.inputPessoa.nif,
                  comoConheceu:
                    this.input.comoConheceu === "Local"
                      ? this.inputPessoa.atravesDe
                      : this.inputPessoa.comoConheceu,
                  atravesDe:
                    this.inputPessoa.comoConheceu === "Local"
                      ? null
                      : this.inputPessoa.atravesDe
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
                //inserimos a pessoa, agora inserimos o amigo sócio e o donativo.

                idPessoaAux = response.data;
                axios
                  .post(
                    "api/postAmigoSocio",
                    {
                      idAmigoSocio: idPessoaAux,
                      morada: this.input.morada,
                      codigoPostal: this.input.codigoPostal,
                      dataExpiracao: this.input.dataDonativo.replace(
                        new Date().getFullYear(),
                        new Date().getFullYear() + 1
                      )
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
                      this.$toasted.error("Novo Amigo Sócio inserido!");
                      //aqui inserimos o donativo
                      axios
                        .post(
                          "/api/postDonativoPessoa/",
                          {
                            idPessoa: idPessoaAux,
                            dataDonativo: this.input.dataDonativo,
                            morada: this.input.morada,
                            codigoPostal: this.input.codigoPostal,
                            quantidadeDonativo: this.input.quantidadeDonativo,
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
                          if (response.status === 201) {
                            this.$toasted.error("Novo Donativo inserido!");
                            clearFields();
                            return;
                          }
                          if (response.status === 401) {
                            this.$toasted.error("Sessão expirou.");
                          }
                        })
                        .catch(error => {
                          if (error.response.status === 401) {
                            this.$toasted.error("Sessão expirou.");
                            bus.$emit("logout");
                          }
                          this.$toasted.error("Erro a inserir Amigo Sócio!");
                        });
                    }
                    if (response.status === 401) {
                      this.$toasted.error("Sessão expirou.");
                    }
                  })
                  .catch(error => {
                    if (error.response.status === 401) {
                      this.$toasted.error("Sessão expirou.");
                      bus.$emit("logout");
                    }
                    this.$toasted.error("Erro a inserir Amigo Sócio!");
                  });
              })
              .catch();
            return;
          }

          //não é uma pessoa nova, verificamos se não é ainda um amigo sócio
          if (this.isNovoAmigoSocio) {
            if(
              this.input.codigoPostal == "" ||
              this.input.codigoPostal == null ||
              this.input.morada == "" ||
              this.input.morada == null
            ){
              this.$toasted.error("Campos em falta!");
              return;
            }

            
            if (!/^\d{4}(-\d{3})?$/.test(this.input.codigoPostal)) {
              this.$toasted.error("Formato de código postal inválido!");
              return;
            }
            axios
              .post(
                "api/postAmigoSocio",
                {
                  idAmigoSocio: idPessoaAux,
                  morada: this.input.morada,
                  codigoPostal: this.input.codigoPostal,
                  dataExpiracao: this.input.dataDonativo.replace(
                    new Date().getFullYear(),
                    new Date().getFullYear() + 1
                  )
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
                  this.$toasted.error("Novo Amigo Sócio inserido!");
                  //inserir o donativo
                  axios
                    .post(
                      "/api/postDonativoPessoa/",
                      {
                        idPessoa: idPessoaAux,
                        dataDonativo: this.input.dataDonativo,
                        morada: this.input.morada,
                        codigoPostal: this.input.codigoPostal,
                        quantidadeDonativo: this.input.quantidadeDonativo,
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
                      if (response.status === 201) {
                        this.$toasted.error("Novo Donativo inserido!");
                        clearFields();
                      }
                    })
                    .catch(error => {
                      if (error.response.status === 401) {
                        this.$toasted.error("Sessão expirou.");
                        bus.$emit("logout");
                      }
                      this.$toasted.error("Erro a inserir Amigo Sócio!");
                    });
                }
                if (response.status === 401) {
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
              })
              .catch(error => {
                if (error.response.status === 401) {
                  this.$toasted.error("Sessão expirou.");
                  bus.$emit("logout");
                }
                this.$toasted.error("Erro a inserir Amigo Sócio!");
              });
          } else {
            //já é amigo sócio,
            //basta inserir o donativo e atualizar o sócio
            axios
              .post(
                "/api/postDonativoPessoa/",
                {
                  idPessoa: idPessoaAux,
                  dataDonativo: this.input.dataDonativo,
                  morada: this.input.morada,
                  codigoPostal: this.input.codigoPostal,
                  quantidadeDonativo: this.input.quantidadeDonativo,
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
                  //this.input.dataDonativo.setYear(this.input.dataDonativo.getYear() + 1)
                  //update Amigo Sócio
                  axios
                    .put(
                      "/api/editAmigoSocio/" + idPessoaAux,
                      {
                        dataExpiracao: this.input.dataDonativo.replace(
                          new Date().getFullYear(),
                          new Date().getFullYear() + 1
                        )
                      },
                      {
                        withCredentials: true,
                        headers: {
                          Authorization:
                            `Bearer ` + sessionStorage.getItem("token")
                        }
                      }
                    )
                    .then(() => {
                      this.$toasted.error("Novo donativo inserido!");
                      this.clearFields();
                    })
                    .catch(error => {

                    });
                }
              })
              .catch(error => {
                this.$toasted.error("Erro a inserir donativo!");

              });
          }
  
        break;

        case "e":
          if(this.input.idEmpresario == "" || this.input.idEmpresario == null){
             this.$toasted.error("Campos em falta!");
             return;
          }
          axios
            .post(
              "/api/postDonativoEmpresa/",
              {
                idEmpresario: this.input.idEmpresario,
                dataDonativo: this.input.dataDonativo,
                quantidadeDonativo: this.input.quantidadeDonativo,
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
              }
              this.$toasted.error("Novo donativo inserido!");
              this.clearFields();
              if (response.status === 401) {
                this.$toasted.error("Sessão expirou.");
                bus.$emit("logout");
              }
            })
            .catch(error => {
              if (error.response.status === 401) {
                this.$toasted.error("Sessão expirou.");
                bus.$emit("logout");
              }
              this.$toasted.error("Erro a inserir donativo!");

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

.registarDonativo {
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
}

.registarDonativo .fields {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  background-color: oldlace;
  width: 100%;
}

.registarDonativo .fields .obrigatorio {
  color: red;
}
.registarDonativo .empresario {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.registarDonativo .empresa {
  margin-right: 115px;
  grid-row-start: 1;
  grid-column-start: 2;
  margin-top: 30px;
  justify-self: start;
}
.registarDonativo .listaPessoas {
  grid-column-start: 1;
  grid-row-start: 1;
  margin-top: 10px;
  margin-left: 115px;
}

.registarDonativo .novaPessoa {
  margin-right: 115px;
  grid-row-start: 1;
  grid-column-start: 2;
  justify-self: end;
  margin-top: 30px;
}

.registarDonativo .novaPessoa input {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.registarDonativo .novaPessoa a {
  border: 1px solid #a1a0a0;
  height: 20px;
}
.registarDonativo .nome {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 2;
}

.registarDonativo .nome input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .email {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 2;
}

.registarDonativo .email input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .telefone {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 3;
}

.registarDonativo .telefone input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .genero {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 3;
}

.registarDonativo .idade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 4;
}

.registarDonativo .idade input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .zona {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 4;
}

.registarDonativo .zona input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .nif {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 5;
}

.registarDonativo .nif input {
  width: 100%;
  height: 35px;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  border-radius: 4px;
}

.registarDonativo .comoConheceu {
  /*margin-right: 115px;*/
  grid-column-start: 2;
  grid-row-start: 5;
  width: 50%;
  display: -webkit-box;
  height: 35px;
}

.registarDonativo .comoConheceu select {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  height: 30px;
}

.registarDonativo .comoConheceu .atravesQuem {
  margin-top: 11px;
  width: 113%;
  margin-left: 9px;
}

.registarDonativo .comoConheceu .local {
  margin-top: 16px;
  width: 100%;
  margin-left: 9px;
}

.registarDonativo .comoConheceu .local input {
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  width: 115%;
  height: 35px;
}

.registarDonativo .quantidade {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 6;
}
.registarDonativo .quantidade input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.registarDonativo .data {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 6;
}
.registarDonativo .data input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.registarDonativo .morada {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 7;
}
.registarDonativo .morada textarea {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 70px;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}

.registarDonativo .codPostal {
  margin-right: 115px;
  grid-column-start: 2;
  grid-row-start: 7;
}
.registarDonativo .codPostal input {
  width: 100%;
  border: 1px solid #a1a0a0;
  padding-left: 3px;
  height: 35px;
  border-radius: 4px;
}

.registarDonativo .observacoes {
  margin-left: 115px;
  grid-column-start: 1;
  grid-row-start: 8;
}
.registarDonativo .observacoes textarea {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  border: 1px solid #a1a0a0;
  resize: none;
  border-radius: 4px;
}

.registarDonativo .registar {
  margin-right: 115px;
  margin-bottom: 30px;
  grid-column-start: 2;
  grid-row-start: 9;
  align-self: end;
  justify-self: end;
}

.registarDonativo .registar button {
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
.registarDonativo .registar button:hover {
  background-color: #fab995;
}
</style>