import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { SelectFileModal } from "../modals/CreatePostModals/SelectFileModal";
import { useState } from "react";
import { CreatePostModal } from "../modals/CreatePostModals/CreatePostModal";
type NavigationOptionsProps = {
  value: string[];
  title: string;
};
type HandleOptionClick = (
  event: React.MouseEvent<HTMLDivElement>,
  option: string
) => void;

const NavigationOptions: React.FC<NavigationOptionsProps> = ({
  title,
  value,
}) => {
  //post creations states

  const [openSelectFileModal, setOpenSelectFileModal] =useState<boolean>(false);
  const [openCreatePostModal, setOpenCreatePostModal] =useState<boolean>(false);
  const [preview, setPreview] = useState<string | undefined>("/general/drag_img.png");
  const [file, setFile] = useState<File  | null>(null);








  const navigate = useNavigate();

  const handleOptionClick: HandleOptionClick = (event, option) => {
    event.preventDefault();
    if (title === "Create Post") {
      setOpenSelectFileModal(true);
      return;
    }
    navigate(`${option}`);
  };

  return (
    <>
      {openCreatePostModal && file ? (
        <CreatePostModal file={file} setFile={setFile} setPreview={setPreview} setOpenCreatePostModal={setOpenCreatePostModal} setOpenSelectFileModal={setOpenSelectFileModal} preview={preview}/>
      ):openSelectFileModal ? (
        <SelectFileModal file={file} setFile={setFile} preview={preview} setPreview={setPreview}  setOpenSelectFileModal={setOpenSelectFileModal} setOpenCreatePostModal={setOpenCreatePostModal} />
      ) : null}
      <div
        className="options cursor-pointer flex justify-center w-[90%] mt-4 mb-4"
        onClick={(e) => handleOptionClick(e, value[1])}
      >
        <div className="option-icon w-[40%] flex justify-center">
          <Icon icon={value[0]} width={26} height={26} />
        </div>
        <div className="option-title w-[60%] text-base  justify-start hidden lg:flex">
          <b>{title}</b>
        </div>
      </div>
    </>
  );
};

export default NavigationOptions;
