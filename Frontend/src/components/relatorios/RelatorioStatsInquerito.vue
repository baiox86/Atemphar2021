<template>
<div class="resultadosInqueritos">
  <br>
  <h1> ESTATÍSTICAS </h1>
 <!-- a ideia aqui era que ficassem 2 tabelas por "linha" -->
 <!-- não funcionou muito bem... -->
 <div class="questoes">
 <div class="questao1">
   <h3>1 - Importância do tema</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut color="#00FF00" :options="chartOptions1" :series="series1"></apexcharts>
  </div>
</div>
<div class="questao2">
   <h3>2 - Conhecimento do tema pelo Palestrante</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions2" :series="series2"></apexcharts>
  </div>
</div>
<div class="questao3">
   <h3>3 - Objetividade e Clareza</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions3" :series="series3"></apexcharts>
   </div>
</div>
<div class="questao4">
   <h3>4 - Conteúdo Apresentado</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions4" :series="series4"></apexcharts>
   </div>
</div>
<div class="questao5">
   <h3>5 - Audiovisuais</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions5" :series="series5"></apexcharts>
   </div>
</div>
<div class="questao6">
   <h3>6 - Divulgação da Informação pela Organização</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions6" :series="series6"></apexcharts>
   </div>
</div>
<div class="questao7">
   <h3>7 - Pontualidade</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions7" :series="series7"></apexcharts>
   </div>
</div>
<div class="questao8">
   <h3>8 - Adequação do Local</h3>
   <div class="grafico">
  <apexcharts width="50%" type=donut :options="chartOptions8" :series="series8"></apexcharts>
   </div>
</div>
<div class="questao9">
   <h3>9 - Expectativas do evento</h3>
   <div class="graficoQuestao9">
   <apexcharts width=50% type=donut :options="chartOptions9" :series="series9" />
   </div>
</div>
<div class="questao10">
   <h3>10 - De modo geral considera-se</h3>
   <div class="graficoQuestao10">
   <apexcharts width=50% type=donut :options="chartOptions10" :series="series10" />
   </div>
</div>
<div class="questao11">
   <h3>11 - Como é que teve conhecimento do evento</h3>
   <div class="graficoQuestao11">
   <apexcharts width=50% type=donut :options="chartOptions11" :series="series11" />
   </div>
</div>
<!-- os "Outros" devem estar ao lado dos gráficos a que pertencem, mesmo que implique haver 1 linha
só com 1 gráfico -->
<div class="questao11Outros">
  <h3> Outros</h3>
   <table class="w3-table-all">
        <tr class="conteudo" v-for="(resposta, componentKey) in this.dataInqueritos" :key="componentKey">
          <td v-if="resposta.conhecimentoEvento != 'Outros'"> {{resposta.conhecimentoEventoOutros}} </td> 
        </tr>
    </table>
</div>
<div class="questao12">
  <h3>12 - Se pudesse mudar uma coisa neste evento, o que seria?</h3>
   <table class="w3-table-all">
        <tr class="conteudo" v-for="(resposta, componentKey) in this.dataInqueritos" :key="componentKey">
          <td v-if="resposta.oQueMudaria != ''"> {{resposta.oQueMudaria}} </td> 
        </tr>
    </table>
</div>
<div class="questao13">
  <h3>13 - Sugestões e impressões para a melhoria dos serviços prestados</h3>
   <table class="w3-table-all">
        <tr class="conteudo" v-for="(resposta, componentKey) in this.dataInqueritos" :key="componentKey">
          <td v-if="resposta.sugestoes != ''"> {{resposta.sugestoes}} </td> 
        </tr>
    </table>
</div>
<div class="questao14"> 
  <h3>14 - Apreciações sobre o evento</h3>
   <table class="w3-table-all">
        <tr class="conteudo" v-for="(resposta, componentKey) in this.dataInqueritos" :key="componentKey">
          <td v-if="resposta.apreciacaoEvento != ''"> {{resposta.apreciacaoEvento}} </td> 
        </tr>
    </table>
</div>
<div class="questao15">
   <h3>15 - Conhecia esta área?</h3>
   <div class="graficoQuestao15">
   <apexcharts width=50% type=donut :options="chartOptions15" :series="series15" />
   </div>
</div>
<!-- Esta tabela também deve estar ao lado da que se segue -->
<div class="questao15Onde">
  <h3>Se conhecia, de onde?</h3>
   <table class="w3-table-all">
        <tr class="conteudo" v-for="(resposta, componentKey) in this.dataInqueritos" :key="componentKey">
          <td v-if="resposta.conheciaAreaOnde != ''"> {{resposta.conheciaAreaOnde}} </td> 
        </tr>
    </table>
</div>
<div class="questao16">
   <h3>16 - Esta área e este tema, acha que o pode ajudar como?</h3>
   <div class="graficoQuestao16">
   <apexcharts width=50% type=histogram :options="chartOptions16" :series="series16" />
   </div>
</div>
<div class="questao17">
   <h3>17 - Esta área e este tema,acha que é útil para a evolução do ser humano e sua longevidade?</h3>
   <div class="graficoQuestao17">
   <apexcharts width=50% type=donut :options="chartOptions17and18" :series="series17" />
   </div>
</div>
<div class="questao18">
   <h3>18 - Acha que o ser humano deve estar sempre em fase de aprendizagem?</h3>
   <div class="grafico">
   <apexcharts width=50% type=donut :options="chartOptions17and18" :series="series18" />
   </div>
</div>
<div class="questao19">
   <h3>19- Aconselharia aos seus amigos frequentar o conceito do projeto Atemphar?</h3>
   <div class="graficoQuestao19">
   <apexcharts width=50% type=donut :options="chartOptions19" :series="series19" />
   </div>
</div>
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
//
var colorList = ['#FF0000', '#00FF00', '#0000FF', '#ED0677', '#FFDB3D', '#F37021', '#65320A'];
import { bus } from "../../main.js";
import VueApexCharts from 'vue-apexcharts'
export default {
  data: function() {
      return {
        chartOptions1: {
          labels:  ['N/A', 'Muito Pouco Importante', 'Pouco Importante', 'Importante', 'Muito Importante', 'Importantíssimo', 'Vazio'],
          colors: colorList
        },
        chartOptions2: {
          labels:  ['N/A', 'Não Conhecia', 'Conhecia Pouco', 'Conhecia', 'Conhecia Bem', 'Conhecia Muito Bem', 'Vazio'],
          colors: colorList
        },
        chartOptions3: {
          labels:  ['N/A', 'Muito Pouco Claro', 'Pouco Claro', 'Claro', 'Bem Claro', 'Muito Bem Claro', 'Vazio'],
          colors: colorList
        },
        chartOptions4: {
          labels:  ['N/A', 'Muito Pouco Relacionado', 'Pouco Relacionado', 'Relacionado', 'Muito Relacionado', 'Muitíssimo Relacionado', 'Vazio'],
          colors: colorList
        },
        chartOptions5: {
          labels:  ['N/A', 'Muito Fraca Qualidade', 'Fraca Qualidade', 'Qualidade Média', 'Boa Qualidade', 'Muito Boa Qualidade', 'Vazio'],
          colors: colorList
        },
        chartOptions6: {
          labels:  ['N/A', 'Muito Mal Divulgada', 'Mal Divulgada', 'Bem Divulgada', 'Muito Bem Divulgada', 'Muitíssimo Bem Divulgada', 'Vazio'],
          colors: colorList
        },
        chartOptions7: {
          labels:  ['N/A', 'Muito Pouco Pontual', 'Pouco Pontual', 'Medianamente Pontual', 'Frequentemente Pontual', 'Perfeitamente Pontual', 'Vazio'],
          colors: colorList
        },
        chartOptions8: {
          labels:  ['N/A', 'Muito Pouco Adequado', 'Pouco Adequado', 'Adequado', 'Muito Adequado', 'Perfeitamente Adequado', 'Vazio'],
          colors: colorList
        },
        chartOptions9: {
            labels: ['Não Atendeu', 'Atendeu', 'Superou'],
            colors: colorList
        },
        chartOptions10: {
            labels: ["Insatisfeito", "Satisfeito", "Muito Satisfeito"],
            colors: colorList
        },
        chartOptions11: {
          labels: ["Amigos ou Colegas", "Internet / Site", "E-Mail", "Flyer Publicitário", "Facebook", "Outro"],
          colors: colorList
        },
        chartOptions15: {
          labels: ["Desconhecia", "Só ouvi falar", "Tinha experienciado", "Tenho conhecimento profundo"],
          colors: colorList
        },
        chartOptions16: {
          xaxis: {
            categories: ["Ferramenta de prevenção/antecipação do ser humano", "Apoio na resolução atual"],
            colors: colorList
          }
        },
        chartOptions17and18: {
          labels: ["Não", "Talvez", "Sim"],
          colors: colorList
        },
        chartOptions19: {
          labels: ["Não", "Talvez", "Sim", "SimMuito"],
          colors: colorList
        },
        series1: [],
        series2: [],
        series3: [],
        series4: [],
        series5: [],
        series6: [],
        series7: [],
        series8: [],
        series9: [],
        series10: [],
        series11: [],
        series15: [],
        series16: [],
        series17: [],
        series18: [],
        series19: []
      }
  },
  components: {
    apexcharts: VueApexCharts
  },
  props: {
    dataInqueritos: {
      required: true
    }
  },
  methods: {
  },
  mounted(){
    var dataQuestao1, dataQuestao2, dataQuestao3, dataQuestao4,
    dataQuestao5, dataQuestao6, dataQuestao7, dataQuestao8, dataQuestao9,
    dataQuestao10, dataQuestao11, dataQuestao15, dataQuestao16, dataQuestao17,
    dataQuestao18, dataQuestao19;
    /* as arrays estão inicializadas separadamente para que as variáveis não façam
    referência à mesma array.
    o Javascript trata arrays como objetos e como tal se todas as variáveis forem inicializadas
    de uma vez (var1 = var2 = ... = varN = [0, 0, 0, ..., 0]), apontarão todas para a mesma array */
     dataQuestao1 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao2 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao3 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao4 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao5 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao6 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao7 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao8 = [0, 0, 0, 0, 0, 0, 0];
     dataQuestao9 = [0,0,0];
     dataQuestao10 = [0,0,0];
     dataQuestao11 = [0, 0, 0, 0, 0, 0];
     dataQuestao15 = [0,0,0,0];
     dataQuestao16 = [0, 0];
     dataQuestao17 = [0, 0, 0];
     dataQuestao18 = [0, 0, 0];
     dataQuestao19 = [0, 0, 0, 0];
    try{
    //contar cada instância de cada resposta a cada pergunta
    for(var i in this.dataInqueritos){ //por cada inquérito
      //ver as respostas a cada pergunta
        switch(this.dataInqueritos[i].importanciaTema){
          
          case '1': dataQuestao1[1] ++; break;
          case '2': dataQuestao1[2] ++; break;
          case '3': dataQuestao1[3] ++; break;
          case '4': dataQuestao1[4] ++; break;
          case '5': dataQuestao1[5] ++; break;
          case '0': dataQuestao1[0] ++; break;
          case null:  dataQuestao1[6] ++; break;
        }
        switch(this.dataInqueritos[i].conhecimentoTema){
          
          case '1': dataQuestao2[1] ++; break;
          case '2': dataQuestao2[2] ++; break;
          case '3': dataQuestao2[3] ++; break;
          case '4': dataQuestao2[4] ++; break;
          case '5': dataQuestao2[5] ++; break;
          case '0': dataQuestao2[0] ++; break;
          case null:  dataQuestao2[6] ++; break;
        }
        switch(this.dataInqueritos[i].objetividadeClareza){
          
          case '1': dataQuestao3[1] ++; break;
          case '2': dataQuestao3[2] ++; break;
          case '3': dataQuestao3[3] ++; break;
          case '4': dataQuestao3[4] ++; break;
          case '5': dataQuestao3[5] ++; break;
          case '0': dataQuestao3[0] ++; break;
          case null:  dataQuestao3[6] ++; break;
        }
        switch(this.dataInqueritos[i].conteudoApresentado){
          
          case '1': dataQuestao4[1] ++; break;
          case '2': dataQuestao4[2] ++; break;
          case '3': dataQuestao4[3] ++; break;
          case '4': dataQuestao4[4] ++; break;
          case '5': dataQuestao4[5] ++; break;
          case '0': dataQuestao4[0] ++; break;
          case null:  dataQuestao4[6] ++; break;
        }
        switch(this.dataInqueritos[i].audiovisuais){
          
          case '1': dataQuestao5[1] ++; break;
          case '2': dataQuestao5[2] ++; break;
          case '3': dataQuestao5[3] ++; break;
          case '4': dataQuestao5[4] ++; break;
          case '5': dataQuestao5[5] ++; break;
          case '0': dataQuestao5[0] ++; break;
          case null:  dataQuestao5[6] ++; break;
        }
        switch(this.dataInqueritos[i].divulgacao){
          
          case '1': dataQuestao6[1] ++; break;
          case '2': dataQuestao6[2] ++; break;
          case '3': dataQuestao6[3] ++; break;
          case '4': dataQuestao6[4] ++; break;
          case '5': dataQuestao6[5] ++; break;
          case '0': dataQuestao6[0] ++; break;
          case null:  dataQuestao6[6] ++; break;
        }
        switch(this.dataInqueritos[i].pontualidade){
          
          case '1': dataQuestao7[1] ++; break;
          case '2': dataQuestao7[2] ++; break;
          case '3': dataQuestao7[3] ++; break;
          case '4': dataQuestao7[4] ++; break;
          case '5': dataQuestao7[5] ++; break;
          case '0': dataQuestao7[0] ++; break;
          case null:  dataQuestao7[6] ++; break;
        }
        switch(this.dataInqueritos[i].localAdequado){
          
          case '1': dataQuestao8[1] ++; break;
          case '2': dataQuestao8[2] ++; break;
          case '3': dataQuestao8[3] ++; break;
          case '4': dataQuestao8[4] ++; break;
          case '5': dataQuestao8[5] ++; break;
          case '0': dataQuestao8[0] ++; break;
          case null:  dataQuestao8[6] ++; break;
        }
        switch(this.dataInqueritos[i].expectativasEvento){
          case 'NaoAtendeu': dataQuestao9[0] ++; break;
          case 'Atendeu': dataQuestao9[1] ++; break;
          case 'Superou': dataQuestao9[2] ++; break;
        }
        switch(this.dataInqueritos[i].comoSeConsidera){
          case 'Insatisfeito': dataQuestao10[0] ++; break;
          case 'Satisfeito': dataQuestao10[1] ++; break;
          case 'MuitoSatisfeito': dataQuestao10[2] ++; break;
        }
        switch(this.dataInqueritos[i].conhecimentoEvento){
          case 'AmigosColegas': dataQuestao11[0] ++; break;
          case 'Internet': dataQuestao11[1] ++; break;
          case 'E-Mail': dataQuestao11[2] ++; break;
          case 'Flyer': dataQuestao11[3] ++; break;
          case 'Facebook': dataQuestao11[4]++; break;
          case 'Outro': dataQuestao11[5]++; break;
        }
        switch(this.dataInqueritos[i].conheciaArea){
          case 'Desconhecia': dataQuestao15[0] ++; break;
          case 'OuviuFalar': dataQuestao15[1] ++; break;
          case 'TinhaExperienciado': dataQuestao15[2] ++; break;
          case 'ConhecimentoProfundo': dataQuestao15[3] ++; break;
        }
        if(this.dataInqueritos[i].ferramentaPrevencao == 1){
          dataQuestao16[0]++;
        }
        if(this.dataInqueritos[i].apoioResolucao == 1){
          dataQuestao16[1]++;
        }
        switch(this.dataInqueritos[i].utilParaEvolucao){
          case 'Nao': dataQuestao17[0] ++; break;
          case 'Talvez': dataQuestao17[1] ++; break;
          case 'Sim': dataQuestao17[2] ++; break;
        }
        switch(this.dataInqueritos[i].serHumanoEmAprendizagem){
          case 'Nao': dataQuestao18[0] ++; break;
          case 'Talvez': dataQuestao18[1] ++; break;
          case 'Sim': dataQuestao18[2] ++; break;
        }
        switch(this.dataInqueritos[i].aconselhariaAtemphar){
          case 'Nao': dataQuestao19[0] ++; break;
          case 'Talvez': dataQuestao19[1] ++; break;
          case 'Sim': dataQuestao19[2] ++; break;
          case 'SimMuito': dataQuestao19[3] ++; break;
        }
    }
         this.series1 = dataQuestao1
         this.series2 = dataQuestao2
         this.series3 = dataQuestao3
         this.series4 = dataQuestao4
         this.series5 = dataQuestao5
         this.series6 = dataQuestao6
         this.series7 = dataQuestao7
         this.series8 = dataQuestao8
         this.series9 = dataQuestao9
         this.series10 = dataQuestao10
         this.series11 = dataQuestao11
         this.series15 = dataQuestao15
         this.series16 = 
         [{
          name: 'Ajuda área / tema:',
          data: dataQuestao16
        }]
        this.series17 = dataQuestao17
        this.series18 = dataQuestao18
        this.series19 = dataQuestao19

    }catch(error){
      //
    }
  }
};

</script>


<style>

.resultadosInqueritos .questoes {
  display: inline-grid;
  grid-row-gap: 10px;
  grid-column-gap: 50px;
  width: 100%;
}

.resultadosInqueritos .questao1{
  grid-column-start: 1;
  grid-row-start: 1;
}
.resultadosInqueritos .questao2{
  grid-column-start: 2;
  grid-row-start: 1;
}

.resultadosInqueritos .grafico{
  margin: auto;
  margin-left: 30%;
  min-width: 100%;
  max-width: 200%;
}


.resultadosInqueritos .graficoQuestao9{
  margin: auto;
  margin-left: 30%;
  min-width: 115%;
  max-width: 200%;
}

.resultadosInqueritos .graficoQuestao10{
  margin: auto;
  margin-left: 30%;
  min-width: 113%;
  max-width: 200%;
}

.resultadosInqueritos .graficoQuestao11{
  margin: auto;
  margin-left: 30%;
  min-width: 128%;
  max-width: 200%;
}

.resultadosInqueritos .graficoQuestao15{
  margin: auto;
  margin-left: 30%;
  min-width: 138%;
  max-width: 200%;
}

.resultadosInqueritos .graficoQuestao16{
  min-width: 131%;
  max-width: 200%;
  margin-left: 16%;
}

.resultadosInqueritos .graficoQuestao17{
  margin: auto;
  margin-left: 30%;
  min-width: 108%;
  max-width: 200%;
}

.resultadosInqueritos .graficoQuestao19{
  margin: auto;
  margin-left: 30%;
  min-width: 116%;
  max-width: 200%
  
}


.resultadosInqueritos table{
  width: 50%;
  margin: auto;
}
</style>