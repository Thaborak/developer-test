import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { getFiles, downloadFile, previewFile } from "../services/apiService";

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
`;

const initialState = {
  files: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_FILES_SUCCESS":
      return {
        ...state,
        files: action.payload,
        error: null,
      };
    case "FETCH_FILES_ERROR":
      return {
        ...state,
        files: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

function FileList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { files, error } = state;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getFiles();
        dispatch({ type: "FETCH_FILES_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FILES_ERROR", payload: error });
      }
    };

    fetchFiles();
  }, []);

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
          {error ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="body2" color="error" align="center">
                  Error fetching files: {error.message}
                </Typography>
              </TableCell>
            </TableRow>
          ) : files.length > 0 ? (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  {file.thumbnailLink ? (
                    <Thumbnail
                      src={file.thumbnailLink}
                      alt={`${file.name} thumbnail`}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Typography variant="body2">No Preview</Typography>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => previewFile(file.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => downloadFile(file.id)}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
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
