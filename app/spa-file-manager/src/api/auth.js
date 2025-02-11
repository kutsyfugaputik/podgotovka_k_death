import axios from "axios";

const API_URL = "https://your-api.com";  // Укажи реальный адрес API

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};
