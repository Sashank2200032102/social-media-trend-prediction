import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Backend FastAPI URL
});

export const predictTrend = async (text) => {
  const res = await API.post("/predict", { text });
  return res.data;
};
