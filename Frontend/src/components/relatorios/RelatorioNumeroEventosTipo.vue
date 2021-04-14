
<template>
  <div class="relatorioNumeroEventosTipo">
    <br>
    <h3>Número de Eventos por tipo:</h3>
    <br>
      <div id="fields" class="tabela">
        <table class="w3-table-all" id="tabela">
          <!--ID, nome, tipo, data, local -->
          <th> Tipo Evento </th>
          <th> Total </th>
          <tr class="conteudo" v-for="(row, tableKey) in this.stats" :key="tableKey">
            <td>{{rowFormat(row.tipoEvento)}}</td>
            <td>{{row.totalTipoEventos}}</td>
          </tr>
        </table>
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
    rowFormat: (string) =>{
        switch(string){
          case 'Palestra': return string + 's'; break;
          case 'Simposio': return 'Simpósios'; break;
          case 'Workshop': return string + 's'; break;
          case 'Piquenique': return string + 's'; break;
          case 'Jantar Solidariedade': return 'Jantares de Solidariedade'; break;
          case 'Mini-Gala': return string + 's'; break;
          case 'Apoio Solidariedade': return 'Apoios de Solidariedade'; break;
          case 'Tertulia': return 'Tertúlias'; break;
          case 'PalestraSimposio': return 'Palestras de Simpósio'; break;
        }
    }
  },
  mounted() {
    axios
      .get("api/getRelatorioContagemEventos", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.stats = response.data;
      })
      .catch(error => {

      });
  },
  data() {
    return {
      stats: []
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioNumeroEventosTipo h3 {
  text-align: center;
  background-color: linen;
}

.relatorioNumeroEventosTipo{
  font-family: "Open Sans";

}

.relatorioNumeroEventosTipo #tabela {
  width: 70%;
}
.relatorioNumeroEventosTipo .tabela table th {
  border: 1px solid #ccc;
}
.relatorioNumeroEventosTipo .tabela table td {
  border: 1px solid #ccc;
}

</style>