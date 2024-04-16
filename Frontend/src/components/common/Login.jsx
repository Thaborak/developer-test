import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login("dummy-token");
    window.location.href =
      `${process.env.REACT_APP_API_BASE_URL}/google` ||
      "http://localhost:3001/google";
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
