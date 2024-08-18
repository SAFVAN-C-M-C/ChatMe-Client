import { deleteResume } from "@/redux/actions/user/profileActions";
import { AppDispatch, RootState } from "@/redux/store";
import { IResumes } from "@/types/IProfile";
import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface ExperienceProps {
  data: IResumes;
}
const Resumes: React.FC<ExperienceProps> = ({ data }) => {
    const { profile } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete=()=>{
        dispatch(deleteResume({id:String(data._id)}))
    }
  return (
    <>
      <span className={`flex gap-2 items-center p-3 ${profile?.data.theme==="dark"?"bg-gray-700":"bg-gray-300"} w-auto rounded-md`}>
        <span>{data.name}</span>
        <Icon onClick={handleDelete} className="cursor-pointer" icon={"material-symbols:delete"} width={20} height={20}/>
      </span>
    </>
  );
};

export default Resumes;
