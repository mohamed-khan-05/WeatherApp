import axios from "axios";

const api = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  headers: {
    Authorization: `Bearer 4e03909d73d64155a33111639252101`,
    "Content-Type": "application/json",
  },
});

export default api;
