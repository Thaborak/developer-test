import React from "react";
import Header from "./components/layout/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/common/Login";
import Home from "./Home";
import OAuthCallback from "./pages/OAuthCallback";
import FileList from "./pages/FileList";
import { AuthProvider } from "./contexts/AuthContext";

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
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
