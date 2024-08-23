/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { FC } from "react";

interface ControlsProps {}
const Controls: FC<ControlsProps> = () => {
  return (
    <>
      <div className="dropdown dropdown-end absolute right-2">
        <div tabIndex={0} role="button" className=" m-1">
          <Icon className="" icon="cil:options" width={26} height={26} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl"
        >
          <li>
            <span>
              <Icon icon="tdesign:view-list" width={26} height={26} />
              View Applications
            </span>
          </li>
          <li>
            <span>
              <Icon icon="ic:outline-edit" width={26} height={26} />
              Edit
            </span>
          </li>
          <li>
            <span>
              <Icon icon="material-symbols:delete" width={26} height={26} />
              Delete{" "}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Controls;
