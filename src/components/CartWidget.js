import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Librería para íconos

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <FaShoppingCart size={24} />
      <span>3</span>
    </div>
  );
};

export default CartWidget;
