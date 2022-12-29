import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToCart,
  loadCartProducts,
  removeCartItem,
} from "../apiCalls";
import Header from "./Header";

const CartView = (props) => {
  const [cartInfo, setCartInfo] = useState([]);
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cartInfo.map((item) => (ans += item.price * item.quantity));
    setPrice(ans);
  };

  const handleQuantity = (product, d) => {
    var quantity = 1;

    if (d == -1 && product.quantity == 1) {
      handleRemoveItem(product.id);
      return;
    }
    cartInfo.forEach((item) => {
      if (item.id == product.id) {
        quantity = product.quantity + d;
        handleRemoveItem(product.id);
        setTimeout(() => {
          handleAddItem(product.id, quantity);
        }, 500);
      }
    });
    console.log(`removed ${product.id}`);
  };

  const handleAddItem = async (id, quantity) => {
    try {
      await addProductToCart({
        id: id,
        quantity: quantity,
      });

      console.log(`added quantity ${quantity}`);

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

  const handleRemoveItem = async (id) => {
    try {
      await removeCartItem(id);

      fetchCartProducts();
    } catch (error) {
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
      setCartInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);
  useEffect(() => {
    handlePrice();
  }, [cartInfo]);
  return (
    <div style={{ backgroundColor: "#ffffe6", height: "100vh" }}>
      <Header count={cartInfo.length}></Header>
      <h1 style={{ marginTop: "65px" }}>My Cart</h1>
      <div className="rows">
        <table border={2}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total amount</th>
            </tr>
          </thead>
          {cartInfo.map((product) => {
            return (
              <tbody className="table_data" key={product.id}>
                <tr>
                  <td>{product.title}</td>
                  <td className="thirdcol">
                    <strong className="price">${product.price}</strong>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleQuantity(product, -1);
                      }}
                    >
                      -
                    </button>
                    <span style={{ margin: "5px" }}>{product.quantity}</span>
                    <button
                      onClick={() => {
                        handleQuantity(product, 1);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <strong className="price">
                      ${product.price * product.quantity}
                    </strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleRemoveItem(product.id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="tot_price">
        <h3>Total Price : </h3>
        <h3>${price}</h3>
      </div>
      <div>
        <button className="btn btn-primary">Make Payment</button>
      </div>
    </div>
  );
};

export default CartView;
