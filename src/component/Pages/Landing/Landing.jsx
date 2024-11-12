import React from "react";
import LayOut from "../../LayOut/LayOut";
import CarouselBg from "../../Carousel/CarouselBg.jsx";
import Category from "../../Category/Category.jsx";
import Products from "../../Product/Products.jsx";

function Landing() {
  return (
    <LayOut>
      <CarouselBg />
      <Category />
      <Products />
    </LayOut>
  );
}

export default Landing;
