// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

//imports:
import Vue from 'vue'
import VueRouter from 'vue-router'

//imports de componentes:
import Index from './Index'
import TopBar from './components/TopBar.vue'
import LoginScreen from './components/LoginScreen.vue'
import ChangePassword from './components/ChangePassword.vue'

//edits
import EditarApoio from './components/edits/EditarApoio.vue'
import EditarPessoa from './components/edits/EditarPessoa.vue'
import EditarEvento from './components/edits/EditarEvento.vue'
import EditarEmpresa from './components/edits/EditarEmpresa.vue'



//registos
import RegistarPessoa from './components/registos/RegistarPessoa.vue'
import RegistarPresencasPalestra from './components/registos/RegistarPresencasPalestra.vue'
import RegistarApoio from './components/registos/RegistarApoio.vue'
import RegistarEvento from './components/registos/RegistarEvento.vue'
import RegistarDonativo from './components/registos/RegistarDonativo.vue'
import RegistarEmpresa from './components/registos/RegistarEmpresa.vue'
import FormNovoParticipante from './components/registos/FormNovoParticipante.vue'
import FormAddPalestraSimposio from './components/registos/FormAddPalestraSimposio.vue'
import FormAddRespostaInquerito from './components/registos/FormAddRespostaInquerito.vue'
import FormNovoEmpresario from './components/registos/FormNovoEmpresario.vue'
import RegistoCriacaoInscricaoEvento from './components/registos/RegistoCriacaoInscricaoEvento.vue'
import FormInscricoesEvento from './components/registos/FormInscricoesEvento.vue'
import RegistarPagamentoInscricao from './components/registos/RegistarPagamentoInscricao.vue'
//Adicionar form inquerito
import FormAddInquerito from "./components/registos/FormAddInquerito";
//relatorios
import RelatorioStatsInquerito from './components/relatorios/RelatorioStatsInquerito.vue'
import RelatorioGlobalBase from './components/relatorios/RelatorioGlobalBase.vue'
import RelatorioNumeroEventosTipo from './components/relatorios/RelatorioNumeroEventosTipo.vue'
import RelatorioTopsPublico from './components/relatorios/RelatorioTopsPublico.vue'
import RelatorioTopsOradores from './components/relatorios/RelatorioTopsOradores.vue'
import RelatorioTopsEmpresario from './components/relatorios/RelatorioTopsEmpresario.vue'
import RelatorioHistoricoParticipantes from './components/relatorios/RelatorioHistoricoParticipantes.vue'
import RelatorioListasEmailsTelefones from './components/relatorios/RelatorioListasEmailsTelefones.vue'
//tablecomponents
import AllEmpresasTable from './components/tablecomponents/AllEmpresasTable.vue'
  //eventos
    import EventsTablesMenu from './components/tablecomponents/eventos/EventsTablesMenu.vue'
  //pessoas
    import PersonsTablesMenu from './components/tablecomponents/pessoas/PersonsTablesMenu.vue'
    import AllPersonsTable from './components/tablecomponents/pessoas/AllPersonsTable.vue'
    import AllStaffTable from './components/tablecomponents/pessoas/AllStaffTable.vue'
    import AllAmigoSocioTable from './components/tablecomponents/pessoas/AllAmigoSocioTable.vue'
    import AllEmpresarioTable from './components/tablecomponents/pessoas/AllEmpresarioTable.vue'
    import AllOradorTable from './components/tablecomponents/pessoas/AllOradorTable.vue'
    import AllParticipanteTable from './components/tablecomponents/pessoas/AllParticipanteTable.vue'
    //inqueritos
    import InqueritosTablesMenu  from "./components/tablecomponents/inqueritos/InqueritosTablesMenu";
    import RespostasInqueritoTable from "./components/tablecomponents/inqueritos/RespostasInqueritoTable"

//fichasindividuais
import EventoFichaIndividual from './components/fichasindividuais/EventoFichaIndividual.vue'
import PessoaFichaIndividual from './components/fichasindividuais/PessoaFichaIndividual.vue'
import EmpresaFichaIndividual from './components/fichasindividuais/EmpresaFichaIndividual.vue'
import VueSingleSelect from './components/VueSingleSelect.vue'
import "./toast";

//inscricoes
import InscricaoEvento from './components/inscricoes/InscricaoEvento.vue'
import tableInqueritos from "./components/tablecomponents/tableInqueritos";
import ResponderInquerito from "./components/Inqueritos/ResponderInquerito";
Vue.use(VueRouter);
Vue.use(require('vue-moment'));


//event bus
export const bus = new Vue();
//axios
export const axios = require("axios")

Vue.config.productionTip = false

import vueResource from 'vue-resource'
Vue.use(vueResource)



Vue.component('TopBar', TopBar);
Vue.component('LoginScreen', LoginScreen);
Vue.component('ChangePassword', ChangePassword);
Vue.component('AllPersonsTable', AllPersonsTable);
Vue.component('RegistarApoio', RegistarApoio);
Vue.component('RegistarEvento', RegistarEvento);
Vue.component('EventsTablesMenu', EventsTablesMenu);
Vue.component('EventoFichaIndividual', EventoFichaIndividual);
Vue.component('FormNovoParticipante', FormNovoParticipante);
Vue.component('FormAddPalestraSimposio', FormAddPalestraSimposio);
Vue.component('PessoaFichaIndividual', PessoaFichaIndividual);
Vue.component('FormAddRespostaInquerito', FormAddRespostaInquerito);
Vue.component('RegistarDonativo', RegistarDonativo);
Vue.component('RegistarEmpresa', RegistarEmpresa);
Vue.component('AllEmpresasTable', AllEmpresasTable);
Vue.component('FormNovoEmpresario', FormNovoEmpresario);
Vue.component('EmpresaFichaIndividual', EmpresaFichaIndividual);
Vue.component('EditarApoio', EditarApoio);
Vue.component('EditarPessoa', EditarPessoa);
Vue.component('EditarEvento', EditarEvento);
Vue.component('EditarEmpresa', EditarEmpresa);
Vue.component('PersonsTablesMenu', PersonsTablesMenu);
Vue.component('AllStaffTable', AllStaffTable);
Vue.component('AllAmigoSocioTable', AllAmigoSocioTable);
Vue.component('AllEmpresarioTable', AllEmpresarioTable);
Vue.component('AllOradorTable', AllOradorTable);
Vue.component('AllParticipanteTable', AllParticipanteTable);
Vue.component('RelatorioStatsInquerito', RelatorioStatsInquerito);
Vue.component('RelatorioGlobalBase', RelatorioGlobalBase);
Vue.component('RelatorioNumeroEventosTipo', RelatorioNumeroEventosTipo);
Vue.component('RelatorioTopsPublico', RelatorioTopsPublico);
Vue.component('RelatorioTopsOradores', RelatorioTopsOradores);
Vue.component('RelatorioTopsEmpresario', RelatorioTopsEmpresario);
Vue.component('RelatorioHistoricoParticipantes', RelatorioHistoricoParticipantes);
Vue.component('RelatorioListasEmailsTelefones', RelatorioListasEmailsTelefones);
Vue.component('RegistarPessoa', RegistarPessoa);
Vue.component('RegistarPresencasPalestra', RegistarPresencasPalestra);
Vue.component('RegistoCriacaoInscricaoEvento',RegistoCriacaoInscricaoEvento);
Vue.component('FormInscricoesEvento',FormInscricoesEvento);
Vue.component('RegistarPagamentoInscricao',RegistarPagamentoInscricao);
Vue.component('FormAddInquerito',FormAddInquerito);
Vue.component('vue-single-select', VueSingleSelect);
Vue.component('tableInqueritos',tableInqueritos);
Vue.component('InqueritosTablesMenu',InqueritosTablesMenu);
Vue.component('ResponderInquerito',ResponderInquerito);
Vue.component('RespostasInqueritoTable',RespostasInqueritoTable);

//componente "móvel"
Vue.component("PanelComponent");




//router
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/reset/:token', component: ChangePassword},
        { path: '/inscricaoEvento/:token',component:InscricaoEvento },
        { path: '/', component: Index},
        {path:'/inquerito/:token',component:ResponderInquerito}

    ]
});
/* eslint-disable no-new */
new Vue({
  router,
  template: '<router-view/>'
}).$mount('#app')
