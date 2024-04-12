import React from "react";

function Login() {
  const handleLogin = () => {
    // Redirects the user to the backend OAuth URL
    window.location.href = "http://localhost:3001/auth/google";
  };

  return <button onClick={handleLogin}>Log in with Google</button>;
}

export default Login;
