import axios from "axios";

const baseURL = "https://mobank-api.onrender.com/api/v1";

export default axios.create({
  baseURL,
});

export const privateAxios = axios.create({
  baseURL,
});
