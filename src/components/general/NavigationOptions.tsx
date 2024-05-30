import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
type NavigationOptionsProps = {
    value:string[];
    title:string
}
type HandleOptionClick = (event: React.MouseEvent<HTMLDivElement>, option: string) => void;


const NavigationOptions = (props:NavigationOptionsProps) => {
  const navigate=useNavigate();

  const handleOptionClick: HandleOptionClick = (event, option) => {
    event.preventDefault();
    navigate(`${option}`)
  };
  return (
    <>
      <div className="options cursor-pointer flex justify-center w-[90%] mt-4 mb-4" onClick={(e)=>handleOptionClick(e,props.value[1])}>
        <div className="option-icon w-[40%] flex justify-center">
          <Icon icon={props.value[0]} width={26} height={26} />
        </div>
        <div className="option-title w-[60%] text-base  justify-start hidden lg:flex">
          <b>{props.title}</b>
        </div>
      </div>
    </>
  );
};

export default NavigationOptions;
