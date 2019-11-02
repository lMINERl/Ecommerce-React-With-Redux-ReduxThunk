import axios from "axios";
import accessToken from "../db/localStorage";
import baseURL from "../db/database";

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL || `http://localhost:3000`,
//     headers: { Authorization: localStorage.getItem('token') }
// });

const productAPI = {
  // returns the value of (v) where as v.data contains the full product details
  getProductById(productId) {
    const token = accessToken.authorization();
    return axios.get(`${baseURL}/products/${productId}`, {
      headers: { authorization: token }
    });
  },
  // returns an Array of products value (v) where as (v) contains direct list of products
  getAllProducts() {
    const token = accessToken.authorization();
    // debugger;
    return axios.get(`${baseURL}/products/`, {
      headers: { authorization: token }
    });
  },
  // returns  product value of (v) where as (v) contains product
  deleteProduct(productId) {
    const token = accessToken.authorization();
    return axios.delete(`${baseURL}/products/${productId}`, {
      headers: { authorization: token }
    });
  },
  addProduct(product) {
    const token = accessToken.authorization();
    return axios.post(`${baseURL}/products/`, product, {
      headers: { authorization: token }
    });
  }
};

export default productAPI;
