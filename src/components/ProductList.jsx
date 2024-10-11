/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const ProductList = ({ session, updateSession }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/db.json');
        setProducts(response.data.products);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const updatedCart = [...session.cart, { productId: product.id, productName: product.name, quantity: 1 }];
      const updatedUser = { ...session, cart: updatedCart };
      
      updateSession(updatedUser);

      const response = await axios.get('/db.json');
      const users = response.data.users.map(user =>
        user.id === session.id ? updatedUser : user
      );

      await axios.post('/db.json', { users });

      setError('Product added to cart!');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error adding product to cart.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">Product List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id} className="mt-2">
            {product.name}
            <button onClick={() => addToCart(product)} className="bg-green-500 text-white p-2 ml-2">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
