import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import OAuthCallback from "./OAuthCallback";
import FileList from "./FileList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Navigation links for easy access during development */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/files">Files</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/oauthcallback" element={<OAuthCallback />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home component for the root path
function Home() {
  return (
    <div>
      <h1>Welcome to the Google Drive File Viewer App</h1>
      <p>Please login to view your files.</p>
    </div>
  );
}

export default App;
