<template>
    <div>
        <div class="responderInquerito">
            <div class="atempharlogo">
                <div class="imagem">
                    <a href="http://www.atemphar.org">
                        <img src="../../assets/logo_atemphar.png">
                    </a>
                </div>
                <div class="txtTitle">Plataforma de Dados</div>
            </div>
            <div class="conteudo" v-if="this.questoes.ativo === 1 && this.questoes.questoes.length > 0">
                <h1>Inquérito de Evento</h1>
                <div class="informacoesEvento">
                    <h3><b>Informações do Evento</b></h3>
                    <p><b>Nome:</b> {{questoes.nomeEvento}}</p>
                    <p><b>Data:</b> {{questoes.dataEvento}}</p>
                    <p><b>Local:</b> {{questoes.localEvento}}</p>
                    <p><b>Tipo de Evento:</b> {{questoes.tipoEvento}}</p>
                </div>
                <br>
                <div class="background">
                    <h3>Questões</h3>
                    <div class="campos">
                        <div>
                            <div v-for="(questao,counter) in questoes.questoes " :key="counter">
                                <div v-if="questao.tipoVar=='STRING'">
                                    <div class="form">
                                        <div class="nome">
                                            <label>{{counter+1 +' - ' + questao.questao}}<i
                                                    class="obrigatorio"></i></label>
                                            <br>
                                            <input type="text" v-model="respostas[counter]" name="nome">
                                        </div>
                                    </div>
                                    <br>
                                </div>
                                <div v-if="questao.tipoVar=='LONG'">
                                    <div class="form">
                                        <div class="nome">
                                            <label>{{counter+1 +' - ' + questao.questao}}<i
                                                    class="obrigatorio"></i></label>
                                            <input type="text" v-model="respostas[counter]" name="nome">
                                        </div>
                                    </div>
                                    <br>
                                </div>
                                <div  v-if="questao.tipoVar=='INTERVALO'">
                                    <label>{{counter+1 +' - ' + questao.questao}}<i class="obrigatorio"></i></label>
                                    <div class="radio">
                                        <div class="option" v-for="(valor,key) in questao.intervalo" :key="key">
                                            <input type="radio" id="valor" :value="valor" v-model="respostas[counter]">
                                            <label for=valor>{{valor}}</label>
                                        </div>
                                    </div>
                                    <br>
                                </div>


                            </div>

                            <div class="registar">
                                <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Submeter
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>Link Inválido!</h1>
            </div>
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
    import {bus} from "../../main.js";

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
                questoes: '',
                idInquerito: '',
                respostas: [],

            }

        }, created() {
            instance.get('/api/getInqueritoToken/' + this.$route.params.token, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ` + sessionStorage.getItem("token")
                }
            }).then(response => {
                this.questoes = response.data;
            }).catch(error => {
                if(error.response.status == 400){
                    this.$toasted.error("Ocorreu um erro!");
                }
            })
        }, methods: {
            clearFields(){
              this.respostas = [];
            },
            submit() {
                if(this.respostas.length <= 0){
                    this.$toasted.error("Mínimo de 1 resposta!");
                    return;
                }

                instance.post('/api/postResposta/' + this.$route.params.token, this.respostas, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ` + sessionStorage.getItem("token")
                    }
                }).then(() => {
                    this.$toasted.show('Obrigado pela sua resposta!');
                    this.clearFields();

                }).catch(error => {
                    if(error.response.status == 400){
                        this.$toasted.error("Ocorreu um erro!");
                    }
                })
            }
        }
    }
</script>
<style>
    @import url("https://fonts.googleapis.com/css?family=Actor");

    .responderInquerito .conteudo {
        min-height: calc(100vh - 425px)
    }

    .responderInquerito .atempharlogo {
        background-image: url("../../assets/campo_trigo.jpg");
        display: grid;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        height: 100%;
    }

    .responderInquerito .atempharlogo .imagem {
        grid-column-start: 1;
        grid-row-start: 2;
        margin-left: 10px;
    }

    .responderInquerito .atempharlogo .imagem img {
        width: 90%;
        margin-top: 10px;
    }

    .responderInquerito .atempharlogo .txtTitle {
        grid-column-start: 2;
        grid-row-start: 3;
        color: #ffffff;
        font-family: "Berlin Sans FB";
        font-size: 5vw;
        margin-right: 20px;
    }

    .responderInquerito .conteudo {

        min-height: calc(100vh - 425px)
    }


    .responderInquerito .background {
        display: inline-grid;
        grid-row-gap: 10px;
        grid-column-gap: 50px;
        background-color: oldlace;
        width: 100%;

    }

    .responderInquerito .campos {
        margin-left: 35%;

    }

    .responderInquerito .radio{
        display: table;
        border-spacing: 5px;
    }

    .responderInquerito .radio .option{
        display: table-cell;
    }

    .responderInquerito .informacoesEvento {
        margin: auto;
        width: 30%;
        padding: 10px;
        margin-top: 3%;
        border: 3px solid lightgray;
        overflow: hidden;
    }

    .responderInquerito .nome input{
        margin-top:10px;
        width:80%;
    }

    .responderInquerito .registar {
        margin-left: 20%;
        margin-bottom: 30px;
        grid-column-start: 2;
        grid-row-start: 5;
        justify-self: end;
    }

    .responderInquerito .registar button {
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


    .creditos {
        background-color: #f1f1f1;
        display: grid;
        height: 59px;
    }

    .creditos img {
        width: 150px;
        grid-column-start: 1;
        grid-row-start: 1;
        margin-left: 30px;
    }

    .creditos .uc {
        grid-column-start: 2;
        grid-row-start: 1;
        align-self: end;
        justify-self: center;
        margin-bottom: 10px;
        font-size: 12px;
    }

    .creditos .autores {
        grid-column-start: 3;
        grid-row-start: 1;
        align-self: center;
        justify-self: end;
        margin-right: 30px;
        font-size: 10px;
        font-family: "Actor";
    }

    .creditos .titulo {
        font-weight: bold;
    }
</style>