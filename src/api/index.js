import axios from "axios";

export const instance = axios.create({
  baseURL: "https://heliverse-backend-x959.onrender.com",
  withcredentials: true,
  headers: {
    "content-type": "application/json",
  },
});
