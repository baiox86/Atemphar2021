<template>
    <div class="tabelaPessoas">

        <div class="dados">
            <div id="fields" class="tabela">
                <div class="buttonAdicionarPessoa">
                    <button v-on:click="toggleRegistarPessoa()">
                        <template v-if="registarPessoa">
                            <i class="fas fa-angle-left"></i> Cancelar
                        </template>
                        <template v-else>
                            <i class="fas fa-plus-circle"></i> Registar Pessoa
                        </template>
                    </button>
                </div>
                <div class="novaPessoa">
                    <template v-if="registarPessoa">
                        <keep-alive>
                            <RegistarPessoa/>
                        </keep-alive>
                    </template>
                </div>
                <table class="w3-table-all" id="tabela">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <!--<th>Dados</th>-->
                    </tr>
                    <tr class="conteudo" v-for="(users, key) in allPersons" :key="key">
                        <td class="idPessoa">{{ users.idPessoa }}</td>
                        <td class="verButton">
                            <a v-on:click="ver(users.idPessoa)" title="Ver Ficha de Pessoa">{{ users.nome }}</a>
                        </td>
                        <td>{{ users.email}}</td>
                        <td>{{ users.telefone}}</td>
                        <td class="buttons">
                            <!--<div class="verButton">
                                <a v-on:click="ver(users.idPessoa)"> Ver </a>
                            </div>-->
                            <div class="editarButton">
                                <a class="fas fa-user-edit" v-on:click="editar(users)" title="Editar"></a>
                            </div>
                        </td>
                    </tr>
                </table>
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

    var self = this;
    import {bus} from "../../../main.js";
    //import router from "../router"
    export default {
        activated() {
            this.getPessoas();
        },
        name: "LoginScreen",
        data() {
            return {
                allPersons: null,
                registarPessoa: false
            };
        },
        computed: {},
        methods: {
            getPessoas() {
                axios
                    .get("api/getAllPessoas", {
                        withCredentials: true,
                        headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                    })
                    .then(response => {
                        this.allPersons = response.data;
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
                    });
            },
            toggleRegistarPessoa() {
                this.registarPessoa = !this.registarPessoa;
                if(!this.registarPessoa){
                    this.getPessoas();
                }
            },
            ver(idPessoa) {
                bus.$emit("viewPessoa", idPessoa);
            },
            editar(data) {
                bus.$emit("editarPessoa", data);
            }
        }
    };


</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Open+Sans");
    @import url("https://www.w3schools.com/w3css/4/w3.css");
    @import url("https://use.fontawesome.com/releases/v5.7.0/css/all.css");

    .tabelaPessoas h1 {
        text-align: center;
    }

    .tabelaPessoas {
        font-family: "Open Sans";
    }

    .tabelaPessoas .tabela .conteudo:hover {
        font-weight: bold;
        background-color: #e2e2e2

    }

    .tabelaPessoas .tabela {
        width: 1000%;
        margin-bottom: 20px;
    }

    .tabelaPessoas #tabela {
        width: 70%;
        margin: auto;
    }

    .tabelaPessoas .dados .idPessoa {
        width: 3%;
    }

    .tabelaPessoas .tabela table td {
        border: 1px solid #ccc;
    }

    .tabelaPessoas .dados table td {
        width: 25%;
    }

    .tabelaPessoas .tabela table th {
        border: 1px solid #ccc;
    }

    .tabelaPessoas .dados {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tabelaPessoas .verButton {
        cursor: pointer;
    }

    .tabelaPessoas .verButton a:hover {
        font-weight: bold;
    }

    .tabelaPessoas .editarButton {
        cursor: pointer;
    }

    .tabelaPessoas .editarButton a:hover {
        font-weight: bold;
        font-size: 13px;
    }

    .tabelaPessoas .dados .buttons {
        border-color: white;
        background-color: white;
        border-top: none;
        width: 1%;
    }

    .tabelaPessoas .buttonAdicionarPessoa {
        margin-bottom: 5px;
        margin-left: 15%;
    }

    .tabelaPessoas .buttonAdicionarPessoa button {
        text-align: center;
        cursor: pointer;
        background-color: #a7ec82;
        border: none;
        border-radius: 4px;
    }

    .tabelaPessoas .buttonAdicionarPessoa button:hover {
        background-color: #72d33d;
    }
</style>