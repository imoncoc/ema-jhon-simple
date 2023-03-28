import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
  // const cart = props.cart; // Option 1
  // const {cart} = props;  // Option 2

  let totalPrice = 0, totalShipping = 0, quantity = 0;
  for(const product of cart){
    product.quantity = product.quantity || 1;
    
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = totalPrice * 7 / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h4>Order Summery</h4>
      <p>Selected Item: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Shipping: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand Total: ${grandTotal.toFixed(2)} </h6>
    </div>
  );
};

export default Cart;