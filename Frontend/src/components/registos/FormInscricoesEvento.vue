<template>
    <div>
        <br>
        <div class="voltarEvento">
            <button v-on:click="switchComponent('EventsTablesMenu')">
                <i class="fas fa-reply"></i>Voltar
            </button>
        </div>
        <div class="inscricoes">
            <div v-if="this.allInscricoes.length > 0">
                <h1>Inscrições no Evento </h1>
                <div class="buttonRegistarComparecimentoTodos">
                    <button v-on:click="registarComparecimentoTodos()()">
                        <i class="fas fa-plus-circle"></i> {{this.registarComparecimentoTodosText}}
                    </button>
                </div>
                <div class="dados">
                    <table class="w3-table-all" id="tabela">
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Primeiro Evento</th>
                            <th>Compareceu</th>
                            <th>Pagamento Necessário</th>
                            <th>Valor (€)</th>
                            <th>Nº Recibo</th>

                        </tr>
                        <tr class="conteudo" v-for="(inscricao, tableKey) in allInscricoes" :key="tableKey">
                            <td>{{ inscricao.nome}}</td>
                            <td>{{ inscricao.email }}</td>
                            <td>{{ inscricao.flagPrimeiroEvento == true ? 'Sim' : 'Não' }}</td>
                            <td>{{ inscricao.flagCompareceu == true ? 'Sim' : 'Não' }}</td>
                            <td>{{ inscricao.necessitaPagamento == true ? 'Sim' : 'Não' }}</td>
                            <td>{{ inscricao.valor == -1 ? "" : inscricao.valor }}</td>
                            <td>{{ inscricao.recibo == -1 ? "" : inscricao.recibo }}</td>
                            <td class="buttons" v-if="inscricao.necessitaPagamento">
                                <div class="editarButton">
                                    <a class="fas fa-credit-card" v-on:click="editar(inscricao)" title="Editar"></a>
                                </div>
                                <div class="registarCompareceu">
                                    <a class="fas fa-check" v-on:click="registarComparecimento(inscricao)"
                                       title="Comparência"></a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <h1 v-else>
                Sem inscrições no Evento
            </h1>
        </div>
    </div>
</template>
<script>
    var axios = require("axios");
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                bus.$emit("logout");
            }
        });
    import {bus} from "../../main.js";

    export default {
        data() {
            return {
                allInscricoes: null,
                registarPagamento: false,
                registarComparecimentoTodosText: "Alterar Comparências do Evento"
            };
        },
        props: {
            dadosEvento: {
                type: Object,
                required: true
            }
        },
        activated() {
            axios
                .get(`api/getInscricoesPagamentoEvento/${this.dadosEvento.idEvento}`, {
                    withCredentials: true,
                    headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                })
                .then(response => {
                    this.allInscricoes = response.data;
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.$toasted.error("Sessão expirou.");
                        bus.$emit("logout");
                    }
                });
        },
        methods: {
            switchComponent(comp) {
                bus.$emit("switchComp", comp);
            },
            editar(data) {
                bus.$emit("registarPagamentoInscricao", data);
            },
            registarComparecimento(inscricao) {
                axios
                    .patch(`api/patchComparecimentoInscricao/${this.dadosEvento.idEvento}/${inscricao.idParticipante}`, null, {
                        withCredentials: true,
                        headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                    })
                    .then(response => {
                        inscricao.flagCompareceu = !inscricao.flagCompareceu;
                        if (inscricao.flagCompareceu) {
                            this.$toasted.show("Comparecimento registado com sucesso!");
                        } else {
                            this.$toasted.show("Falta de comparência registada com sucesso!");
                        }

                        if (response.status == 409) {
                            this.$toasted.error("Ocorreu um erro");
                        }

                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            this.$toasted.error("Sessão expirou.");
                            bus.$emit("logout");
                        }
                    });
            },
            registarComparecimentoTodos() {
                axios
                    .patch(`api/patchComparecimentoInscricao/${this.dadosEvento.idEvento}`, null, {
                        withCredentials: true,
                        headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                    })
                    .then(response => {
                        this.allInscricoes.forEach(function (part, index, theArray) {
                            theArray[index].flagCompareceu = !theArray[index].flagCompareceu;
                        });

                        this.$toasted.show("Comparências alteradas com sucesso!");


                        if (response.status == 409) {
                            this.$toasted.error("Ocorreu um erro");
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            this.$toasted.error("Sessão expirou.");
                            bus.$emit("logout");
                        }
                    });
            }

        }
    }
</script>
<style>


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

    .inscricoes h1 {
        text-align: center;
    }

    .inscricoes {
        font-family: "Open Sans";
    }

    .inscricoes .tabela {
        width: 100%;
        margin-bottom: 20px;
    }

    .inscricoes #tabela {
        width: 80%;
        margin-top: 10px;
    }

    .inscricoes .dados .idEvento {
        width: 5%;
    }

    .inscricoes .tabela table td {
        border: 1px solid #ccc;
    }

    .inscricoes .dados table td {
        width: 25%;
    }

    .inscricoes .tabela table th {
        border: 1px solid #ccc;
    }

    .inscricoes .tabela .conteudo:hover {
        font-weight: bold;
        background-color: #e2e2e2;
    }

    .inscricoes .dados {
        display: flex;
        justify-content: center;
    }

    .inscricoes .editarButton {
        cursor: pointer;
    }

    .inscricoes .editarButton a:hover {
        font-weight: bold;
        font-size: 13px;

    }

    .inscricoes .registarCompareceu {
        cursor: pointer;
    }

    .inscricoes .registarCompareceu a:hover {
        font-weight: bold;
        font-size: 13px;

    }


    .inscricoes .dados .buttons {
        border-color: white;
        background-color: white;
        border-top: none;
        border: none;
    }

    .inscricoes .buttonRegistarComparecimentoTodos {
        margin-top: 10px;
        margin-left: 10%;
        display: flex;
    }

    .inscricoes .buttonRegistarComparecimentoTodos button {
        text-align: center;
        cursor: pointer;
        background-color: #a2e3fb;
        border: none;
        border-radius: 4px;
    }

    .inscricoes .buttonRegistarComparecimentoTodos button:hover {
        background-color: #43cbfd;;
    }


</style>