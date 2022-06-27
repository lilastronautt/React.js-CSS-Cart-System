import React from "react";

const CartContext = React.createContext({
  data: "",
  cartData: [],
  totalItemCart: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
