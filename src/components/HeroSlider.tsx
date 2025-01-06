import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';



interface ArrowProps {
    onClick: MouseEventHandler; 
}

// Custom arrow components
const NextArrow = ({ onClick }:ArrowProps) => (
    <button
        onClick={onClick}
        className="next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-5"
    >
        <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);

const PrevArrow = ({ onClick }:ArrowProps) => (
    <button
        onClick={onClick}
        className="prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-5"
    >
        <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);



const HeroSlider = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        nextArrow: <NextArrow onClick={() => {}} />,  
        prevArrow: <PrevArrow onClick={() => {}} />,
        autoplay: true,
        autoplaySpeed: 5000,
        autoHeight: true,
        // fade: true,              
    };

    const fail = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "https://via.placeholder.com/1900x545.png?text=1900*545";
    };

    return (
        <>
            <div className="slider-container relative">
                <Slider {...settings}>
                    <div>
                        <Image
                            src="/img/hero/slider1.webp"
                            alt="Print-Hutt-Slider-1"
                            className="w-full"
                            width={1900}
                            height={545}
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/1900x545.png?text=1900*545"
                            onError={fail}
                        />
                    </div>
                    <div>
                        <Image
                            src="/img/hero/slider2.webp"
                            alt="Print-Hutt-Slider-2"
                            className="w-full"
                            width={1900}
                            height={545}
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/1900x545.png?text=1900*545"
                        />
                    </div>
                    <div>
                        <Image
                            src="/img/hero/slider3.webp"
                            alt="Print-Hutt-Slider-3"
                            className="w-full"
                            width={1900}
                            height={545}
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/1900x545.png?text=1900*545"
                        />
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default HeroSlider