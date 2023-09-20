import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const addUser = async (body) => {
  const response = await axios.post(endPoints.users.addUser, body, config);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(endPoints.users.deleteUser(id));
  return response.data;
};

const updateUser = async (id, body) => {
  const response = await axios.patch(endPoints.users.updateUser(id), body, config);
  return response.data;
};

export { addUser, deleteUser, updateUser };
