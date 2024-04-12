import React from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import OAuthCallback from "./OAuthCallback";
import FileList from "./FileList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/oauthcallback" element={<OAuthCallback />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Google Drive File Viewer App</h1>
      <p>Please login to view your files.</p>
    </div>
  );
}

export default App;
