import Vuex from 'vuex'
import counter from './counter'
import home from './modules/home';
import getters from './getters';
export default new Vuex.Store({
  modules: {
    counter,
    home
  },
  // getters
})