import React, { FC } from "react";
import { useFormik } from "formik";
import { AddNoteType, NoteType } from "../../types/types";
import { useAppDispatch } from "../../Store/hooks/hooks";
import { reqAddUserNote } from "../../Store/slice/userSlice";
import { useParams } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

const validate = (values: AddNoteType) => {
  const error = {} as AddNoteType;

  if (!values.title) {
    error.title = "required";
  } else if (values.title.length > 25) {
    error.title = "To long...";
  }

  return error;
};

type PropsType = {
  setShowAddNote: (ac: boolean) => void;
};

const AddNote: FC<PropsType> = ({ setShowAddNote }) => {
  let { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const formik = useFormik<AddNoteType>({
    initialValues: {
      status: "",
      title: "",
      note: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(reqAddUserNote(id, values));
      formik.resetForm();
      setShowAddNote(false);
    },
  });
  return (
    <div className="add-notewrapp">
      <button
        className="btn btn--colsenote"
        onClick={() => setShowAddNote(false)}
      >
        <RiCloseFill />
      </button>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option value=" " label="Select level">
            {" "}
          </option>
          <option value="normal" label="normal">
            {" "}
          </option>
          <option value="medium" label="medium">
            {" "}
            important
          </option>
          <option value="higth" label="hight">
            {" "}
            important
          </option>
        </select>
        <input
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="write title..."
        />
        {formik.errors.title ? (
          <div className="addnote-error">{formik.errors.title}</div>
        ) : null}
        <textarea
          name="note"
          onChange={formik.handleChange}
          value={formik.values.note}
          placeholder="put some notes..."
        />

        <button type="submit" className="btn btn--addNoteForm">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNote;
