import Image from 'next/image';
import React from 'react';
import { BiPlay, BiStar } from 'react-icons/bi';

interface TestimonialProps {
    imgSrc: string;
    name: string;
    date: string;
    rating: number;
    review: string;
    hasVideo: boolean;
    imgHeight: string;
}

const testimonials = [
    {
        id: 1,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668469/ssmufuknsc2h8xi7u63j_eykick.jpg",
        name: "Sumit Gupta",
        rating: 5,
        review: "I recently bought the Hanuman Ji LED Acrylic Photo Frame from Printhutt, and I'm impressed! The quality is excellent.",
        imgHeight: "400px",
        hasVideo: false,
        date: ""
    },
    {
        id: 2,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668467/pw0jklkcrhwpsnucnfgx_qstl9e.png",
        name: "Ravi",
        rating: 5,
        review: "I purchased the Couple Heart Night Lamp, and it's simply beautiful! The soft glow creates a warm, romantic atmosphere. The design is elegant, and it's perfect for any bedroom. A lovely addition to my home!",
        hasVideo: true,
        imgHeight: "300px",
        date: ""
    },
    {
        id: 3,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668471/i7lchllalrxrzyaz81vf_q1xjhk.png",
        name: "Suhani",
        rating: 5,
        review: "The Acrylic Cutout Photo LED Lamp is amazing! The photo quality is sharp, and the LED light adds a cozy ambiance.",
        imgHeight: "380px",
        hasVideo: false,
        date: ""
    },
    {
        id: 4,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668474/xlg278vi3x9j3boeoxdh_vvig3w.jpg",
        name: "Vinay",
        rating: 5,
        review: "The 3D Name Lamp Plate is fantastic! The design is unique, and the lighting creates a beautiful effect. It’s a great personalized touch for any space.",
        imgHeight: "350px",
        hasVideo: false,
        date: ""
    },
    {
        id: 5,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668476/pa19lqntikn2o3m9rwg1_jau5cz.jpg",
        name: "Anish",
        date: "5/6/2023",
        rating: 5,
        review: "I absolutely love the Customized Name LED Lamp with the wooden texture base! The personalized touch is perfect, and the soft LED glow adds a warm, inviting atmosphere.",
        hasVideo: true,
        imgHeight: "350px"
    },
    {
        id: 6,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668478/nioal6cjozy2oeb3plee_j3bqsc.jpg",
        name: "Harsh",
        date: "11/1/2024",
        rating: 5,
        review: "The Acrylic Full Photo Frame is just stunning! The clarity of the photo is excellent, and the acrylic material gives it a sleek, modern look.",
        imgHeight: "400px",
        hasVideo: false
    },
    {
        id: 7,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668481/qdgakcjub6nprkmgkxhe_vucm39.jpg",
        name: "Jatin Pal",
        date: "6/2/2024",
        rating: 5,
        review: "The 'Better Together' Neon Light is amazing! It adds a fun, vibrant touch to any space.",
        imgHeight: "280px",
        hasVideo: false
    },
    {
        id: 8,
        imgSrc: "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743668483/r1yxyjerptfidpxj1mff_elmlnn_fafsie.webp",
        name: "Anushka",
        date: "5/2/2025",
        rating: 5,
        review: "The Acrylic Cutout Photo LED Lamp is fantastic! The custom photo looks sharp, and the LED light adds a beautiful, warm glow.",
        imgHeight: "400px",
        hasVideo: false
    }
];

const Testimonial = ({ imgSrc, name, date, rating, review, hasVideo, imgHeight }: TestimonialProps) => (
    <div className="h-full bg-[#fdf8f5] rounded-2xl">
        <div className="flex flex-col h-full">
            <div className="relative mb-3 flex-shrink-0">
                <img                    src={imgSrc}
                    alt={name}
                    className={`w-full h-[${imgHeight}] object-cover rounded-t-2xl `}
                />
                {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full p-3 shadow-lg">
                            <BiPlay className="w-6 h-6 text-black" />
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-1.5 flex-grow py-3 px-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 text-lg">{name}</h3>
                    {date && <p className="text-xs text-gray-500">{date}</p>}
                </div>
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <BiStar
                            key={i}
                            size={14}
                            className={`${i < rating ? 'fill-amber-700 text-black' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <p className="text-gray-800 text-md leading-relaxed line-clamp-4">{review}</p>
            </div>
        </div>
    </div>
);

export const TestimonialCard = () => (
    <div className="min-h-screen bg-white py-15 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="relative mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] py-10 max-[576px]:py-0">
            <div className="absolute inset-0" />
            <div className="relative container mx-auto px-4">
                <div className="text-center">
                    <div className="md:text-6xl font-bold  mb-4 font-serif max-[576px]:text-4xl">
                        <span className='text-pink-600' style={{ fontFamily: "Buttervill", fontWeight: "bold" }}>What users love about our products</span>
                    </div>
                    <p className="text-lg text-slate-600/90 max-w-2xl mx-auto max-[576px]:text-sm py-4">
                        Hear what our customers have to say about our products and services.
                    </p>
                </div>
            </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {testimonials.map((testimonial, index) => (
                    <Testimonial key={index} {...testimonial} />
                ))}
            </div>
        </div>
    </div>
);