import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToCart,
  loadCartProducts,
  loadProducts,
  removeCartItem,
} from "../apiCalls";
import Header from "./Header";

import CartView from "./CartView";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await loadProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message, {
        type: "error",
        theme: "colored",
      });
    }
  };

  const handleAddCart = async (id) => {
    var flag = 0;
    cart.forEach((item) => {
      if (item.id == id) {
        toast("Already added to Cart", {
          type: "warning",
          theme: "colored",
        });
        flag = 1;
      }
    });
    if (flag == 1) return;

    try {
      const response = await addProductToCart({
        id: id,
        quantity: 1,
      });
      const message = response?.data?.message;
      toast(message, {
        type: "success",
        theme: "colored",
      });
      fetchCartProducts();
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message, {
        type: "error",
        theme: "colored",
      });
    }
  };
  const fetchCartProducts = async () => {
    try {
      const response = await loadCartProducts();
      setCart(response.data);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message, {
        type: "error",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartProducts();
  }, []);

  return (
    <>
      <Header count={cart.length}></Header>
      <div className="rows">
        {products.map((product) => {
          console.log(product);
          return (
            <table style={{ border: "1px solid black" }} key={product.id}>
              <tbody>
                <tr>
                  <td className="image">
                    <img
                      src={product.images?.[0]}
                      alt="logo"
                      width={300}
                      height={300}
                    />
                  </td>
                  <td className="secondcol">
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <button
                      onClick={() => {
                        handleAddCart(product.id);
                      }}
                      className="btn btn-primary"
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="thirdcol">
                    <h3>${product.price}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
