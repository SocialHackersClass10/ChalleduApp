import APIUtils from "./APIUtils";

export default class UserProvider {
  static async getUsers() {
    return await APIUtils.get("users/");
  }
  static async getUser(id) {
    return await APIUtils.get(`users/${id}`);
  }
  static async createUser(userData) {
    return await APIUtils.post("users/", userData);
  }
  static async updateUser(userData) {
    return await APIUtils.put("users/", userData);
  }
  static async deleteUser(id) {
    return await APIUtils.delete(`users/${id}`);
  }
}
