import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL;


const API_URL = process.env.REACT_APP_API_URL;


export const cautaProduse = async (termen) => {
  const res = await axios.get(`${API_BASE}/products/search/${encodeURIComponent(termen)}`);
  return res.data;
};


export const getAllProduse = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
