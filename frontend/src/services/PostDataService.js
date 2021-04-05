import http from "../../http-common";

class PostDataService {
  getAll(page) {
    return http.get(`/posts?page=${page}`);
  }

  getById(id) {
    return http.get(`/posts/${id}`);
  }

  create(data) {
    return http.post("/posts", data);
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }
}

export default new PostDataService();
