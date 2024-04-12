import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you might want to call the backend to fetch the authentication state
    // or receive a confirmation that the user is logged in.
    // Then redirect to another page, or set user state accordingly.
    navigate("/files"); // Redirect to files listing page or dashboard
  }, [navigate]);

  return <div>Authenticating...</div>;
}

export default OAuthCallback;
