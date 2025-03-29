import React, { useState } from "react";
import Slider, { Settings } from "react-slick";

interface SingleProductSliderProps {
  product?: {
    slug: string;
    imgAlt?: string;
    thumbnail?: {
      url: string;
    };
    images?: Array<{
      url: string;
    }>;
    demoVideo?: string;
  };
}

const SingleProductSlider = ({ product }: SingleProductSliderProps) => {
  const [navSlider, setNavSlider] = useState<Slider | null>(null);
  const [mainSlider, setMainSlider] = useState<Slider | null>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties | null>(null);

  if (!product || !product.thumbnail || !product.images) {
    return <div>Product details are not available.</div>;
  }

  const { thumbnail, images, imgAlt, slug, demoVideo } = product;
  const productImages = [thumbnail.url, ...images.map((image) => image.url)];

  const mainSliderSettings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: navSlider,
    ref: (slider) => setMainSlider(slider),
  };

  const navSliderSettings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: mainSlider,
    dots: false,
    arrows: true,
    focusOnSelect: true,
    ref: (slider) => setNavSlider(slider),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    image: string
  ) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${image})`,
      backgroundPosition: `${x}% ${y}%`,
      display: "block",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle(null); // Hide zoom effect
  };




  return (
    <div className="single-pro-slider sticky top-0 p-4 border border-gray-200 rounded-2xl max-w-lg mx-auto">
      {/* Main Product Slider */}
      <div className="single-product-cover relative">
        <Slider {...mainSliderSettings}>
          {demoVideo && (
            <div className="single-slide overflow-hidden relative w-full aspect-square">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center rounded-t-2xl"
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {productImages.map((image, index) => (
            <div
              key={index}
              className="single-slide rounded-t-2xl overflow-hidden relative"
              onMouseMove={(e) => handleMouseMove(e, image)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="w-full h-full object-cover object-center rounded-t-2xl"
                src={image}
                alt={index === 0 ? imgAlt || "Product Image" : `${slug}-${index + 1}`}
              />
              {zoomStyle && (
                <div
                  className="zoom-overlay"
                  style={{
                    ...zoomStyle,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "200%", // Adjust zoom level
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              )}
            </div>
          ))}
        </Slider>

      </div>

      {/* Thumbnail Navigation Slider */}
      <div className="single-nav-thumb w-full mt-4">
        <Slider {...navSliderSettings}>
          {demoVideo && (
            <div key="video-thumb" className="single-slide px-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-24 object-cover object-center rounded-lg"
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {productImages.map((image, index) => (
            <div key={index} className="single-slide px-2">
              <img
                className="w-full h-24 object-cover object-center border border-transparent hover:border-gray-300 rounded-lg cursor-pointer"
                src={image}
                alt={`${slug}-thumb-${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SingleProductSlider;
