import { Product } from "@/lib/types/product";
import React from "react";
import Slider from "react-slick";
import ProductCardTwo from "./products/ProductCardTwo";


interface PopupProps {
  products: Product[];
}

const ProductSlider = ({ products }: PopupProps) => {


  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],


  };


  return (
    <>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index}>
            <ProductCardTwo product={product} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ProductSlider;