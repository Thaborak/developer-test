import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "./contexts/AuthContext";
import Login from "../src/components/common/Login";
import { useNavigate } from "react-router-dom";

function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {authState.isAuthenticated ? (
        <div style={{ padding: 20 }}>
          <h1>Welcome to the Google Drive File Viewer App</h1>
          <p>You are logged in.</p>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/files")}
            >
              Go to FileList
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ padding: 20 }}>
          <h1>Welcome to the Google Drive File Viewer App</h1>
          <p>You are not logged in.</p>
          <p>Please login to view your files.</p>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Home;
