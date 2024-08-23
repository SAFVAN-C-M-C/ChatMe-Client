/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { SelectFileModal } from "../modals/CreatePostModals/SelectFileModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CreatePostModal } from "../modals/CreatePostModals/CreatePostModal";
import SearchModal from "../modals/Search/SearchModal";
import { IChat, IMessage } from "@/types/IChat";
import { useChatContext } from "@/context/ChatContext";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NotificationModal from "../modals/Notificaiton/NotificationModal";
import { INotification } from "@/redux/reducers/notification/notification";
import CreateJobModal from "../modals/CreateJobModals/CreateJobModal";
type NavigationOptionsProps = {
  value: string[];
  title: string;
  shrink: boolean;
};
type HandleOptionClick = (
  event: React.MouseEvent<HTMLDivElement>,
  option: string
) => void;

const NavigationOptions: React.FC<NavigationOptionsProps> = ({
  title,
  value,
  shrink,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );
  //post creations states
  const { myChats } = useChatContext();
  const [openSelectFileModal, setOpenSelectFileModal] =
    useState<boolean>(false);
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [openCreatePostModal, setOpenCreatePostModal] =
    useState<boolean>(false);
  const [openCreateJobModal, setOpenCreateJobModal] = useState<boolean>(false);

  const [preview, setPreview] = useState<string | undefined>(
    profile?.data.theme === "dark"
      ? "/general/drag_img_bg_dr.png"
      : "/general/drag_img_bg.png"
  );
  const [file, setFile] = useState<File | null>(null);

  const [unReadChats, setUnReadChats] = useState(0);
  const [unReadNotification, setUnReadNotification] = useState(0);

  const getTotalUnread = (messages: IMessage[]) => {
    let count = 0;
    for (const message of messages) {
      if (!message.recieverSeen && message.receiverId === user?.data._id) {
        count++;
      }
    }
    return count;
  };
  const getTotalUnreadNotification = (notifications: INotification[]) => {
    let count = 0;
    for (const notification of notifications) {
      if (!notification.read) {
        count++;
      }
    }
    setUnReadNotification(count);
  };
  const getTotalUnreadChats = (chats: IChat[]) => {
    let count = 0;
    for (const chat of chats) {
      if (getTotalUnread(chat.messages) > 0) {
        count++;
      }
    }
    setUnReadChats(count);
  };
  useEffect(() => {
    if (myChats && myChats?.length > 0) {
      getTotalUnreadChats(myChats);
    }
  }, [myChats]);
  useEffect(() => {
    if (notifications?.data && notifications.data.length > 0) {
      getTotalUnreadNotification(notifications.data);
    }
  }, [notifications?.data.length, notifications?.data]);

  const navigate = useNavigate();

  //notification part
  const [openNotificationModal, setOpenNotificationModal] =
    useState<boolean>(false);

  const handleOptionClick: HandleOptionClick = (event, option) => {
    event.preventDefault();
    if (title === "Create Post") {
      setOpenSelectFileModal(true);
      return;
    }
    if (title === "Notification") {
      setOpenNotificationModal(true);
      return;
    }
    if (title === "Search") {
      setOpenSearchModal(!openSearchModal);
      return;
    }
    if (title === "Create Job Post") {
      setOpenCreateJobModal(!openCreateJobModal);
      return;
    }
    navigate(`${option}`);
  };

  return (
    <>
      {openSearchModal ? (
        <SearchModal setOpenSearchModal={setOpenSearchModal} />
      ) : null}
      {openNotificationModal ? (
        <NotificationModal
          setOpenNotificationModal={setOpenNotificationModal}
        />
      ) : null}
      {openCreateJobModal ? (
        <CreateJobModal setOpenCreateJobModal={setOpenCreateJobModal} />
      ) : null}
      {openCreatePostModal && file ? (
        <CreatePostModal
          file={file}
          setFile={setFile}
          setPreview={setPreview}
          setOpenCreatePostModal={setOpenCreatePostModal}
          setOpenSelectFileModal={setOpenSelectFileModal}
          preview={preview}
        />
      ) : openSelectFileModal ? (
        <SelectFileModal
          file={file}
          setFile={setFile}
          preview={preview}
          setPreview={setPreview}
          setOpenSelectFileModal={setOpenSelectFileModal}
          setOpenCreatePostModal={setOpenCreatePostModal}
        />
      ) : null}
      {title === "Create Job Post" ? (
        user?.data.accountType === "recruiter" ||
        user?.data.accountType === "company" ? (
          <div
            className="options cursor-pointer flex justify-center w-[90%] mt-2 mb-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700 rounded-lg"
            onClick={(e) => handleOptionClick(e, value[1])}
          >
            <div className="option-icon w-[40%] flex justify-center relative">
              <Icon icon={value[0]} width={26} height={26} />
            </div>
            <div
              className={
                shrink
                  ? "option-title w-[60%] text-base  justify-start hidden"
                  : "option-title w-[60%] text-base  justify-start hidden lg:flex"
              }
            >
              <b>{title}</b>
            </div>
          </div>
        ) : null
      ) : title === "My Application" ? (
        user?.data.accountType === "personal" ? (
          <div
            className="options cursor-pointer flex justify-center w-[90%] mt-2 mb-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700 rounded-lg"
            onClick={(e) => handleOptionClick(e, value[1])}
          >
            <div className="option-icon w-[40%] flex justify-center relative">
              <Icon icon={value[0]} width={26} height={26} />
            </div>
            <div
              className={
                shrink
                  ? "option-title w-[60%] text-base  justify-start hidden"
                  : "option-title w-[60%] text-base  justify-start hidden lg:flex"
              }
            >
              <b>{title}</b>
            </div>
          </div>
        ) : null
      ) : (
        <div
          className="options cursor-pointer flex justify-center w-[90%] mt-2 mb-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700 rounded-lg"
          onClick={(e) => handleOptionClick(e, value[1])}
        >
          <div className="option-icon w-[40%] flex justify-center relative">
            <Icon icon={value[0]} width={26} height={26} />
            {title === "Chat" && unReadChats > 0 ? (
              <div className="absolute inline-flex items-center justify-center w-[22px] h-[22px] text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 lg:end-5 dark:border-gray-900">
                {unReadChats}
              </div>
            ) : null}
            {title === "Notification" && unReadNotification > 0 ? (
              <div className="absolute inline-flex items-center justify-center w-[22px] h-[22px] text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -end-2 lg:end-5 dark:border-gray-900">
                {unReadNotification}
              </div>
            ) : null}
          </div>
          <div
            className={
              shrink
                ? "option-title w-[60%] text-base  justify-start hidden"
                : "option-title w-[60%] text-base  justify-start hidden lg:flex"
            }
          >
            <b>{title}</b>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationOptions;
