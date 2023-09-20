import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const addProduct = async (body) => {
  const response = await axios.post(endPoints.products.addProducts, body, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(endPoints.products.deleteProduct(id));
  return response.data;
};

const updateProduct = async (id, body) => {
  const response = await axios.patch(endPoints.products.updateProducts(id), body, config);
  return response.data;
};

const addColor = async (body) => {
  const response = await axios.post(endPoints.colors.createColor, body, config);
  return response.data;
}

const updateColor = async (id, body) => {
  const response = await axios.patch(endPoints.colors.updateColor(id), body, config);
  return response.data;
}

const deleteColor = async (id) => {
  const response = await axios.delete(endPoints.colors.deleteColor(id));
  return response.data;
};

export { addProduct, deleteProduct, updateProduct, addColor, updateColor, deleteColor };
