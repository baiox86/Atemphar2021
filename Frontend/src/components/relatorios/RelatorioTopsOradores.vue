
<template>
  <div class="relatorioTopsOradores">
    <br>
    <h2>Classificações de Oradores:</h2>
    <br>
    <div class="dados">
      
      <div id="fields" class="tabela">
        <h3> Oradores com mais Palestras: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Número de Eventos Apresentados </th>
          <tr class="conteudo" v-for="(row, tableKey) in oradoresPalestras" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalEventosApresentados}}</td>
          </tr>
        </table>
        <br>
        <h3> Oradores com mais público seu nos seus eventos: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Público</th>
          <tr class="conteudo" v-for="(row, tableKey) in oradoresPublicoSeuPalestras" :key="tableKey">
            <td>{{row.nomeOrador}}</td>
            <td>{{row.totalReferralsEmEventos}}</td>
          </tr>
        </table>
        <h3> Oradores que mais compareceram noutros eventos: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Participações </th>
          <tr class="conteudo" v-for="(row, tableKey) in oradoresParticipacoesPalestras" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalParticipacoesOutrosEventos}}</td>
          </tr>
        </table>
        <h3> Oradores com mais presenças em eventos especiais: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Participações  </th>
          <tr class="conteudo" v-for="(row, tableKey) in oradoresParticipacoesEspeciais" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalParticipacoesEventosEspeciais}}</td>
          </tr>
        </table>
        <h3> Oradores que mais apoiaram financeiramente: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Apoio </th>
          <tr class="conteudo" v-for="(row, tableKey) in oradoresApoiosFinanceiros" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>€{{row.totalDonativos}}</td>
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
export default {
  methods: {
  },
  mounted() {
    axios
      .get("api/getRelatorioOradoresPorNumPalestras", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradoresPalestras = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioOradoresPorPublicoSeu", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradoresPublicoSeuPalestras = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioOradoresParticipacoes", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradoresParticipacoesPalestras = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioOradoresParticipacoesEventosEspeciais", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradoresParticipacoesEspeciais = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioOradoresApoiosFinanceiros", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.oradoresApoiosFinanceiros = response.data;
      })
      .catch(error => {

      });
  },
  data() {
    return {
      oradoresPalestras: [],
      oradoresPublicoSeuPalestras: [],
      oradoresParticipacoesPalestras: [],
      oradoresParticipacoesEspeciais: [],
      oradoresApoiosFinanceiros: []
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioTopsOradores h3 {
  text-align: center;
  background-color: linen;
}

.relatorioTopsOradores h2 {
  text-align: center;
}
.relatorioTopsOradores{
  font-family: "Open Sans";

}

.relatorioTopsOradores #tabela {
  width: 70%;
}
.relatorioTopsOradores .tabela table th {
  border: 1px solid #ccc;
}
.relatorioTopsOradores .tabela table td {
  border: 1px solid #ccc;
}
</style>