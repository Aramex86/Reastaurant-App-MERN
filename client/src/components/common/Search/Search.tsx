import React, { useState } from "react";
import { useAppDispatch } from "../../../Store/hooks/hooks";
import { fiterRest } from "../../../Store/slice/restaurantSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    dispatch(fiterRest(value));
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Search for restaurants..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
