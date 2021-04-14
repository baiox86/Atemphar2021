<template>
  <div>
    <TopBar :PanelComponent="PanelComponent"/>
    <div class="conteudoPagina">
      <keep-alive :key="componentKey">
        <component
          v-on:auth="doLogin"
          :is="PanelComponent"
          :idEvento="idEvento"
          :idPessoa="idPessoa"
          :idEmpresa="idEmpresa"
          :dadosApoio="dadosApoio"
          :dadosPessoa="dadosPessoa"
          :dadosEvento="dadosEvento"
          :dadosEmpresa="dadosEmpresa"
          :dadosInquerito="dadosInquerito"
        ></component>
      </keep-alive>
    </div>


      <footer class="creditos">
        <img src="./assets/ipl_logo.png">
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
/* eslint-disable */

import { bus } from "./main.js";

import { EventEmitter } from "events";
export default {
  name: "Index",
  data: function() {
    return {
      componentKey: 1,
      idEvento: null,
      idPessoa: null,
      idEmpresa: null,
      idEvento:null,
      dadosApoio: null,
      dadosPessoa: null,
      dadosEvento: null,
      dadosInscricoes : null,
      dadosEmpresa: null,
      dadosInquerito : null,
      authenticated: false,
      user: {
        name: "unknown"
      },
      PanelComponent: null
    };
  },
  computed: {},
  methods: {
    tempClick: function() {
      console.log("TODO");
    },
    checkAuth: function() {
      return this.authenticated;
    },
    doLogin: function(value) {
      this.authenticated = value;
      if (value) {
        this.swapComponent("PersonsTablesMenu");
      }
    },
    swapComponent: function(comp) {
      this.PanelComponent = comp;
    },
    loadEventPage: id => {
      bus.$emit("changeEventPage", id);
    }
  },
  created: function() {
    if (!this.authenticated) {
      this.swapComponent("LoginScreen");
    } else {
      this.swapComponent("PersonsTablesMenu");
    }

    bus.$on("switchComp", comp => {
      if (this.authenticated) {
        this.swapComponent(comp);
      }
    });
    bus.$on("logout", () => {
      this.authenticated = false;
      sessionStorage.setItem("token", "");
      this.swapComponent("LoginScreen");
    });
    bus.$on("viewEvento", id => {
      this.idEvento = id;
      this.swapComponent("EventoFichaIndividual");
    });

    bus.$on("viewPessoa", id => {
      this.idPessoa = id;
      this.swapComponent("PessoaFichaIndividual");
    });

    bus.$on("viewEmpresa", id => {
      this.idEmpresa = id;
      this.swapComponent("EmpresaFichaIndividual");
    });

    bus.$on("submitPart", (text) => {
      this.swapComponent("");
      this.$nextTick(() => {
        this.swapComponent("EventoFichaIndividual");
      });
    });

    bus.$on("submitEmpresario", (text) => {
      this.swapComponent("");
      this.$nextTick(() => {
        this.swapComponent("EmpresaFichaIndividual");
      });
    });

    bus.$on("refreshFichaPessoa", (text) => {
      this.swapComponent("");
      this.$nextTick(() => {
        this.swapComponent("PessoaFichaIndividual");
      });
    });
     bus.$on("refreshEventos", (text) => {
      this.swapComponent("");
      this.$nextTick(() => {
        this.swapComponent("EventsTablesMenu");
      });
    });

    bus.$on("editarApoio", dados => {
      this.dadosApoio = dados;
      this.swapComponent("EditarApoio");
    });

    bus.$on("editarPessoa", dados => {
      this.dadosPessoa = dados;
      this.swapComponent("EditarPessoa");
    });
    bus.$on("associarInquerito",dados=>{
      this.idEvento = dados;
      this.swapComponent("tableInqueritos");
    })


    bus.$on("editarEvento", dados => {
      this.dadosEvento = dados;
      this.swapComponent("EditarEvento");
    });

    bus.$on("editInscricoes", dados => {
      this.dadosEvento = dados;
      this.swapComponent("FormInscricoesEvento");
    });

    bus.$on("listarRespostasInquerito", dados => {
      this.dadosInquerito = dados;
      this.swapComponent("RespostasInqueritoTable");
    });

     bus.$on("registarPagamentoInscricao", dados => {
      this.dadosPessoa = dados;
      this.swapComponent("RegistarPagamentoInscricao");
    });

    bus.$on("editarEmpresa", dados => {
      this.dadosEmpresa = dados;
      this.swapComponent("EditarEmpresa");
    });
  },
  mounted: function() {},

};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Actor");

.conteudoPagina{
  min-height: calc(100vh - 425px)
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