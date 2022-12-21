import api from "./api";

export default {
  login(params) {
    return api.post('/api/login', params);
  },

  logout() {
    return api.delete('/api/logout');
  }
};
