import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/google";
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
