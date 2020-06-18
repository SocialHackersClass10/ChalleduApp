
import APIUtils from "./APIUtils"

export default class UserProvider {
  static async getUsers() {
    APIUtils.get('users/')
  }
  static async getUser(id) {
    APIUtils.get(`users/${id}`);
  }
  static async createUser(userData) {
    APIUtils.post('users/', userData );
  }
  static async updateUser(userData) {
    APIUtils.put('users/', userData );
  }
  static async deleteUser(id) {
    APIUtils.delete(`users/${id}`);
  }
}


