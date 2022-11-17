import React from 'react';
import { useLocation } from 'react-router-dom';

import classes from './Checkout.css';


const Checkout = () => {
  const { state } = useLocation();
  let purchaseState = false;

  if(state) {
    // const { purchased: purchaseState } = state; 
    purchaseState = state.purchased || false;
  }
  
  let orders = (
    <div className={classes.Order}>
      <h3 className={classes.NotOrdered}>Please purchase some burgers!</h3>
    </div>
  );

  if (purchaseState) {
    orders = (
      <div className={classes.Order}>
        <h1>Order has been placed successfully</h1>
        <h3>Payment: <span className={classes.Cod}> Cash on delivery </span> </h3>
      </div>
    );
  }

  return orders;
}

export default Checkout;