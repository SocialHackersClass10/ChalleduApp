
import APIUtils from "./APIUtils";

export default class NGOProvider {
  static async getRejectedNGOs(accessToken) {
    return await APIUtils.get("ngos/?state=Rejected", accessToken);
  }
  static async getPendingNGOs(accessToken) {
    return await APIUtils.get("ngos/?state=Pending", accessToken);
  }
  static async getNGOs(accessToken) {
    return await APIUtils.get("ngos/", accessToken);
  }
  static async getRejectedNGO(id, accessToken) {
    return await APIUtils.get(`ngos/${id}/?state=Rejected`, accessToken);
  }
  static async getPendingNGO(id, accessToken) {
    return await APIUtils.get(`ngos/${id}/?state=Pending`, accessToken);
  }
  static async getNGO(id, accessToken) {
    return await APIUtils.get(`ngos/${id}`, accessToken);
  }
  static async createNGO(data, accessToken) {
    return await APIUtils.post("ngos/", data, accessToken);
  }
  static async updateNGO(id, data, accessToken) {
    return await APIUtils.put(`ngos/${id}`, data, accessToken);
  }
  static async deleteNGO(id, accessToken) {
    return await APIUtils.delete(`ngos/${id}`, accessToken);
  }
}

