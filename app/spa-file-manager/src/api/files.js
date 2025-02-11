import axios from "axios";

const API_URL = "https://your-api.com";

export const getFiles = (token) => {
  if (!token) throw new Error("Token is undefined");
  return axios.get(`${API_URL}/files`, { headers: { Authorization: `Bearer ${token}` } });
};

export const uploadFile = (token, file) => {
  if (!token) throw new Error("Token is undefined");
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  });
};

export const deleteFile = (token, fileId) => {
  if (!token) throw new Error("Token is undefined");
  return axios.delete(`${API_URL}/files/${fileId}`, { headers: { Authorization: `Bearer ${token}` } });
};
