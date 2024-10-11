import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// eslint-disable-next-line react/prop-types
const Login = ({ setSession }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get('/db.json');
      const users = response.data.users;

      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        setError('Invalid credentials.');
        return;
      }

      setSession(user);
      navigate('/dashboard');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error logging in.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mt-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2">Login</button>
    </div>
  );
};

export default Login;
