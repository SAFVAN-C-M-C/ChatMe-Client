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
import { getSignedUrl } from "@/services";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocket } from "@/context/SocketContext";
import { config } from "@/common/configurations";
import { URL as serverUrl } from "@/common/api";
import { useChatContext } from "@/context/ChatContext";
import { IChat } from "@/types/IChat";
import { darkTheme, lightTheme } from "@/helper/theme";
interface SelectMediaProps {
  chat: IChat | null;
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
  chat,
  setOpenSelectMediaModal,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { socket } = useSocket();
  const { getChat, addNewMessage } = useChatContext();
  //local states
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined | null>(
    "/general/drag_img.png"
  );

  const [isVideo, setIsVideo] = useState<boolean>(false);
  const handleClose = () => {
    setOpenSelectMediaModal(false);
  };
  const handleNext = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    const type =
      file.type.split("/")[0] === "video"
        ? "mp4"
        : file.type.split("/")[0] === "image"
        ? "jpeg"
        : file.type.split("/")[0] === "application"
        ? "pdf"
        : "jpg  ";
    const signedUrl: { url: string; media: string } = await getSignedUrl(
      "message",
      type
    );
    const { url, media } = signedUrl;

    // Ensure the correct Content-Type is used
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type":
          file.type.split("/")[0] === "image"
            ? "image/jpeg"
            : file.type.split("/")[0] === "video"
            ? "video/mp4"
            : file.type.split("/")[0] === "application"
            ? "application/pdf"
            : "image/jpeg", // Use the file's MIME type
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      try {
        const receiverId = chat?.participants?.filter(
          (val: string | undefined) => val !== user?.data._id
        )[0];
        const formData = new FormData();
        formData.append(
          "media",
          `https://s3.ap-south-1.amazonaws.com/bucket.chatme.use/${media}`
        );
        formData.append(
          "type",
          file.type.split("/")[0] === "video"
            ? "video"
            : file.type.split("/")[0] === "image"
            ? "image"
            : file.type.split("/")[0] === "application"
            ? "doc"
            : "image"
        );
        formData.append("receiverId", String(receiverId));
        formData.append("chatId", String(chat?._id));

        const res = await axios.post(
          `${serverUrl}/chat/message`,
          formData,
          config
        );
        if (res.status === 200) {
          getChat(String(chat?._id));
          addNewMessage(res.data.data);
          if (socket) {
            socket.emit("newMessage", {
              obj: res.data.data,
              chatId: chat?._id,
            });
          } else {
            console.error("Socket not connected yet, cannot emit message.");
          }
          handleClose();
        }
      } catch (error: any) {
        console.error("Some thing went wrong", error.message);
      }
    }
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
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
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
                    accept="image/*, video/*,file/pdf"
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
    </>
  );
};
