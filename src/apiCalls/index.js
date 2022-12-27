import axios from "axios";
import App from "../App";

export const postSignUp = async (data) => {
  const response = await axios({
    method: "POST",
    url: "https://webla-api.uc.r.appspot.com/api/v1/users/register",
    headers: {},
    data: {
      name: data.userName,
      email: data.email,
      password: data.password,
    },
  });
  return response;
};

export const postLogin = async (data) => {
  return await axios({
    method: "POST",
    url: "https://webla-api.uc.r.appspot.com/api/v1/users/login",
    headers: {},
    data: data,
  });
};

export const loadProducts = async () => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  return await axios({
    method: "GET",
    url: "https://webla-api.uc.r.appspot.com/api/v1/products",
    headers: {
      "X-Authorization": `Bearer ${token}`,
    },
  });
};

export const addProductToCart = async (data) => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  const cart_id = localStorage.getItem("ECOMM_CART_ID");
  return await axios({
    method: "POST",
    url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cart_id}`,
    headers: {
      "X-Authorization": `Bearer ${token}`,
    },
    data: data,
  });
};

export const loadCartProducts = async () => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  const cart_id = localStorage.getItem("ECOMM_CART_ID");
  return await axios({
    method: "GET",
    url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cart_id}`,
    headers: {
      "X-Authorization": `Bearer ${token}`,
    },
  });
};

export const removeCartItem = async (id) => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  const cart_id = localStorage.getItem("ECOMM_CART_ID");
  return await axios({
    method: "DELETE",
    url: `https://webla-api.uc.r.appspot.com/api/v1/carts/${cart_id}/remove/${id}`,
    headers: {
      "X-Authorization": `Bearer ${token}`,
    },
  });
};
