import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const addOrder = async (body) => {
  const response = await axios.post(endPoints.orders.addOrder, body, config);
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(endPoints.orders.deleteOrder(id), config);
  return response.data;
};

const addItem = async (body) => {
    const response = await axios.post(endPoints.orders.addItem, body, config);
    return response.data;
}

const removeItem = async (body) => {
    const response = await axios.post(endPoints.orders.removeItem, body, config);
    return response.data;
}

const updateOrderProduct = async (id, body) => {
  const response = await axios.patch(endPoints.orders.updateOrderProduct(id), body, config);
  return response.data;
}

export { addOrder, deleteOrder, removeItem, addItem, updateOrderProduct };
