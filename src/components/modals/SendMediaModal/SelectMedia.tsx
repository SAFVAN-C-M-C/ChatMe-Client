/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    
    DialogTitle,
    
    styled,
  } from "@mui/material";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
  import { useDropzone } from "react-dropzone";
  
  import toast from "react-hot-toast";
  import CropModal from "../../crop/CropModal";
  interface SelectMediaProps {
    setOpenSelectMediaModal: Dispatch<SetStateAction<boolean>>;
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
  export const SelectMedia: React.FC<SelectMediaProps> = ({


    setOpenSelectMediaModal,
  }) => {
    //local states
    const [file,setFile]=useState<File |null>(null)
    const [preview,setPreview]=useState<string | undefined |null>("/general/drag_img.png")
    
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [openCrop, setOpenCrop] = useState(false);
    const handleClose = () => {
        setOpenSelectMediaModal(false);
    };
    const handleNext=()=>{
toast.success("next")

    }
  
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
      console.log(file);
  
      if (file) {
        if (file.type.split("/")[0] === "video") {
          setIsVideo(true);
          checkVideoDuration(file);
        }else{
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
        }else{
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

      
          <>
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
                            src={String(preview)}
                            alt="draging"
                          />
                        ) : (
                          <video
                            controls
                            muted
                            preload="auto"
                            className="w-[300px] h-[300px] object-cover"
                            src={String(preview)}
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
          </>
      
      </>
    );
  };
  