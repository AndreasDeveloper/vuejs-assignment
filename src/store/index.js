/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fields: [],
  },
  mutations: {
    update_fields(state, data) {
      state.fields = data;
      localStorage.setItem('fields', JSON.stringify(data));
    },
  },
  actions: {
    getFields() {
      const data = JSON.parse(localStorage.getItem('fields') || []);
      return data;
    },
    setFields({ commit }, data) {
      commit('update_fields', data);
    },
  },
  modules: {
  },
});
