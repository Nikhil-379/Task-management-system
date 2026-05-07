import axios from "axios";

const API = axios.create({

  baseURL:
    "https://task-management-system-production-88e3.up.railway.app/api",

});

export default API;