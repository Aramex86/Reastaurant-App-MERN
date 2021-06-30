export const imageType = (image: string) => {
  if (image.startsWith("https")) {
    return <img src={image} alt="..." />;
  } else {
    return <img src={`/restaurants/${image}`} alt="..." />;
  }
};
