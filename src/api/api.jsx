import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getProdutos = async () => {
  const response = await axios.get(`${API_URL}/api/produtos`);
  return response.data;
};

export const createProduto = async (produto) => {
  const response = await axios.post(`${API_URL}/api/produtos`, produto);
  return response.data;
};

export const updateProduto = async (id, produto) => {
  const response = await axios.put(`${API_URL}/api/produtos/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id) => {
  const response = await axios.delete(`${API_URL}/api/produtos/${id}`);
  return response.data;
};

export const getCategorias = async () => {
  const response = await axios.get(`${API_URL}/api/categorias`);
  return response.data;
};

export const getProdutosWithCategory = async () => {
  const response = await axios.get(`${API_URL}/api/produtos/with-category`);
  return response.data;
};

export const createCategoria = async (categoria) => {
  const response = await axios.post(`${API_URL}/api/categorias`, categoria);
  return response.data;
};

export const updateCategoria = async (id, categoria) => {
  const response = await axios.put(`${API_URL}/api/categorias/${id}`, categoria);
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/api/categorias/${id}`);
  return response.data;
};