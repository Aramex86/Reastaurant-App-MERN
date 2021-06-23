import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { useFormik } from "formik";
import { AddRestaurantType } from "../../types/types";
import { useAppDispatch } from "../../Store/hooks/hooks";
import { reqAddRest } from "../../Store/slice/restaurantSlice";

const AddRestaurantForm = () => {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState<any>();
  const formik = useFormik<AddRestaurantType>({
    initialValues: {
      name: "",
      address: "",
      cuisine_type: "",
      lat: "",
      lng: "",
      neighborhood: "",
      photo: undefined,
    },
    onSubmit: (values) => {
      dispatch(reqAddRest(values, photo));
    },
  });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    setPhoto(file[0]);
  };
  return (
    <div className="addrest-form">
      <h2 className="addrest-form-heading">Add your favorite palce</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="iamge">
          <AiOutlineCloudUpload size={24} />
          upload image
        </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          placeholder="image"
          className="form-image"
          onChange={handlePhoto}
          id="image"
          name="photo"
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          type="text"
          placeholder="neighborhood"
          name="neighborhood"
          onChange={formik.handleChange}
          value={formik.values.neighborhood}
        />
        <input
          type="text"
          placeholder="address"
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        <input
          type="text"
          placeholder="cuisine"
          name="cuisine_type"
          onChange={formik.handleChange}
          value={formik.values.cuisine_type}
        />
        <label>restaurant coordinates:</label>
        <input
          type="text"
          placeholder="lat"
          name="lat"
          onChange={formik.handleChange}
          value={formik.values.lat}
        />
        <input
          type="text"
          placeholder="lng"
          name="lng"
          onChange={formik.handleChange}
          value={formik.values.lng}
        />
        <button
          type="submit"
          className="btn  btn--addNoteForm btn--addNoteForm--addrest"
        >
          Add restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
