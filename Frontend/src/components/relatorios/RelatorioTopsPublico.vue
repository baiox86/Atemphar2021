
<template>
  <div class="relatorioTopsGerais">
    <br>
    <h2>Classificações Gerais:</h2>
    <br>
    <div class="dados">
      
      <div id="fields" class="tabela">
        <h3> Pessoas com mais presenças: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Num. Presenças </th>
          <tr class="conteudo" v-for="(row, tableKey) in pessoasPresencas" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalEventos}}</td>
          </tr>
        </table>
        <br>
        <h3> Pessoas que mais apoiaram financeiramente: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Oferecido </th>
          <tr class="conteudo" v-for="(row, tableKey) in pessoasApoiosFinanceiros" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{'€' + row.totalDonativos}}</td>
          </tr>
        </table>
        <h3> Staff que mais apoio prestou em eventos: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Número de Apoios </th>
          <th> Total de Pontos </th>
          <tr class="conteudo" v-for="(row, tableKey) in staffApoios" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalApoios}}</td>
            <td>{{row.totalPontuacao}}</td>
          </tr>
        </table>
        <h3> Staff que mais apoio prestou em eventos especiais: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Número de Apoios </th>
          <th> Total de Pontos </th>
          <tr class="conteudo" v-for="(row, tableKey) in staffApoiosEsp" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.totalApoios}}</td>
            <td>{{row.totalPontuacao}}</td>
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
  activated() {
    axios
      .get("api/getRelatorioPessoasPorPresencas", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.pessoasPresencas = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioPessoasPorApoiosFinanceiros", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.pessoasApoiosFinanceiros = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioStaffApoios", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.staffApoios = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioStaffApoiosEspeciais", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.staffApoiosEsp = response.data;
      })
      .catch(error => {

      });
  },
  data() {
    return {
      pessoasPresencas: [],
      pessoasApoiosFinanceiros: [],
      staffApoios: [],
      staffApoiosEsp: []
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioTopsGerais h3 {
  text-align: center;
  background-color: linen;
}
.relatorioTopsGerais h2 {
  text-align: center;
}


.relatorioTopsGerais{
  font-family: "Open Sans";

}

.relatorioTopsGerais #tabela {
  width: 70%;
}
.relatorioTopsGerais .tabela table th {
  border: 1px solid #ccc;
}
.relatorioTopsGerais .tabela table td {
  border: 1px solid #ccc;
}
</style>