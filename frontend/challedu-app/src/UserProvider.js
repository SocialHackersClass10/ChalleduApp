import APIUtils from "./APIUtils";

export default class UserProvider {
  static async getRejectedUsers(accessToken) {
    return await APIUtils.get("users/?state=Rejected", accessToken);
  }
  static async getPendingUsers(accessToken) {
    return await APIUtils.get("users/?state=Pending", accessToken);
  }
  static async getUsers(accessToken) {
    return await APIUtils.get("users/", accessToken);
  }
  static async getUser(id, accessToken) {
    return await APIUtils.get(`users/${id}`, accessToken);
  }
  static async createUser(userData, accessToken) {
    return await APIUtils.post("users/", userData, accessToken);
  }
  static async updateUser(userData, accessToken) {
    return await APIUtils.put("users/", userData, accessToken);
  }
  static async deleteUser(id, accessToken) {
    return await APIUtils.delete(`users/${id}`, accessToken);
  }
  static async loginUser(userData) {
    return await APIUtils.post(`auth/login/`, userData);
  }
}
