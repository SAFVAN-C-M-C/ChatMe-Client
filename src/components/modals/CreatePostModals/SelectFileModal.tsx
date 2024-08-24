/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  ThemeProvider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import toast from "react-hot-toast";
import CropModal from "../../crop/CropModal";
import { darkTheme, lightTheme } from "@/helper/theme";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface SelectFileModalProps {
  setOpenSelectFileModal: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  preview?: string;
  file: File | null;
  setOpenCreatePostModal: Dispatch<SetStateAction<boolean>>;
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export const SelectFileModal: React.FC<SelectFileModalProps> = ({
  setPreview,
  setFile,
  setOpenCreatePostModal,
  preview,
  file,
  setOpenSelectFileModal,
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  //local states

  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [openCrop, setOpenCrop] = useState(false);
  const handleClose = () => {
    setOpenSelectFileModal(false);
  };
  const handleNext = () => {
    if (!file) {
      toast.error("select a file");
      return;
    }
    if (
      file.type.split("/")[0] !== "video" &&
      file.type.split("/")[0] !== "image"
    ) {
      toast.error("select a valid file");
      return;
    }
    setOpenCreatePostModal(true);
  };

  const checkVideoDuration = (file: File) => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(file);
    videoElement.onloadedmetadata = () => {
      if (videoElement.duration > 60) {
        toast.error("Video should only less than 1 min");
        setFile(null);
        setPreview("/general/drag_img.png");
        setIsVideo(false);
        setOpenCrop(false);
      }
    };
  };
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type.split("/")[0] === "video") {
        setIsVideo(true);
        checkVideoDuration(file);
      } else {
        setIsVideo(false);
      }

      setFile(file);
      setPreview(URL.createObjectURL(file));
      if (file.type.split("/")[0] === "image") {
        setOpenCrop(true);
      }
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.split("/")[0] === "video") {
        setIsVideo(true);
        checkVideoDuration(file);
      } else {
        setIsVideo(false);
      }
      setFile(file);
      setPreview(URL.createObjectURL(file));
      if (file.type.split("/")[0] === "image") {
        setOpenCrop(true);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {openCrop ? (
        <CropModal
          avatarUrl={preview}
          setAvatarUrl={setPreview}
          setFile={setFile}
          setOpenCrop={setOpenCrop}
        />
      ) : (
        <>
          <ThemeProvider
            theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
          >
            <CssBaseline />
            <Dialog fullWidth={true} open onClose={handleClose}>
              <DialogTitle align="center">Select a file</DialogTitle>
              <DialogContent>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  {isDragActive ? (
                    <>
                      <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex justify-center">
                        <p>Ok now drop here 😀...</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
                        {!isVideo ? (
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
                    </>
                  )}
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*, video/*"
                      onChange={handleChange}
                    />
                  </Button>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleNext}>Next</Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </>
      )}
    </>
  );
};
