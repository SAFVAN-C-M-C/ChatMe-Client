import {
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { darkTheme, lightTheme } from "@/helper/theme";
import NothingHere from "@/components/general/NothingHere";

interface NotificationModalProps {
  setOpenNotificationModal: Dispatch<SetStateAction<boolean>>;
}
const NotificationModal: React.FC<NotificationModalProps> = ({
  setOpenNotificationModal,
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );
  const handleClose = () => {
    setOpenNotificationModal(false);
  };

  return (
    <>
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog open onClose={handleClose}>
          <DialogTitle align="center" fontWeight={700}>
            Notifications
          </DialogTitle>
          <DialogContent>
            <div className="w-[300px] lg:w-[400px] h-[75vh] overflow-y-auto overflow-x-hidden  flex flex-col">
              {notifications && notifications.data.length > 0 ? (
                notifications.data.map((notification, index) => (
                  <Notification key={index} notification={notification} />
                ))
              ) : (
                <NothingHere />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default NotificationModal;
