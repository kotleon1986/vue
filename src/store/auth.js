import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    }
  },

  actions: {
    async login({ dispatch }, data) {
      let response = await axios.post("auth/login", data);
      return dispatch("attempt", response.data.data.token);
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return false;
      }

      try {
        let response = await axios.get("auth/me");

        commit("SET_USER", response.data.data.user);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    }
  }
};
