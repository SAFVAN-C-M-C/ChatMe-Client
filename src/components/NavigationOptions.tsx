import { Icon } from "@iconify/react";
type NavigationOptionsProps = {
    icon:string;
    title:string
}
const NavigationOptions = (props:NavigationOptionsProps) => {
  return (
    <>
      <div className="options flex justify-center w-[80%] mt-4 mb-4">
        <div className="option-icon w-[40%] flex justify-center">
          <Icon icon={props.icon} width={26} height={26} />
        </div>
        <div className="option-title w-[60%] text-lg flex justify-start hidden lg:flex">
          <b>{props.title}</b>
        </div>
      </div>
    </>
  );
};

export default NavigationOptions;
