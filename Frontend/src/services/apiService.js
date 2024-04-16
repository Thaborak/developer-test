import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Define the base URL for your API

const getFiles = async () => {
  const response = await axios.get(`${API_BASE_URL}/files`);
  return response.data;
};

const downloadFile = (fileId) => {
  window.open(`${API_BASE_URL}/files/download/${fileId}`, "_blank");
};

const previewFile = (fileId) => {
  window.open(`${API_BASE_URL}/files/preview/${fileId}`, "_blank");
};

export { getFiles, downloadFile, previewFile };
