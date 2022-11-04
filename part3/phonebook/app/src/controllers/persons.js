import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = async () => {
  return axios
    .get(baseUrl) //
    .then((result) => result.data);
};

const create = async (newObject) => {
  return axios
    .post(baseUrl, newObject) //
    .then((result) => result.data);
};

const updateOne = async (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject) //
    .then((result) => result.data);
};

const deleteOne = async (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personController = {
  getAll,
  create,
  updateOne,
  deleteOne,
};

export default personController;
