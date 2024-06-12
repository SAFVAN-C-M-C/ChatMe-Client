/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateName, validateYear } from "../../helper/validate";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../redux/actions/user/profileActions";

interface AddExperienceProps{
    setOpenAddExperience: Dispatch<SetStateAction<boolean>>;
}
const AddExperience:React.FC<AddExperienceProps> = ({setOpenAddExperience}) => {
    const { error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
      const handleClose = () => {
        setOpenAddExperience(false);
      };
      useEffect(() => {
        if (error) {
          toast.error(error);
        }
      }, [error]);
      const handleSubmit=(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        if(!validateName(formJson.nameOfinstitue)){
            toast.error("Enter a valid name");
            return;
        }
        if(!validateName(formJson.position)){
            toast.error("Enter a valid Position");
            return;
        }
        if(!validateYear(formJson.startYear)){
            toast.error("Enter a valid Year");
            return;
        }
        if(formJson.endYear){
            if(!validateYear(formJson.endYear) && formJson.endYear.toLowerCase()!=="present" ){
                toast.error("Enter a valid Years");
                return;
            }
        }
        dispatch(addExperience(formJson))
        if(!error){
            toast.success("Expierience added")
            handleClose();
        }
        
      }
  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit

        }}
      >
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add you Experience realated Data. Note that this will show in your profile.
            
          </DialogContentText>
          <TextField
          
            autoFocus
            required
            margin="dense"
            id="nameOfinstitue"
            name="nameOfinstitue"
            label="Name of Institute"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
         
            autoFocus
            required
            margin="dense"
            id="position"
            name="position"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
          /><TextField
          
          autoFocus
          required
          margin="dense"
          id="startYear"
          name="startYear"
          label="Starting Year"
          type="text"
          variant="standard"
        />
        <TextField
        sx={{
            ml:2
        }}
        
          autoFocus
          
          margin="dense"
          id="endYear"
          name="endYear"
          label="Ending Year"
          type="text"
          variant="standard"
        />     
        <p className="text-xs text-red-500">
        Note: if your curently under the course please enter present as end year
        </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExperience;
