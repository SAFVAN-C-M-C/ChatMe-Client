/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";

import CropIcon from "@mui/icons-material/Crop";
import { useState } from "react";
import Cropper from "react-easy-crop";
import React, { Dispatch, SetStateAction } from "react";
import getCroppedImg, { PixelCrop } from "./util/cropImage";
interface CropModalProps {
  avatarUrl?: string;
  // formData:FormData
  setOpenCrop: Dispatch<SetStateAction<boolean>>;
  setAvatarUrl: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
}
const CropModal: React.FC<CropModalProps> = ({
  avatarUrl,
  setOpenCrop,
  setAvatarUrl,
  setFile,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCropperdAreaPixels] = useState<PixelCrop | null>(
    null
  );
  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCropperdAreaPixels(croppedAreaPixels);
  };

  const zoomPercent = (value: any) => `${Math.round(value * 100)}`;

  const cropImage = async () => {
    try {
      const result = await getCroppedImg(
        String(avatarUrl),
        croppedAreaPixels,
        rotation
      );
      setAvatarUrl(String(result?.url));
      setFile(result?.file);
      // if(result?.file)formData.append("avatar",result.file)
      setOpenCrop(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open>
        <DialogContent
          dividers
          sx={{
            background: "#333",
            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 500 },
          }}
        >
          <Cropper
            image={avatarUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box>
              <Typography>Zoom: {zoomPercent(zoom)}</Typography>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom as number)}
              />
            </Box>
            <Box>
              <Typography>Rotation: {rotation}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation as number)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
            >
              Crop
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CropModal;
