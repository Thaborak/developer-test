import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/files"); // Redirect to files listing page or dashboard
  }, [navigate]);

  return <div>Authenticating...</div>;
}

export default OAuthCallback;
