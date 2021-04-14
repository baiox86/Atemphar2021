import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted,{
    position: "bottom-center",
    duration: 5000,
    type: "info"
});
Vue.toasted.register('error', 'Error!', {
    type: 'error',
})

