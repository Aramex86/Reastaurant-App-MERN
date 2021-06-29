import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  authUserSelector,
  closePopUpSelector,
  reqGetUserNote,
  reqUserAvatar,
  reqUserPhoto,
  userAvatarSelector,
  userSelectedBgSelector,
} from "../../Store/slice/userSlice";
import SideMenu from "./SideMenu";

import { BsPencil, BsUpload } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { useParams } from "react-router";
import BgPalette from "./BgPalette";
import {
  reqUserSelectBg,
  userBgSelSelector,
} from "../../Store/slice/backgroundSlice";
import NotesCard from "../Cards/NotesCard";
import AddNote from "./AddNote";
import Popup from "../common/Popup";

const Profile = () => {
  let { id }: { id: string } = useParams();
  const authUser = useAppSelector(authUserSelector);
  const avatar = useAppSelector(userAvatarSelector);
  const selectedBg = useAppSelector(userBgSelSelector);
  const closePop = useAppSelector(closePopUpSelector);
  const dispatch = useAppDispatch();
  const [showPallete, setShowPallete] = useState(false);
  const [putBg, setPutBg] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);

  useEffect(() => {
    dispatch(reqUserAvatar(id));
  }, []);
  useEffect(() => {
    dispatch(reqUserSelectBg(id));
    dispatch(reqGetUserNote(id));
  }, []);

  const { color, bgimage } = selectedBg;
  const { name, lastname, email, image } = authUser;
  const init = authUser.name ? name.slice(0, 1) : "";

  console.log(avatar);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    if (file) {
      dispatch(reqUserPhoto(file[0], id));
    }
  };

  const handalePallete = () => {
    setShowPallete(!showPallete);
  };
  const settingBg = () => {
    setPutBg(true);
    setTimeout(() => {
      window.location.reload();
      setPutBg(false);
    }, 1000);
  };

  const handleAddNote = () => {
    setShowAddNote(true);
  };
  return (
    <div
      className="profile-wrapp"
      style={{
        background: `url(${bgimage}) center/cover`,
        color: `${color}`,
      }}
    >
      {putBg ? (
        <div className="setBg">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      <button className="btn btn--profile__settings" onClick={handalePallete}>
        <AiFillSetting size="20" fill={selectedBg ? color : "#000"} />
      </button>
      <BgPalette showPallete={showPallete} settingBg={settingBg} />
      <SideMenu />
      <div className="profile-wrapp__pic">
        {!image ? (
          <div className="noImg">{init}</div>
        ) : (
          <div className="img">
            <img src={avatar} alt="name" />
          </div>
        )}
        <label htmlFor="image__upload">
          <BsUpload size="24" />
        </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handlePhoto}
          name="avatar"
          id="image__upload"
        />
      </div>
      <div className="info-wrap">
        <div className="info-wrap__name">
          <span>First Name:</span>
          {name} <BsPencil size="12" />
        </div>
        <div className="info-wrap__lastname">
          <span>Last Name:</span>
          {lastname} <BsPencil size="12" />
        </div>
        <div className="info-wrap__email">
          <span>Email:</span>
          {email} <BsPencil size="12" />
        </div>
      </div>
      <div className="notes-wrapp">
        {closePop ? <Popup text="Are you sure ?" /> : null}
        {showAddNote && <AddNote setShowAddNote={setShowAddNote} />}
        <div className="notes-wrapp__menu">
          <h3>notes</h3>
          <button className="btn btn--addnote" onClick={handleAddNote}>
            Add note <BiMessageSquareAdd />
          </button>
        </div>
        <div className="notes-wrapp__card">
          <NotesCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
