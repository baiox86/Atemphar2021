import Vue from 'vue'
import VueRouter from 'vue-router'
import ChangePassword from './components/ChangePassword.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/ChangePassword', component: ChangePassword },
  { path: '/', component: Index}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


/*
export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/pessoas",
      name: "Pessoas",
      component: Index
    },
    {
      path: "/eventos",
      name: "Eventos",
      component: Index
    },
    {
      path: "/registar",
      name: "Registar",
      component: MenuRegistar
    },{
      path: "/relatorio",
      name: "Relatorio",
      component: Index
    },
  ]
}) */
