import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Librería para íconos
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <Link to="/cart" style={{display: totalQuantity() === 0 ? 'none' : 'block' ,color:'black'}}><FaShoppingCart size={24} /></Link>
      <span style={{display: totalQuantity() === 0 ? 'none' : 'block' ,color:'black'}} >{totalQuantity()}</span>
      
    </div>
  );
};

export default CartWidget;
