import axios from "axios";
const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8082/conventions/",
});

export default instance;