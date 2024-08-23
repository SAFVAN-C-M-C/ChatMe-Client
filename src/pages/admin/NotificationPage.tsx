import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import NavBar from "@/components/admin/NavBar";
import NotificationCard from "@/components/admin/Notification/NotificationCard";
import AddNotificationModal from "@/components/modals/CreateNotificationModal/AddNotificationModal";
import { INotification } from "@/redux/reducers/notification/notification";
import axios from "axios";
import { useEffect, useState } from "react";

const NotificationPage = () => {
  const [notification, setNotification] = useState<INotification[] | null>(
    null
  );
  const [openAddNotificationModal, setOpenAddNotificationModal] =
    useState<boolean>(false);
  const handleNewNotificationClick = () => {
    setOpenAddNotificationModal(true);
  };
  const getNotification = async () => {
    const res = await axios.get(`${URL}/notification/admin`, config);
    if (res.status === 200) {
      setNotification(res.data.data);
    }
  };
  useEffect(() => {
    getNotification();
  }, [notification?.length]);
  return (
    <>
      {openAddNotificationModal ? (
        <AddNotificationModal
          getNotification={getNotification}
          setOpenAddNotificationModal={setOpenAddNotificationModal}
        />
      ) : null}
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col ">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">
              System Notification
            </span>
          </div>
          <div className="new-notification">
            <div className="addNotification-btn mx-14">
              <div
                className="btn btn-primary"
                onClick={handleNewNotificationClick}
              >
                <span className="text-white">New Notification</span>
              </div>
            </div>
          </div>
          <div className="notification-grid mt-6  px-5 flex flex-wrap gap-2 h-auto justify-start w-full">
            {notification && notification.length > 0 ? (
              notification.map((notif, index) => (
                <NotificationCard
                  getNotification={getNotification}
                  key={index}
                  notification={notif}
                />
              ))
            ) : (
              <span>No notifications here</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
