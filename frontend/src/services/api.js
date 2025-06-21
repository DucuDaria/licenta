import axios from 'axios';
import { db } from './firebase';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
const API_BASE = process.env.REACT_APP_API_URL;

const API_URL = process.env.REACT_APP_API_URL;


export const saveSearch = async (uid, searchTerm) => {
  try {
    await addDoc(collection(db, "searchHistory"), {
      uid,
      term: searchTerm,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("Eroare la salvarea căutării:", e);
  }
};

export const cautaProduse = async (termen) => {
  const res = await axios.get(`${API_BASE}/products/search/${encodeURIComponent(termen)}`);
  return res.data;
};

export const getSearchHistory = async (uid) => {
  const q = query(
    collection(db, "searches"),
    where("uid", "==", uid),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};



export const getAllProduse = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data;
};