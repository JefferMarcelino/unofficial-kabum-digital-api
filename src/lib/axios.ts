import axios from "axios";

const api = axios.create({
  baseURL: "https://kabum.digital"
});

export default api;
