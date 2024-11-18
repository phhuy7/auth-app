export default {
    isAuthenticated: !!localStorage.getItem('jwtToken'), // Check token on initial load
  };
  