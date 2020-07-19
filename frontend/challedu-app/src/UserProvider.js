import APIUtils from "./APIUtils";

export default class UserProvider {
  static async getUsers(access_token) {
    return await APIUtils.get("users/", access_token);
  }
  static async getUser(id, access_token) {
    return await APIUtils.get(`users/${id}`, access_token);
  }
  static async createUser(userData, access_token) {
    return await APIUtils.post("users/", userData, access_token);
  }
  static async updateUser(id, userData, access_token) {
    return await APIUtils.put(`users/${id}`, userData, access_token);
  }
  static async deleteUser(id, access_token) {
    return await APIUtils.delete(`users/${id}`, access_token);
  }
  static async loginUser(userData, access_token) {
    return await APIUtils.post(`auth/login/`, userData, access_token);
  }
}
