<template>
    <div>
        <div class="registarInquerito">
            <div class="fields">
                <div class="titulo">
                    <h3>Questões</h3>
                </div>

                <div class="campos">
                    <div class="questao">
                        <div class="valorQuestao">
                            <label for="questao">Questão: <i class="obrigatorio"></i></label>
                            <input id="questao" type="text" v-model.lazy="questao.questao" required>
                        </div>
                        <div class="tipoQuestao">
                            <label>Tipo de Questao:<i class="obrigatorio"></i></label>
                            <select v-model="questao.tipoVar">
                                <option value="string">Texto</option>
                                <option value="long">Número</option>
                                <option value="intervalo">Várias Opções</option>
                            </select>
                            <div class="intervalo" v-if="questao.tipoVar=='intervalo'">
                                <h5><b>Adicionar Valor</b></h5>
                                <div v-for="(valor,counter) in questao.intervalo"
                                     v-bind:key="counter">
                                    <label for="valor">{{counter + 1}}º Opção: <i class="obrigatorio"></i></label>
                                    <input id="valor" type="text" v-model.lazy="questao.intervalo[counter]" required>
                                </div>
                                <div class="buttonsIntervalos">
                                    <div class="buttonAdicionarValor">
                                        <button class="fa fa-plus" @click="adicionarValor()"></button>
                                    </div>
                                    <div class="buttonEliminarValor">
                                        <button class="fa fa-trash"
                                                @click="deleteValor(questao.intervalo,counter)"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="buttonAdicionarQuestao">
                            <button @click="adicionarQuestao(questao)"><i class="fa fa-plus"/>Adicionar Questão</button>
                        </div>
                    </div>
                </div>
                <h3>Questões Adicionadas</h3>
                <table class="w3-table-all" id="tabela">
                    <tr>
                        <th>ID Questão</th>
                        <td>Questao</td>
                        <th>Tipo Questão</th>
                        <th>Valores Possíveis</th>
                    </tr>
                    <tr class="conteudo" v-for="(questaoTabela, tableKey) in questoes" :key="tableKey">
                        <td>{{tableKey+1}}</td>
                        <td>{{questaoTabela.questao}}</td>
                        <td v-if="questaoTabela.tipoVar=='string'">Texto</td>
                        <td v-if="questaoTabela.tipoVar=='intervalo'">Escolha Múltipla</td>
                        <td v-if="questaoTabela.tipoVar=='long'">Número</td>
                        <td v-if="questaoTabela.tipoVar=='intervalo'">{{constroiIntervalo(questaoTabela.intervalo)}}
                        </td>
                        <td v-else>NA</td>
                        <td class="buttonsRemover">
                            <a class="fas fa-trash" v-on:click="deleteOpcao(tableKey)" title="Remover "></a>
                        </td>
                    </tr>
                </table>
                <div class="registar">
                    <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Criar Inquérito</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from "../../main.js";
    /* eslint-disable */
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

    export default {
        data() {
            return {
                idQuestao: 0,
                counter: 0,
                questao: {
                    id: '',
                    questao: '',
                    tipoVar: '',
                    intervalo: [""]
                },
                questoes: []
            }

        }, methods: {
            deleteOpcao(counter) {

                this.questoes.splice(counter, 1);
            },
            constroiIntervalo(array) {
                var string = '';
                array.forEach(element => {
                    string += " " + element + ",";
                });
                let str = string.slice(0, -1);
                return str;
            },
            adicionarValor() {
                this.questao.intervalo.push('')
            },
            deleteValor(intervalo, counter) {
                if(intervalo.length === 1){
                    this.$toasted.error("Mínimo de uma opção!");
                    return;
                }
                intervalo.splice(counter, 1);
            },
            adicionarQuestao(questao) {
                if (questao.questao === '' || questao.tipoVar === '' || (questao.tipoVar == 'intervalo' && questao.intervalo.length == 0)) {
                    this.$toasted.error("Campos obrigatórios vazios!");
                    return;
                }

                this.questoes.push({
                    questao: questao.questao,
                    tipoVar: questao.tipoVar,
                    intervalo: questao.intervalo
                });
                this.questao = {
                    questao: '',
                    tipoVar: '',
                    intervalo: []
                };
                this.$toasted.show("Questão adicionada!");
            },
            deleteCampo(counter) {
                this.questao.intervalo.splice(counter, 1);
            },
            submit() {
                if(this.questoes.length <= 0){
                    this.$toasted.error("Mínimo 1 Questão por Inquérito!")
                    return;
                }

                let questoes = '{ \n "questoes":' + JSON.stringify(this.questoes) + "\n }";
                let msg = JSON.parse(questoes);
                instance.post('api/postInquerito',
                    msg, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ` + sessionStorage.getItem("token")
                        }
                    }).then(() => {
                        this.questoes = [];

                    this.$toasted.show("Inquérito Criado!")
                }).catch(error => {
                })

            }


        }
    }
</script>
<style>

    .registarInquerito {
        font-family: "Open Sans";
        display: flex;


    }
    .registarInquerito .titulo {
       margin-left:16.4%;
    }
    .registarInquerito .titulo h3 {
       text-align: left;
    }

    .registarInquerito table {
        margin-bottom:20px;
    }
    .registarInquerito .fields {
        display: inline-grid;
        grid-row-gap: 10px;
        grid-column-gap: 50px;
        background-color: oldlace;
        width: 100%;
        height: 100%;

    }

    .registarInquerito .campos {
        grid-column-start: 1;
        margin-top: 10px;
        margin-left: 10%;
        margin-bottom: 10px;
    }

    .registarInquerito .valorQuestao {
        height: 10%;
        margin-bottom: 10px;
    }

    .registarInquerito .valorQuestao input {
        margin-left: 4%;
    }


    .registarInquerito .tipoQuestao {
        height: 10%;
        margin-bottom: 10px;
    }

    .registarInquerito .tipoQuestao select {
        margin-left: 1%;
        width: 8.5%;
    }

    .registarInquerito .buttonAdicionarQuestao {
        margin-left: 7%;
    }

    .registarInquerito .buttonAdicionarQuestao button {
        text-align: center;
        cursor: pointer;
        background-color: rgba(246, 136, 72, 0.91);
        border: none;
        border-radius: 4px;
    }

    .registarInquerito .buttonAdicionarQuestao button:hover {
        background-color: rgba(217, 107, 44, 0.91);
    }

    .registarInquerito .intervalo {
        margin-top: 30px;
    }

    .registarInquerito input {
        margin-left: 3.8%;
    }

    .registarInquerito .conteudo .buttonsRemover {
        cursor: pointer;
        background-color:oldlace;
        width: 2%;
        border-top:none;
        border-color: oldlace;
    }

    .registarInquerito .conteudo .buttonsRemover a:hover {
        font-weight: bold;
        font-size: 13px;
    }

    .registarInquerito .buttonsIntervalos{
        width:3%;
        margin-left:8%;
        margin-bottom:50px;
        margin-top:10px;
        height:10%;
    }

    .registarInquerito .buttonsIntervalos button{
        background-color: lightgreen;
        text-align: center;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        padding: 4px;

    }

    .registarInquerito .buttonsIntervalos button:hover{
        background-color: green;
    }

    .registarInquerito .buttonsIntervalos .buttonAdicionarValor{
        float:left;
    }

    .registarInquerito .buttonsIntervalos .buttonEliminarValor{
        float:right;
    }

    .registarInquerito .registar {
        margin-top:30px;
        margin-left:50%;
        margin-bottom:30px;
    }

    .registarInquerito .registar button {
        height: 50px;
        font-size: medium;
        cursor: pointer;
        border: none;
        background-color: #e99d72;
        border-radius: 6px;
        padding-left: 15px;
        padding-right: 15px;

    }
    .registarInquerito .registar button:hover {
        background-color: #fab995;
    }


</style>