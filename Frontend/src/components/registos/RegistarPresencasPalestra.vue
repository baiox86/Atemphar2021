<template>
    <div>
        <div class="registarPresencasPalestra">
            <div class="form">
                <div class="palestra">
                    <label>Palestra:* <i class="obrigatorio"></i></label>
                    <div class="autocomplete">
                        <vue-single-select
                                v-bind:disabled= "desativarEvento"
                                v-model="input.palestra"
                                :options="allPalestra"
                                v-bind:placeholder= "eventoText"
                                option-label="nome"
                        ></vue-single-select>
                    </div>
                </div>
                <div class="participante">
                    <label>Participante:* <i class="obrigatorio"></i></label>
                    <div class="autocomplete">
                        <vue-single-select
                                v-model="input.pessoa"
                                :options="allPessoa"
                                placeholder="Procurar por nome, email ou telemóvel"
                                option-label="nome"

                        ></vue-single-select>
                    </div>
                </div>
                <div class="primeiroEvento">
                    <label>Primeiro Evento:* <i class="obrigatorio"></i></label>
                    <input type="checkbox"  name="primeiroEvento" v-model= "input.primeiroEvento">
                </div>
                <div class="buttonsRegisto">
                    <div class="buttonRegistarPresenca">
                        <button  v-on:click="registarPresenca()">
                            <i class="fas fa-plus-circle"></i> {{this.registarPresencaText}}
                        </button>
                    </div>
                    <div class="buttonRegistarPessoa">
                        <button  v-on:click="toggleRegistarPessoa()">
                            <i class="fas fa-plus-circle"></i> {{this.registarPessoaText}}
                        </button>
                    </div>
                </div>
                <template v-if= "registarPessoa">
                    <keep-alive>
                        <RegistarPessoa/>
                    </keep-alive>
                </template>
                <h3>Participantes do Evento</h3>
                <table class="w3-table-all" id="tabela">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telemóvel</th>
                        <th>Primeiro Evento</th>
                    </tr>
                    <tr class="conteudo" v-for="pessoa in registoPessoas" :key="pessoa.idPessoa">
                        <td class="idPessoa">{{ pessoa.idPessoa }}</td>
                        <td>{{ pessoa.nome }}</td>
                        <td>{{ pessoa.email }}</td>
                        <td>{{ pessoa.telefone }}</td>
                        <td> {{ pessoa.primeiroEvento === true ? "Sim" : "Não"}}</td>
                        <td class="buttonsRemover">
                            <a class="fas fa-trash" v-on:click="remover(pessoa)" title="Remover "></a>
                        </td>
                    </tr>
                </table>
                <div class="registar">
                    <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Registar Participações</button>
                </div>
            </div>
        </div>
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
    import { bus } from "../../main.js";
    import { ModelListSelect } from "vue-search-select";
    export default {
        name : 'RegistarPresencasPalestra',
        data() {
            var here = this;
            return {
                input: {
                    palestra: null,
                    pessoa: null,
                    primeiroEvento : false
                },
                i: 0,
                desativarEvento : false,
                pessoa : null,
                allPessoa: [],
                allPalestra: [],
                registoPessoas: [],
                eventoText: "Procurar por nome, data ou local",
                buttonText: "Adicionar Pessoa",
                registarPresencaText: "Registar Presença",
                registarPessoaText :"Registar Pessoa",
                registarPessoa:false
            };
        },
        watch:{
            registarPessoa : function (){
                axios
                    .get("api/getAllPessoasIdNome", {
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
            }
        },
        activated() {
            axios
                .get("api/getAllEventosOfTipoIdNome/Palestra", {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
                })
                .then(response => {
                    if (response.status === 401) {
                        this.$toasted.error("Sessão expirou.");
                        bus.$emit("logout");
                    }
                    this.allPalestra = response.data;

                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$toasted.error("Sessão expirou.");
                        bus.$emit("logout");
                    }
                });

            axios
                .get("api/getAllPessoasIdNome", {
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


        },
        methods: {
            toggleRegistarPessoa(){
                this.registarPessoa = !this.registarPessoa;
                if(this.registarPessoa){
                    this.registarPessoaText = "Voltar";
                }else{
                    this.registarPessoaText = "Registar Pessoa";
                }
            },
            search(input) {
                if (input.length < 1) { return [] }
                return allPessoa.filter(nome => {
                    return nome.toLowerCase()
                        .startsWith(input.toLowerCase())
                })
            },
            clearFields(){
                this.input.pessoa = null;
                this.input.palestra = null;
                this.input.primeiroEvento = false;
                this.registoPessoas = [];
                this.desativarEvento = false;
                this.eventoText="Procurar por nome, data ou local";
            },
            remover(pessoa){
                this.registoPessoas.pop(pessoa);
                this.$toasted.show('Participante removido!');
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
                if(this.registoPessoas.length <= 0){
                    this.$toasted.error('Adicione no mínimo um participante!');
                    return;
                }
                /*PERCORRER ARRAY E REGISTAR PRESENÇA*/
                for (var i = 0; i < this.registoPessoas.length; i++) {
                    instance
                        .post(
                            "/api/postParticipacaoEvento",
                            {
                                idParticipante: this.registoPessoas[i]["idPessoa"],
                                idEvento: this.input.palestra["id"],
                                flagPrimeiroEvento: this.registoPessoas[i]["primeiroEvento"],
                                flagCompareceu: 1
                            },
                            {
                                withCredentials: true,
                                headers: {
                                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                                }
                            }
                        )
                        .then(response => {
                            this.$toasted.show('Presenças registadas com sucesso!');
                        })
                        .catch((errors) => {
                            if (errors.response.status === 400) {
                                this.$toasted.error('Campos incorrectos ou incompletos!');
                            }
                            if (errors.response.status === 401) {
                                this.$toasted.error('Sessão expirou!')
                                bus.$emit("logout");
                            }

                        });
                }

                this.clearFields();

            },

            registarPresenca: function() {
                if(this.input.palestra === null){
                    this.$toasted.error('Por favor adicione um evento!');
                    return;
                }

                if(this.input.pessoa === null){
                    this.$toasted.error('Por favor adicione um participante!');
                    return;
                }

                this.desativarEvento = true;
                this.eventoText = this.input.palestra["nome"];

                axios
                    .get(`api/getDadosPessoa/${this.input.pessoa.id}`, {
                        withCredentials: true,
                        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
                    })
                    .then(response => {
                        if (response.status === 401) {
                            this.$toasted.error("Sessão expirou.");
                            bus.$emit("logout");
                        }
                        this.pessoa = response.data;
                        this.pessoa["primeiroEvento"] = this.input.primeiroEvento;

                        if((this.registoPessoas.find(p => p.idPessoa === this.pessoa.idPessoa)) != null){
                            this.$toasted.error('Participante já adicionado!');
                            return;
                        }

                        this.registoPessoas.push(response.data);

                    })
                    .catch(error => {
                        if(error.response.status === 401){
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

    h2 {
        text-align: center;
        font-family: "Open Sans";
    }
    .registarPresencasPalestra {
        font-family: "Open Sans";
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .registarPresencasPalestra .conteudo .buttonsRemover {
        cursor: pointer;
        background-color:oldlace;
        width: 2%;
        border-top:none;
        border-color: oldlace;
    }

    .registarPresencasPalestra .conteudo .buttonsRemover a:hover {
        font-weight: bold;
        font-size: 13px;
    }


    .registarPresencasPalestra .form {
        display: inline-grid;
        grid-row-gap: 10px;
        grid-column-gap: 50px;
        background-color: oldlace;
        width: 100%;
    }
    .registarPresencasPalestra .form .obrigatorio{
        color: red;
    }

    .registarPresencasPalestra .palestra {
        grid-column-start: 1;
        grid-row-start: 1;
        margin-top: 10px;
        margin-left: 400px;
        margin-bottom: 10px;
        margin-right: 270px;
    }

    .registarPresencasPalestra .palestra .autocomplete{
        display:inline-block;
        width: 59%;
        margin-left:38px;
    }

    .registarPresencasPalestra .participante {
        grid-column-start: 1;
        grid-row-start: 1;
        margin-top: 80px;
        margin-left: 400px;
        margin-bottom: 10px;
        margin-right: 270px;
    }

    .registarPresencasPalestra .participante .autocomplete {
        display:inline-block;
        width: 59%;
        margin-left:11px;
    }

    .registarPresencasPalestra .primeiroEvento {
        margin-left: 400px;
        margin-top: 5px;
        margin-bottom: 10px;
    }


    .registarPresencasPalestra .buttonsRegisto{
        margin-bottom: 5px;
        margin-left: 400px  ;
        display: -webkit-box;
    }


    .registarPresencasPalestra .buttonsRegisto button {
        text-align: center;
        cursor: pointer;
        background-color: #a2e3fb;
        border: none;
        border-radius: 4px;
    }

    .registarPresencasPalestra .buttonsRegisto button:hover {
        background-color: #43cbfd;;
    }


    .registarPresencasPalestra .registar {
        margin-left: 1050px;
        margin-bottom: 30px;

        margin-top:100px;
    }

    .registarPresencasPalestra .registar button {
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
    .registarPresencasPalestra .registar button:hover {
        background-color: #fab995;
    }

</style>