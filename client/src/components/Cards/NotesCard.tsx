import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks/hooks";
import {
  closePopup,
  deleteId,
  userNotesSelector,
} from "../../Store/slice/userSlice";
import { RiDeleteBin2Line } from "react-icons/ri";
import { NoteType } from "../../types/types";

const Note = ({ status, title, note, date, _id }: any) => {
  const dispatch = useAppDispatch();
  const [showNome, setShowNote] = useState<boolean>(false);

  const levelOfImportance = (status: string) => {
    switch (status) {
      case "higth":
        return "notecard--hight";
      case "medium":
        return "notecard--medium";
      case "normal":
        return "notecard--normal";
    }
  };

  const setIdOfDeletedNote = () => {
    dispatch(closePopup(true));
    dispatch(deleteId(_id));
  };

  return (
    <div className={`notecard ${levelOfImportance(status)}`} key={_id}>
      <div className="notecard__title" onClick={() => setShowNote(!showNome)}>
        <span>{title}</span> {date}
        <button className="btn btn--deletenote" onClick={setIdOfDeletedNote}>
          <RiDeleteBin2Line size={18} />
        </button>{" "}
      </div>
      {showNome && <div className="notecard__note">{note}</div>}
    </div>
  );
};

const NotesCard = () => {
  const notes = useAppSelector(userNotesSelector);

  const normal = [] as Array<NoteType>;
  const medium = [] as Array<NoteType>;
  const hight = [] as Array<NoteType>;

  notes.filter((note) => {
    if (note.status === "normal") normal.push(note);
    if (note.status === "medium") medium.push(note);
    if (note.status === "higth") hight.push(note);
  });

  return (
    <>
      <div className="hight">
        {hight.map(({ _id, status, title, note, date }) => (
          <Note
            status={status}
            title={title}
            note={note}
            date={date}
            _id={_id}
            key={_id}
          />
        ))}
      </div>
      <div className="normal">
        {normal.map(({ _id, status, title, note, date }) => (
          <Note
            status={status}
            title={title}
            note={note}
            date={date}
            _id={_id}
            key={_id}
          />
        ))}
      </div>
      <div className="medium">
        {medium.map(({ _id, status, title, note, date }) => (
          <Note
            status={status}
            title={title}
            note={note}
            date={date}
            _id={_id}
            key={_id}
          />
        ))}
      </div>
    </>
  );
};

export default NotesCard;
