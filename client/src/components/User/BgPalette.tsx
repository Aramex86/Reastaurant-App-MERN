import React, { useEffect, FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  reqUserBg,
  reqUserSelectBg,
  userBgSelector,
} from "../../Store/slice/backgroundSlice";
import { reqUserSelectedBg } from "../../Store/slice/userSlice";

type PropsType = {
  showPallete: boolean;
  settingBg: () => void;
};

const BgPalette: FC<PropsType> = ({ showPallete, settingBg }) => {
  const dispatch = useAppDispatch();
  const bgPlallete = useAppSelector(userBgSelector);

  let { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(reqUserBg());
  }, []);

  const handleClick = (_id: string) => {
    const selected = bgPlallete.find((bg) => bg._id === _id);
    console.log("SEND", selected);
    if (selected) dispatch(reqUserSelectedBg(id, selected));
    settingBg();
  };

  return (
    <>
      {showPallete ? (
        <div className="bgpallete">
          {bgPlallete.map(({ _id, bg }: any) => (
            <div
              key={_id}
              className="bg__type"
              style={{ background: `url(${bg}) center/cover` }}
              onClick={() => handleClick(_id)}
            ></div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default BgPalette;
