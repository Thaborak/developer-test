import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function OAuthCallback() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate getting the token from the OAuth callback
    const token = "dummy-oauth-token";
    login(token);

    // Redirect to the files page
    navigate("/");
  }, [login, navigate]);

  return <div>Loading...</div>;
}

export default OAuthCallback;
