import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  closePopup,
  deleteNote,
  idDeleteNote,
  reqDeleteNote,
} from "../../Store/slice/userSlice";

type PropsType = {
  text: string;
};

const Popup: FC<PropsType> = ({ text }) => {
  const dispatch = useAppDispatch();
  const idForDelete = useAppSelector(idDeleteNote);
  const { id }: { id: string } = useParams();
  const deleteNotes = () => {
    dispatch(reqDeleteNote(idForDelete, id));
  };

  return (
    <div className="popup">
      <div className="popup-text">{text}</div>
      <div className="popup-btn-wrap">
        <button onClick={deleteNotes} className="btn btn--popup">
          Yes
        </button>
        <button
          onClick={() => dispatch(closePopup(false))}
          className="btn btn--popup"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Popup;
