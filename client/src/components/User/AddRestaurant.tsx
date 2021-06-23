import React from "react";
import AddRestaurantForm from "../AddRestaurantForm/AddRestaurantForm";
import SideMenu from "./SideMenu";

const AddRestaurant = () => {
  return (
    <div className="addres-wrapp">
      <SideMenu />
      <AddRestaurantForm />
    </div>
  );
};

export default AddRestaurant;
