
<template>
  <div class="relatorioHistoricoParticipantes">
    <h3> Eventos com mais participantes: </h3>
    <div class="dadosTabela">
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Participantes </th>
          <tr class="conteudo" v-for="(row, tableKey) in dataRelatorio2" :key="tableKey">
            <td>{{row.nomeEvento}}</td>
            <td>{{row.numParticipantes}}</td>
          </tr>
        </table>
        </div>
    <br>
    <h3>Evolução do número de participantes:</h3>
    <br>
    <div class="grafico" id="grafico">
      <apexcharts width=100% type=bar :options="chartOptions" :series="seriesData"/>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
/* eslint-disable */
var axios = require("axios");
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response.status === 401) { 
        bus.$emit("logout");
      }
 });
export default {
  methods: {
  },
  mounted() {
    axios
      .get("api/getRelatorioParticipacoesPorEvento", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.dataRelatorio = response.data;
        this.formatData();
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioEventosPorParticipacoes", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.dataRelatorio2 = response.data;
        this.formatData();
      })
      .catch(error => {

      });
  },
  data() {
    return {
      chartOptions: {},
      dataRelatorio: [],
      dataRelatorio2: [],
      seriesData: [{
        title: 'Número de participantes',
        data: []
      }],
      labelsData: []
    };
  },
  methods: {
    formatData(){
      var seriesAux = [];
      var labelsAux = [];
      for(var i in this.dataRelatorio) {
        labelsAux.push(this.dataRelatorio[i].nomeEvento);
        seriesAux.push(this.dataRelatorio[i].numParticipantes);
      }
      this.chartOptions = {
        labels: labelsAux
      }
      this.seriesData = [{
        title: 'Número de participantes',
        data: seriesAux
      }]

    }
  },
  components: {
    apexcharts: VueApexCharts
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioHistoricoParticipantes h3 {
  text-align: center;
  background-color: linen;
}

.relatorioHistoricoParticipantes{
  font-family: "Open Sans";

}

.relatorioHistoricoParticipantes #tabela {
  width: 70%;
  margin: auto;
}
/*
.relatorioHistoricoParticipantes .dadosTabela{
  width: 70;
  margin: auto;
}*/
.relatorioHistoricoParticipantes .dadosTabela table th {
  border: 1px solid #ccc;
}
.relatorioHistoricoParticipantes .dadosTabela table td {
  border: 1px solid #ccc;
}

.relatorioHistoricoParticipantes .grafico {
  width: 50%;
  margin: auto;
}

</style>