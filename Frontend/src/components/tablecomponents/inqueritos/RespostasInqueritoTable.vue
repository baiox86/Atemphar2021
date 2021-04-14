<template>
    <div>
        <br>
        <div class="voltarInqueritos">
            <button v-on:click="switchComponent('InqueritosTablesMenu')">
                <i class="fas fa-reply"></i>Voltar
            </button>
        </div>
        <div class="respostas">
            <div class="selectQuestao">
                <i class="fa fa-angle-down"/><label for="questao">Selecione a questão: </label>
                <select @change="onChangeQuestao()"  id="questao" v-model="input.questao">
                    <option selected value="todos">Completo</option>
                    <option v-for="(questao,tableKey) in allQuestoes" :key="tableKey" :value="questao" >{{"ID: " + questao.idQuestao + " Questão: " + questao.questao}}</option>
                </select>
             </div>
            <div v-if="allRespostas.length > 0">
                <div class="dados">
                    <table  class="w3-table-all" id="tabela">
                        <tr>
                            <th>ID</th>
                            <th>ID Questão</th>
                            <th>Questão</th>
                            <th>Resposta</th>
                        </tr>
                        <tr class="conteudo" v-for="(resposta, tableKey) in allRespostas" :key="tableKey">
                            <td>{{tableKey + 1}}</td>
                            <td>{{ resposta.idQuestao}}</td>
                            <td>{{ resposta.questao }}</td>
                            <td>{{ resposta.resposta}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <h1 v-else>
                Sem Respostas!
            </h1>
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
    import { bus } from "../../../main.js";
    export default {
        data() {
            return {
                input:{
                    questao: null
                },
                allRespostas: [],
                allQuestoes : [],
            };
        },
        props: {
            dadosInquerito: {
                type: Object,
                required: true
            }
        },
        activated(){
            axios
                .get(`api/getInquerito/${this.dadosInquerito.id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
                })
                .then(response => {
                    this.allQuestoes = response.data.questoes;
                })
                .catch(error => {
                    if(error.response.status === 401){
                        this.$toasted.error("Sessão expirou.");
                        bus.$emit("logout");
                    }
                });
            this.input.questao = "todos";
            this.onChangeQuestao();
        },
        methods: {
            switchComponent(comp) {
                bus.$emit("switchComp", comp);
            },
            onChangeQuestao(){
                if(this.input.questao =="todos"){
                    axios
                        .get(`api/getRespostasInquerito/${this.dadosInquerito.id}/${this.dadosInquerito.idEvento}`, {
                            withCredentials: true,
                            headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                        })
                        .then(response => {
                            this.allRespostas = response.data;
                        })
                        .catch(error => {
                            if (error.response.status === 401) {
                                this.$toasted.error("Sessão expirou.");
                                bus.$emit("logout");
                            }
                        });
                }
                else {
                    axios
                        .get(`api/getRespostasInqueritoQuestao/${this.dadosInquerito.id}/${this.dadosInquerito.idEvento}/${this.input.questao.idQuestao}`, {
                            withCredentials: true,
                            headers: {Authorization: `Bearer ` + sessionStorage.getItem("token")}
                        })
                        .then(response => {
                            this.allRespostas = response.data;
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

    }
</script>
<style>
    .voltarInqueritos button {
        font-size: 20px;
        margin-left: 25px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color: #eedec0;
    }
    .voltarInqueritos i {
        font-size: 17px;
        margin-right: 3px;
    }
    .voltarInqueritos button:hover {
        background-color: #fdf5e6
    }

    .respostas h1 {
        text-align: center;
    }

    .respostas {
        font-family: "Open Sans";
    }
    .respostas .tabela {
        width: 100%;
        margin-bottom: 20px;
    }

    .respostas #tabela{
        width: 80%;
        margin-top: 10px;
    }
    .respostas .tabela table td {
        border: 1px solid #ccc;
    }

    .respostas .dados table td {
        width: 25%;
    }

    .respostas .tabela table th {
        border: 1px solid #ccc;
    }
    .respostas .dados {
        display: flex;
        justify-content: center;
    }
    .respostas .selectQuestao{
        margin-left:10%;
        background: rgba(246, 136, 72, 0.91);
        width:45%;
        border-radius: 4px;
        padding: 10px;
        height:50px;

    }
    .respostas .selectQuestao label{
        width:25%;
        height: 100%;
    }
    .respostas .selectQuestao select{
        width:75%;
        height: 100%;
    }





</style>