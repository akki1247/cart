// src/components/SignIn.jsx
import { useState } from 'react';
import axios from 'axios';
import '../index.css';

// eslint-disable-next-line react/prop-types
const SignIn = ({ setSession }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user exists
      const response = await axios.get('http://localhost:5000/users', {
        params: { email }
      });

      const user = response.data.find(user => user.email === email);

      if (user) {
        // Check if the password matches
        if (user.password === password) {
          setSession(user); // Set the session with user data
          setError('');
        } else {
          setError('Invalid password');
        }
      } else {
        // If the user does not exist, create a new user
        const newUser = { name, email, password, mobile };
        const createUserResponse = await axios.post('http://localhost:5000/users', newUser);
        setSession(createUserResponse.data); // Set the session with the new user data
        setError('');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Mobile No:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
