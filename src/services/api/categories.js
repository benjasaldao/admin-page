import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const addCategory = async (body) => {
  const response = await axios.post(endPoints.categories.addCategory, body, config);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(endPoints.categories.deleteCategory(id));
  return response.data;
};

const updateCategory = async (id, body) => {
  const response = await axios.patch(endPoints.categories.updateCategory(id), body, config);
  return response.data;
};

export { addCategory, deleteCategory, updateCategory };
