import React from "react";
import Button from "@mui/material/Button";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log in with Google
      </Button>
    </div>
  );
}

export default Login;
