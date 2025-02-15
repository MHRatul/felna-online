import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5001/auth/google';
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
