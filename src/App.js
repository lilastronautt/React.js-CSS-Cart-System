import AvailableItems from "./AvailableItems/AvailableItems";
import CartItem from "./Cart/Cart";
import CartContext from "./store/CartContext";
import { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

const App = () => {
  const data = [
    { name: "Sushi", price: 15.5, totalAmount: 0, id: "c1", amount: 0 },
    { name: "Lasagna", price: 25.5, totalAmount: 0, id: "c2", amount: 0 },
    { name: "Pie", price: 5.5, totalAmount: 0, id: "c3", amount: 0 },
    { name: "Cake", price: 45.5, totalAmount: 0, id: "c4", amount: 0 },
  ];
  const [cart, setCart] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(data);
  const [showCart, setShowCart] = useState(false);

  const addItem = (id) => {
    let flag = false;
    for (const item of cart) {
      if (item.id === id) {
        const newCart = cart.filter((item) => item.id !== id);
        item.amount++;
        item.totalAmount += item.price;
        setCart((prev) => [item, ...newCart]);
        flag = true;
      }
    }
    if (flag) return;

    for (const item of dataAvailable) {
      if (item.id === id) {
        item.amount++;
        item.totalAmount += item.price;
        setCart((prev) => [item, ...prev]);
      }
    }
  };

  const removeItem = (id) => {
    for (const item of cart) {
      if (item.id === id) {
        const newCart = cart.filter((item) => item.id !== id);
        if (item.amount > 1) {
          item.amount--;
          item.totalAmount -= item.price;
          setCart((prev) => [item, ...newCart]);
        } else {
          item.amount--;
          item.totalAmount -= item.price;
          setCart((prev) => newCart);
        }
      }
    }
  };

  const onClickHandler = () => {
    setShowCart(true);
  };

  const onCloseCartHandler = (val) => {
    setShowCart(val);
  };

  const [item, setItem] = useState(0);
  const getItemHandler = (val) => {
    setItem(val);
  };

  return (
    <CartContext.Provider
      value={{
        data: dataAvailable,
        cartData: cart,
        totalItemCart: item,
        addItem: addItem,
        removeItem: removeItem,
      }}
    >
      <AvailableItems></AvailableItems>
      {showCart &&
        ReactDOM.createPortal(
          <CartItem
            closeCart={onCloseCartHandler}
            getItem={getItemHandler}
          ></CartItem>,
          document.getElementById("cart")
        )}
      <div class="form-actions">
        <button onClick={onClickHandler}>{`Cart (${item})`}</button>
      </div>
    </CartContext.Provider>
  );
};

export default App;
