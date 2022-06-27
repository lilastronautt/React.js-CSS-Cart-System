import { useContext } from "react";
import CartContext from "../store/CartContext";
import Card from "../UI/Card";
import "./Cart.css";
import "../AvailableItems/AvailableItems.css";

const CartItem = (props) => {
  const ctx = useContext(CartContext);
  const onCloseCart = () => {
    props.closeCart(false);
  };
  let sum = 0;
  let items = 0;
  ctx.cartData.forEach((item) => (sum += item.totalAmount));
  ctx.cartData.forEach((item) => (items += item.amount));
  props.getItem(items);

  return (
    <>
      <div className="backdrop" onClick={onCloseCart}></div>
      <Card className="cart-container">
        <div className="intro">CartItems</div>
        {ctx.cartData.length === 0 ? (
          <div className="empty">Cart is Empty :((((</div>
        ) : (
          ""
        )}
        {ctx.cartData.map((item) => {
          const onAddItem = () => {
            ctx.addItem(item.id);
          };
          const onDeleteItem = () => {
            ctx.removeItem(item.id);
          };

          return (
            <>
              <div className="list" key={item.id}>
                <div className="list-info">
                  <h3>{item.name}</h3>
                  <h4>${item.price}</h4>
                </div>
                <div className="list-data">
                  <label>Amount</label>
                  <input type="number" value={item.amount} />
                  <div className="list-actions">
                    <button onClick={onAddItem}>+</button>
                    <button onClick={onDeleteItem}>-</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div className="evaluation-container">
          <div>
            <h3>Total Amount : ${sum}</h3>
            <h3>Total Items: {items}</h3>
          </div>
          <div className="cart-actions">
            <button onClick={onCloseCart}>Okay</button>
            <button>Order</button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CartItem;
