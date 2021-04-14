
<template>
  <div class="relatorioEmailsTelefones">
    <br>
    <h2>Listas de Emails e Telefones:</h2>
    <br>
    <div class="dados">
      <div id="fields">
        <h3> Emails: </h3>
        <div class="emails">
        <code v-for="(row, tableKey) in pessoas" :key="tableKey">
            {{row.email}};
        </code>
        </div>
        <br>
        <h3> Telefones: </h3>
        <div class="telefones">
        <code v-for="(row, tableKey) in pessoas" :key="tableKey">
            {{row.telefone}};
        </code>
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
export default {
  methods: {
  },
  mounted() {
    axios
      .get("api/getAllPessoas", {
        withCredentials: true,
        headers: { Authorization: `Bearer ` + sessionStorage.getItem("token") }
      })
      .then(response => {
        this.pessoas = response.data;
      })
      .catch(error => {

      });
  },
  data() {
    return {
      pessoas: []
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://www.w3schools.com/w3css/4/w3.css");

.relatorioEmailsTelefones h3 {
  text-align: center;
  background-color: linen;
}
.relatorioEmailsTelefones h2 {
  text-align: center;
}

.relatorioEmailsTelefones{
  font-family: "Open Sans";

}

.relatorioEmailsTelefones .emails {
  width: 70%;
  border: 1px solid;
  margin: auto;
}

.relatorioEmailsTelefones .telefones {
  width: 70%;
  border: 1px solid;
  margin: auto;
}

</style>