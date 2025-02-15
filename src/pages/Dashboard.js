import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <h2>Please login</h2>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="Profile" />
      <p>Email: {user.email}</p>
      <h3>Your Services</h3>
      {/* Show services here */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
