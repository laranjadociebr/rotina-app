import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.12.5:5155/api"
});

export default api;