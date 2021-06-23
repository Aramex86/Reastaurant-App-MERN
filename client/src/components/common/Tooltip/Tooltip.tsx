import React, { FC } from "react";
import { useAppSelector } from "../../../Store/hooks/hooks";
import { isAuthUserSelector } from "../../../Store/slice/userSlice";

interface ToolltipType {
  text: string;
 
}

const Tooltip: FC<ToolltipType> = ({ text }) => {
    const auth = useAppSelector(isAuthUserSelector);
  return <div className={auth?' tooltip tooltip--show':'tooltip'}>{text}</div>;
};

export default Tooltip;
