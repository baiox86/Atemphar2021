<template>
  <div class="formNovaRespostaInquerito">
    <br>
    <h3>Preenchimento de Inquérito</h3>
    <br>
    <div class="preencherInquerito">
    <div class="form">

        <div class="tema">
          <label>Tema:</label>
          <br>
          <p>1 - Importância do tema para a sua atividade pessoal:</p>
        </div>
        <div class="opcoesTema">
          <label>1 &nbsp; &nbsp; 2 &nbsp; &nbsp; 3 &nbsp; &nbsp; 4 &nbsp; &nbsp; 5 &nbsp; &nbsp; n.a.</label>
          <br>
          <br>
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=1> &nbsp;
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=2> &nbsp;
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=3> &nbsp;
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=4> &nbsp;
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=5> &nbsp;
          <input type="radio" name="questao1" v-model="input.importanciaTema" value=0>
        </div>
        
        <div class="palestrante">
          <label>Palestrante:</label>
          <br>
          <p>2 - Conhecimento do Tema:</p>
          <p>3 - Objetividade e Clareza:</p>
          <p>4 - Conteúdo apresentado relacionado com o tema:</p>
          <p>5 - Audiovisuais utilizados (slides, vídeos, etc.):</p>
        </div>

        <div class="opcoesPalestrante">
          <label>1 &nbsp; &nbsp; 2 &nbsp; &nbsp; 3 &nbsp; &nbsp; 4 &nbsp; &nbsp; 5 &nbsp; &nbsp; n.a.</label>
          <br>
          <br>
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=1>&nbsp;
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=2>&nbsp;
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=3>&nbsp;
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=4>&nbsp;
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=5>&nbsp;
          <input type="radio" name="questao2" v-model="input.conhecimentoTema" value=0>
          
          <br>
          <br>
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=1>&nbsp;
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=2>&nbsp;
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=3>&nbsp;
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=4>&nbsp;
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=5>&nbsp;
          <input type="radio" name="questao3" v-model="input.objetividadeClareza" value=0>

          <br>
          <br>
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=1>&nbsp;
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=2>&nbsp;
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=3>&nbsp;
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=4>&nbsp;
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=5>&nbsp;
          <input type="radio" name="questao4" v-model="input.conteudoApresentado" value=0>

          <br>
          <br>
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=1>&nbsp;
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=2>&nbsp;
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=3>&nbsp;
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=4>&nbsp;
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=5>&nbsp;
          <input type="radio" name="questao5" v-model="input.audiovisuais" value=0>

        </div>

        <div class="organizacao">
          <label>Organização do Evento:</label>
          <br>
          <p>6 - Divulgação da Informação:</p>
          <p>7 - Pontualidade:</p>
          <p>8 - Local adequado:</p>
        </div>
        <div class="opcoesOrganizacao">
          <label>1 &nbsp; &nbsp; 2 &nbsp; &nbsp; 3 &nbsp; &nbsp; 4 &nbsp; &nbsp; 5 &nbsp; &nbsp; n.a.</label>
          <br>
          <br>
          <input type="radio" name="questao6" v-model="input.divulgacao" value=1> &nbsp;
          <input type="radio" name="questao6" v-model="input.divulgacao" value=2> &nbsp;
          <input type="radio" name="questao6" v-model="input.divulgacao" value=3> &nbsp;
          <input type="radio" name="questao6" v-model="input.divulgacao" value=4> &nbsp;
          <input type="radio" name="questao6" v-model="input.divulgacao" value=5> &nbsp;
          <input type="radio" name="questao6" v-model="input.divulgacao" value=0> &nbsp;
          <br>
          <br>
          <input type="radio" name="questao7" v-model="input.pontualidade" value=1> &nbsp;
          <input type="radio" name="questao7" v-model="input.pontualidade" value=2> &nbsp;
          <input type="radio" name="questao7" v-model="input.pontualidade" value=3> &nbsp;
          <input type="radio" name="questao7" v-model="input.pontualidade" value=4> &nbsp;
          <input type="radio" name="questao7" v-model="input.pontualidade" value=5> &nbsp;
          <input type="radio" name="questao7" v-model="input.pontualidade" value=0> &nbsp;
          <br>
          <br>
          <input type="radio" name="questao8" v-model="input.localAdequado" value=1> &nbsp;
          <input type="radio" name="questao8" v-model="input.localAdequado" value=2> &nbsp;
          <input type="radio" name="questao8" v-model="input.localAdequado" value=3> &nbsp;
          <input type="radio" name="questao8" v-model="input.localAdequado" value=4> &nbsp;
          <input type="radio" name="questao8" v-model="input.localAdequado" value=5> &nbsp;
          <input type="radio" name="questao8" v-model="input.localAdequado" value=0> &nbsp;

        </div>
      
        <div>
          <p>9 - Expectativas do Evento:</p>
        </div>
        <div>
          <br>
          <input type="radio" name="questao9" v-model="input.expectativasEvento" value="Superou"> Superou
          &nbsp;
          <input type="radio" name="questao9" v-model="input.expectativasEvento" value="Atendeu"> Atendeu
          &nbsp;
          <input type="radio" name="questao9" v-model="input.expectativasEvento" value="NaoAtendeu"> Não Atendeu
        </div>

        <div>
          <p>10 - De modo geral considera-se:</p>
        </div>
        <div>
          <br>
          <input type="radio" name="questao10" v-model="input.comoSeConsidera" value="MuitoSatisfeito"> Muito Satisfeito
          &nbsp;
          <input type="radio" name="questao10" v-model="input.comoSeConsidera" value="Satisfeito"> Satisfeito
          &nbsp;
          <input type="radio" name="questao10" v-model="input.comoSeConsidera" value="Insatisfeito"> Insatisfeito
        </div>

        <div>
          <p>11 - Como é que teve conhecimento deste evento:</p>
        </div>
        <div>
          <br>
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="AmigosColegas"> Indicação de amigos ou colegas
          &nbsp;
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="Internet"> Internet / Site
          <br>
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="E-Mail"> E-Mail
          &nbsp;
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="Flyer"> Flyer Publicitário
          &nbsp;
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="Facebook"> Facebook
          <br>
          <input type="radio" name="questao11" v-model="input.conhecimentoEvento" value="Outro"> Outro
          <template v-if="input.conhecimentoEvento === 'Outro'">
            <input type="text" v-model="input.conhecimentoEventoOutros" placeholder="Qual">
          </template>
          <br>
          <!-- text field -->
        </div>
      
        <div>
          <p>12 - Se pudesse mudar uma coisa neste evento, o que seria?</p>
        </div>
        <div class="respostaQuestao12">
          <br>
          <input type="text" v-model="input.oQueMudaria" name="questao12">
        </div>

        <div>
          <p>13-Registe as suas sugestões e impressões para a melhoria dos serviços prestados:</p>
        </div>
        <div class="respostaQuestao13">
          <br>
          <input type="text" v-model="input.sugestoes" name="questao13">
        </div>

        <div>
          <p>14-Registe a sua apreciação sobre o evento.</p>
        </div>
        <div class="respostaQuestao14">
          <br>
          <input type="text" v-model="input.apreciacaoEvento" name="questao14">
        </div>

        <div>
          <p>15 - Conhecia esta área?:</p>
        </div>
        <div>
          <br>
          <input type="radio" name="questao15" v-model="input.conheciaArea" value="Desconhecia"> Desconhecia
          <br>
          <input type="radio" name="questao15" v-model="input.conheciaArea" value="OuviuFalar"> Só ouvi falar
           &nbsp;
          <input type="radio" name="questao15" v-model="input.conheciaArea" value="TinhaExperienciado"> Já tinha experienciado
          <br>
          <input type="radio" name="questao15" v-model="input.conheciaArea" value="ConhecimentoProfundo"> Tenho conhecimento profundo
          &nbsp;
          <!-- text field: se conhecia, de onde?-->
          <template
            v-if="this.input.conheciaArea === 'TinhaExperienciado' || this.input.conheciaArea === 'ConhecimentoProfundo'"
          >
            Se conhecia, de onde?
            <input type="text" v-model="input.conheciaAreaOnde">
          </template>
          <template v-else></template>
        </div>
    
      <div class="pessoalmente">
        <label>Eu, Pessoalmente:</label>
        <br>
        <p>16 - Esta área e este tema, acha que o pode ajudar como:</p>
        <br>
        <p>17 - Esta área e este tema,acha que é útil para a evolução do ser humano e sua longevidade?:</p>
        <p>18 - Acha que o ser humano deve estar sempre em fase de aprendizagem?:</p>
        <p>19 - Aconselharia aos seus amigos frequentar o conceito do projeto Atemphar?:</p>
      </div>
      <div>
        <br>
        <br>
        <input type="checkbox" name="questao16_1" v-model="input.questao16.temaPodeAjudar_1"> Ferramenta de prevenção/antecipação do ser humano?
        <br>
        <input type="checkbox" name="questao16_2" v-model="input.questao16.temaPodeAjudar_2"> Apoio na resolução atual
      
        <br>
        <br>
        <input type="radio" name="questao17" v-model="input.utilParaEvolucao" value="Sim"> Sim
        &nbsp;
        <input type="radio" name="questao17" v-model="input.utilParaEvolucao" value="Talvez"> Talvez
        &nbsp;
        <input type="radio" name="questao17" v-model="input.utilParaEvolucao" value="Nao"> Não

        <br>
        <br>
        <br>
        <input type="radio" name="questao18" v-model="input.serHumanoEmAprendizagem" value="Sim"> Sim
        &nbsp;
        <input type="radio" name="questao18" v-model="input.serHumanoEmAprendizagem" value="Talvez"> Talvez
        &nbsp;
        <input type="radio" name="questao18" v-model="input.serHumanoEmAprendizagem" value="Nao"> Não

        <br>
        <br>
        <input type="radio" name="questao19" v-model="input.aconselhariaAtemphar" value="SimMuito"> Sim, muito
        &nbsp;
        <input type="radio" name="questao19" v-model="input.aconselhariaAtemphar" value="Sim"> Sim
        &nbsp;
        <input type="radio" name="questao19" v-model="input.aconselhariaAtemphar" value="Talvez"> Talvez
        &nbsp;
        <input type="radio" name="questao19" v-model="input.aconselhariaAtemphar" value="Nao"> Não
      </div>

      <div class="registar">
        <button type="submit" v-on:click.prevent="submit()"><i class="far fa-save"></i> Registar</button>
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

import { bus } from "../../main.js";
import { ModelListSelect } from "vue-search-select";
export default {
  props: {
    idEvento: {
      type: String,
      required: true
    }
  },
  mounted() {},
  data() {
    var here = this;
    return {
      input: {
        importanciaTema: null,
        conhecimentoTema: null,
        objetividadeClareza: null,
        conteudoApresentado: null,
        audiovisuais: null,
        divulgacao: null,
        pontualidade: null,
        localAdequado: null,
        expectativasEvento: "Superou",
        comoSeConsidera: "MuitoSatisfeito",
        conhecimentoEvento: "AmigosColegas",
        conhecimentoEventoOutros: "",
        oQueMudaria: "",
        sugestoes: "",
        apreciacaoEvento: "",
        conheciaArea: "Desconhecia",
        conheciaAreaOnde: "",
        questao16: {
          temaPodeAjudar_1: false,
          temaPodeAjudar_2: false,
        },
        utilParaEvolucao: "Sim",
        serHumanoEmAprendizagem: "Sim",
        aconselhariaAtemphar: "SimMuito"
      }
    };
  },
  methods: {
    submit: function() {
      axios
        .post(
          "/api/postRespostaInquerito/",
          {
            idEvento: this.idEvento,
            importanciaTema: this.input.importanciaTema,
            conhecimentoTema: this.input.conhecimentoTema,
            objetividadeClareza: this.input.objetividadeClareza,
            conteudoApresentado: this.input.conteudoApresentado,
            audiovisuais: this.input.audiovisuais,
            divulgacao: this.input.divulgacao,
            pontualidade: this.input.pontualidade,
            localAdequado: this.input.localAdequado,
            expectativasEvento: this.input.expectativasEvento,
            comoSeConsidera: this.input.comoSeConsidera,
            conhecimentoEvento: this.input.conhecimentoEvento,
            conhecimentoEventoOutros: this.conhecimentoEventoOutros,
            oQueMudaria: this.input.oQueMudaria,
            sugestoes: this.input.sugestoes,
            apreciacaoEvento: this.input.apreciacaoEvento,
            conheciaArea: this.input.conheciaArea,
            conheciaAreaOnde: this.input.conheciaAreaOnde,
            questao16_1: this.input.questao16.temaPodeAjudar_1,
            questao16_2: this.input.questao16.temaPodeAjudar_2,
            utilParaEvolucao: this.input.utilParaEvolucao,
            serHumanoEmAprendizagem: this.input.serHumanoEmAprendizagem,
            aconselhariaAtemphar: this.input.aconselhariaAtemphar
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ` + sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          if(response.status === 401){
            this.$toasted.error("Sessão expirou.");
            bus.$emit("logout");
            return;
          }
          bus.$emit("submitPart", "Nova resposta a inquérito inserida!");
          this.$forceUpdate();
        })
        .catch(error => {

          this.$toasted.error("Erro a inserir inquérito!");

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

h3 {
  text-align: center;
  font-family: "Open Sans";
}

.preencherInquerito{
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: oldlace;
  
}

.preencherInquerito .form {
  display: grid;
  grid-row-gap: 25px;
  grid-column-gap: 15px;
  width: 65%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.preencherInquerito .tema label{
  font-weight: bold; 
}

.preencherInquerito .tema {
  grid-column-start: 1;
}

.preencherInquerito .opcoesTema {
  grid-column-start: 2;
}

.preencherInquerito .opcoesTema input{
  margin: 2px;
}

.preencherInquerito .palestrante label{
  font-weight: bold; 
}
.preencherInquerito .opcoesPalestrante input{
  margin: 4px;
}

.preencherInquerito .palestrante p {
  padding-bottom: 6px;
  padding-top: 2px;
}

.preencherInquerito .organizacao label{
  font-weight: bold; 
}

.preencherInquerito .opcoesOrganizacao input{
  margin: 2px;
}

.preencherInquerito .organizacao p {
  padding-bottom: 5px;
  padding-top: 3px;
}

.preencherInquerito .pessoalmente label{
  font-weight: bold; 
}

.preencherInquerito .respostaQuestao12 input {
  width: 100%;
}

.preencherInquerito .respostaQuestao13 input {
  width: 100%;
}

.preencherInquerito .respostaQuestao14 input {
  width: 100%;
}

.preencherInquerito .registar button {
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
.preencherInquerito .registar button:hover {
  background-color: #fab995;
}
</style>