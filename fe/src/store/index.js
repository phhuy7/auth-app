import Vue from 'vue';
import Vuex from 'vuex';

import authState from './auth/state';
import authMutations from './auth/mutations';
import authActions from './auth/actions';
import authGetters from './auth/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true, // Enable namespacing for the auth module
      state: authState,
      mutations: authMutations,
      actions: authActions,
      getters: authGetters,
    },
  },
});
