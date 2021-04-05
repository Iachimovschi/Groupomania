import http from "../../http-common";

class AuthenticationDataService {
  createUser(data) {
    return http.post("/users/signup", data);
  }
  connectUser(data) {
    return http.post("/users/login", data);
  }
  getProfilUser(id) {
    return http.get(`/users/${id}`);
  }
  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new AuthenticationDataService();
