import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: auto;
`;

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
        // Handle errors as appropriate for your application
      }
    };

    fetchFiles();
  }, []);

  const handlePreview = (fileId) => {
    window.open(`http://localhost:3001/files/preview/${fileId}`, '_blank');
  };

  const handleDownload = (fileId) => {
    window.open(`http://localhost:3001/files/download/${fileId}`, '_blank');
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="file list">
        <TableHead>
          <TableRow>
            <TableCell>Preview</TableCell>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.length > 0 ? (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {file.thumbnailLink ? (
                    <Thumbnail src={file.thumbnailLink} alt={`${file.name} thumbnail`}  referrerpolicy="no-referrer"/>
                  ) : (
                    <Typography variant="body2">No Preview</Typography>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handlePreview(file.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDownload(file.id)}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="body2" color="textSecondary" align="center">
                  No files found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default FileList;
