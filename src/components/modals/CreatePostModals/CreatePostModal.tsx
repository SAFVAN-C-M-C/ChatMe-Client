/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface CreatePostModalProps {
  file: File;
  setOpenSelectFileModal: Dispatch<SetStateAction<boolean>>;
  preview?: string;
  setOpenCreatePostModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  file,
  setOpenCreatePostModal,
  setOpenSelectFileModal,
  preview,
}) => {
  const handleClose = () => {
    setOpenCreatePostModal(false);
  };

  return (
    <>
      <Dialog fullWidth={true} open onClose={handleClose}>
        <DialogTitle align="center">Create New Post</DialogTitle>
        <DialogContent>
          <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
            {file.type.split("/")[0] !== "video" ? (
              <img
                className="w-[300px] h-[300px] object-contain"
                src={preview}
                alt="draging"
              />
            ) : (
              <video
                controls
                muted
                preload="auto"
                className="w-[300px] h-[300px] object-cover"
                src={preview}
              ></video>
            )}
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            placeholder="Enter a good caption"
            label="Enter a Caption"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
