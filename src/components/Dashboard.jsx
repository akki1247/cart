/* eslint-disable react/prop-types */
//import React from 'react';
import '../index.css';


const Dashboard = ({ session }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">Welcome, {session.username}</h2>
      <h3 className="text-xl mt-4">Your Cart:</h3>
      <ul>
        {session.cart.map(item => (
          <li key={item.productId}>
            {item.productName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
