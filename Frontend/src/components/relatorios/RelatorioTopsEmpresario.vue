
<template>
  <div class="relatorioTopsEmpresario">
    <br>
    <h2> Empresários que mais apoios financeiros prestaram: </h2>
    <br>
    <div class="dados">
      
      <div id="fields" class="tabela">
        <h3> Em nome pessoal: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Total Oferecido </th>
          <tr class="conteudo" v-for="(row, tableKey) in donativosPessoal" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{'€' + row.totalDonativos}}</td>
          </tr>
        </table>
        <br>
        <h3> Em nome da sua empresa: </h3>
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Nome </th>
          <th> Nome Empresa </th>
          <th> Total Oferecido </th>
          <tr class="conteudo" v-for="(row, tableKey) in donativosEmpresa" :key="tableKey">
            <td>{{row.nome}}</td>
            <td>{{row.nomeEmpresa}}</td>
            <td>{{'€' + row.totalDonativos}}</td>
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
      .get("api/getRelatorioEmpresariosApoiosFinanceirosPessoal", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.donativosPessoal = response.data;
      })
      .catch(error => {

      });
    axios
      .get("api/getRelatorioEmpresariosApoiosFinanceirosEmpresa", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.donativosEmpresa = response.data;
      })
      .catch(error => {

      });
  },
  data() {
    return {
      donativosPessoal: [],
      donativosEmpresa: []
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioTopsEmpresario h3 {
  text-align: center;
  background-color: linen;
}
.relatorioTopsEmpresario h2 {
  text-align: center;
}

.relatorioTopsEmpresario{
  font-family: "Open Sans";

}

.relatorioTopsEmpresario #tabela {
  width: 70%;
}
.relatorioTopsEmpresario .tabela table th {
  border: 1px solid #ccc;
}
.relatorioTopsEmpresario .tabela table td {
  border: 1px solid #ccc;
}
</style>