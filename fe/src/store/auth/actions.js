export default {
    login({ commit }, token) {
      localStorage.setItem('jwtToken', token); // Store token in local storage
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
  };
  