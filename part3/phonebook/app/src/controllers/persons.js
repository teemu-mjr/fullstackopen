import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = async () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

const update = async (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

const deleteOne = async (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const personController = {
  getAll,
  create,
  update,
  deleteOne,
};

export default personController;
