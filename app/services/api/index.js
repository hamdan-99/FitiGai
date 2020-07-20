import axios from "axios";
import queryString from "query-string";

/**
 * API
 */

class API {
  static init() {
    this.headers = { "Content-type": "application/json" };
    this.baseUrl = `${process.env.REACT_APP_API_URL}v1/`;
  }

  static setToken(token) {
    if (!this.headers) {
      throw new Error("No headers in API instance");
    }
    this.headers.authorization = token;
  }

  static get(endPoint, params = {}, query = {}) {
    let queryUrl = "";
    if (Object.keys(query).length > 0) {
      queryUrl += `?${queryString.stringify(query)}`;
    }

    return axios({
      method: "get",
      url: `${this.baseUrl}${endPoint}${queryUrl}`,
      headers: this.headers,
    });
  }

  static post(endPoint, data = {}) {
    return axios({
      method: "post",
      url: `${this.baseUrl}${endPoint}`,
      headers: this.headers,
      data,
    });
  }

  static put(endPoint, data = {}) {
    return axios({
      method: "put",
      url: `${this.baseUrl}${endPoint}`,
      headers: this.headers,
      data,
    });
  }

  static delete(endPoint, data = {}) {
    return axios({
      method: "delete",
      url: `${this.baseUrl}${endPoint}`,
      headers: this.headers,
      data,
    });
  }
}

API.init();

export default API;
