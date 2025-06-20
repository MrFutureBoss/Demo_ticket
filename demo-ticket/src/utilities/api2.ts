import axios from "axios";

const api2 = axios.create({
  //Dev port
  // baseURL: "http://localhost:9999/api",
  //Prod port
  baseURL: "https://demo-ticket.onrender.com/api/",
});

export default api2;