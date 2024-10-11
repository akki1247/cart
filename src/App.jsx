import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import './index.css';

const App = () => {
  const [session, setSession] = useState(null);

  const handleLogout = () => {
    setSession(null);
  };

  return (
    <Router>
      <Navbar session={session} handleLogout={handleLogout} />
      <Routes>
      <Route path="/signin" element={<SignIn setSession={setSession} />} />
        <Route path="/login" element={<Login setSession={setSession} />} />
        <Route path="/dashboard" element={session ? <Dashboard session={session} /> : <Login setSession={setSession} />} />
        <Route path="/products" element={session ? <ProductList session={session} updateSession={setSession} /> : <Login setSession={setSession} />} />
      </Routes>
    </Router>
  );
};

export default App;
