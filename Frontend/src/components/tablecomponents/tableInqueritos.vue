<template>
    <div>
        <br>
        <div class="voltarEvento">
            <button v-on:click="mudarComponente('EventsTablesMenu')">
                <i class="fas fa-reply"></i>Voltar
            </button>
        </div>
        <div class="inqueritos">
            <h1>Associar Inquérito a Evento</h1>
            <div class="tabela">
                <table class="w3-table-all" id="tabela">
                    <tr class="conteudo">
                        <th>ID</th>
                        <th>Questoes</th>
                    </tr>
                    <tr v-for="(inquerito, tableKey) in inqueritos" :key="tableKey">
                        <td>{{inquerito.idInquerito}}</td>
                        <td style="white-space: pre-line;">{{concatenaQuestoes(inquerito.questoes).length > 0 ? concatenaQuestoes(inquerito.questoes) : "Sem Questões"}}</td>
                        <td class="buttons">
                            <div class="associarInqueritoButton">
                                <a class="fa fa-plug" v-on:click="submit(inquerito.idInquerito)"
                                   title="Associar Inquérito ao Evento"></a>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <a class="nota"><b>Nota</b>: Associar um Inquérito a um Evento que já tenha um associado, irá sobrepôr esta associação!</a>
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
    var instance = axios.create({
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        }
    });
    import {bus} from "../../main.js";

    export default {
        props: {
            idEvento: {
                required: true
            }
        },
        data() {
            return {
                inqueritos: ''

            }
        }, methods: {
            mudarComponente(comp) {
                bus.$emit("switchComp", comp);
            }, concatenaQuestoes(questoes) {
                var aux = '';
                questoes.forEach(element => {
                    aux += element.questao + "\n";
                });
                return aux;
            }, submit(idInquerito) {
                instance.post('api/postAssociarInquerito',{
                    'idInquerito':idInquerito,
                    'idEvento':this.idEvento
                    },
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ` + sessionStorage.getItem("token")
                        }
                    }).then(() => {
                    this.$toasted.show("Inquerito associado!")
                })
                    .catch(error => {
                        if(error.response.status == 400){
                            this.$toasted.error("Ocorreu um erro!");
                        }
                    })
            }

        }, beforeCreate() {

            instance.get('api/getAllInqueritos',
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ` + sessionStorage.getItem("token")
                    }
                })
                .then(response => {
                    this.inqueritos = response.data;
                }).catch(error => {
                    if(error.response.status == 400){
                        this.$toasted.error("Ocorreu um erro!");
                    }
            })

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

    .inqueritos h1 {
        text-align: center;
    }

    .inqueritos {
        font-family: "Open Sans";
    }

    .inqueritos .tabela {
        width: 100%;
        margin-bottom: 20px;
    }

    .inqueritos #tabela {
        width: 80%;
        margin: auto;
    }


    .inqueritos .tabela table td {
        border: 1px solid #ccc;
    }

    .inqueritos .dados table td {
        width: 15%;
    }

    .inqueritos .tabela table th {
        border: 1px solid #ccc;
    }

    .inqueritos .tabela .conteudo:hover {
        font-weight: bold;
        background-color: #e2e2e2;
    }


    .inqueritos .tabela .buttons {
        width:1px;
        border-color: white;
        background-color: white;
        border-top: none;
    }


    .inqueritos .associarInqueritoButton {
        cursor: pointer;
    }

    .inqueritos .associarInqueritoButton a:hover {
        font-weight: bold;
        font-size: 13px;

    }
    .inqueritos .nota{
        margin-left:10%;

    }


</style>