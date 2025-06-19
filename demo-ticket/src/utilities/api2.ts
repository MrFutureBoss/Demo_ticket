import axios from "axios";

const api2 = axios.create({
  baseURL: "http://localhost:9999/api",
});

export default api2;