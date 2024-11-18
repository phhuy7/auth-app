export default {
    login(state) {
      state.isAuthenticated = true; // Update state to logged in
    },
    logout(state) {
      state.isAuthenticated = false; // Update state to logged out
      localStorage.removeItem('jwtToken'); // Clear token
    },
  };
  