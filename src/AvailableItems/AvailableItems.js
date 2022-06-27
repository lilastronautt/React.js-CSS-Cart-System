import CartContext from "../store/CartContext";
import React, { useContext } from "react";
import Card from "../UI/Card";
import "./AvailableItems.css";

const AvailableItems = () => {
  const ctx = useContext(CartContext);

  return (
    <Card className="list-container">
      <div className="intro">Available Items</div>
      {ctx.data.map((item) => {
        const onAddItem = () => {
          ctx.addItem(item.id);
        };
        const onDeleteItem = () => {
          ctx.removeItem(item.id);
        };
        return (
          <div class="list">
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
        );
      })}
    </Card>
  );
};

export default AvailableItems;
