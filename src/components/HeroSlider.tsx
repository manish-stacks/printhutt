import Image from 'next/image';
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick/lib/slider';


// Custom arrow components
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-10"
    >
        <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-10"
    >
        <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);



const HeroSlider = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 2500,
        autoHeight: true,
        // fade: true,              
    };

    const [src, setSrc] = useState("https://dummyimage.com/1900x545/b5b5b5/fff");

    const fail = (e) => {
        setSrc("https://dummyimage.com/1900x545/b5b5b5/fff");
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <Image
                        src="/img/hero/slider1.webp"
                        alt="Slide 1"
                        className="w-full"
                        width={1900}
                        height={545}
                        placeholder="blur"
                        blurDataURL="https://dummyimage.com/1900x545/b5b5b5/fff"
                        onError={(e) => fail(e)}
                    />
                </div>
                <div>
                    <Image
                        src="/img/hero/slider2.webp"
                        alt="Slide 2"
                        className="w-full"
                        width={1900}
                        height={545}
                        placeholder="blur"
                        blurDataURL="https://dummyimage.com/1900x545/b5b5b5/fff"
                    />
                </div>
                <div>
                    <Image
                        src="/img/hero/slider3.webp"
                        alt="Slide 3"
                        className="w-full"
                        width={1900}
                        height={545}
                        placeholder="blur"
                        blurDataURL="https://dummyimage.com/1900x545/b5b5b5/fff"
                    />
                </div>
            </Slider>
        </>
    )
}

export default HeroSlider