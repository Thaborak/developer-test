import React, { useState, useEffect } from "react";
import axios from "axios";

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  return (
    <div>
      <h1>Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
