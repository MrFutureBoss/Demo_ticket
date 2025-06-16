import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-TICKET-API-KEY": "GSXQRPT0L9GJTC9ll1klqaTJuqb22wf7",
  },
  baseURL: "https://intranet.cennext.com/api",
});

export default api;