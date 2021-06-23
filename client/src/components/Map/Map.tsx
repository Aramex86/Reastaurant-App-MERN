import React, { FC } from "react";
import { MY_API } from "../../api/api";

interface CoodsType {
  lat: number;
  lng: number;
}

interface LatLng {
  latlng: CoodsType;
}

const Map: FC<LatLng> = ({ latlng }) => {

  const { lat, lng } = latlng;
  let url = `https://www.google.com/maps/embed/v1/place?key=${MY_API}&q=${lat},${lng}`;


  return (
    <div>
      <iframe
        title="map"
        width="100%"
        height="330"
        allowFullScreen={true}
        loading="lazy"
        src={url}
        style={{ border: "0" }}
      />
    </div>
  );
};

export default Map;

//
