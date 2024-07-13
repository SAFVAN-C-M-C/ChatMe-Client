import { Dialog, DialogContent, DialogTitle} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


  interface NotificationModalProps {
    setOpenNotificationModal: Dispatch<SetStateAction<boolean>>;
  }
  const NotificationModal: React.FC<NotificationModalProps> = ({ setOpenNotificationModal }) => {

    const {notifications}=useSelector((state:RootState)=>state.notification)
    const handleClose = () => {
        setOpenNotificationModal(false);
    };


    return (
      <>
        <Dialog
          open
          onClose={handleClose}
          // PaperProps={{
          //   component: "form",
          //   onSubmit: handleSubmit
  
          // }}
        >
          <DialogTitle align="center" fontWeight={700}>
            Notifications
          </DialogTitle>
          <DialogContent>
            <div className="w-[300px] lg:w-[400px] h-[75vh] overflow-y-auto overflow-x-hidden  flex flex-col">
              {
                notifications && notifications.data.length>0?
                notifications.data.map((notification,index)=>(<Notification key={index} notification={notification}/>)):(<span>No notification here to show</span>)
              }
                
              
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default NotificationModal;
  