'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const products = [
  {
    name: 'LED Name Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737652218/products/thumbnails/pa19lqntikn2o3m9rwg1.jpg',
    url: '/product-details/customized-name-led-lamp'
  },
  {
    name: 'LED Photo Acrylic',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1738065496/products/thumbnails/r1yxyjerptfidpxj1mff.jpg',
    url: '/product-details/personalized-acrylic-cutout-photo-led-lamp'
  },
  {
    name: 'Raisen Name Lamps',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737701189/products/odxhhyobm1godscsqpul.jpg',
    url: '/product-details/resin-led-lamp-with-name'
  },
  {
    name: '3D Name Plate',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737703831/products/gdszkumgmliqurujumck.png',
    url: '/product-details/3d-name-lamp-plate'
  },
  {
    name: 'Customize Kids LED Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737905381/products/thumbnails/n0v6qlolpj5m1e7lh5no.jpg',
    url: '/category/lamps/kids-lamp'
  },
  {
    name: 'Table Photo Frame',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737958555/products/thumbnails/n0f1r1snff3ycwdtlmhr.jpg',
    url: '/product-details/engraved-table-photo-frame'
  },
  {
    name: '3D Name Plate With Photo',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737974633/products/gbcrcki3sy5efbrdu6jo.jpg',
    url: '/product-details/customized-acrylic-picture-frame-with-name'
  },
  {
    name: 'Acrylic Cutout Fream',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737971007/products/thumbnails/wa3ajoqy8npjtha8k0qz.png',
    url: '/product-details/personalized-color-acrylic-cutout-photo-frame'
  }
];

function PersonalisedGiftsTwo() {
  return (
    <section>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] py-10">
          <div className="absolute inset-0" />
          <div className="relative container mx-auto px-4">
            <div className="text-center">

              <h1 className="text-4xl md:text-5xl font-bold text-slate-600 mb-4 font-serif">
                Personalised <span className='text-teal-600'>Gifts</span> 
              </h1>
              <p className="text-lg text-slate-600/90 max-w-2xl mx-auto">
                Create lasting memories with our unique collection of personalized lighting gifts
              </p>

            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                href={product.url}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-600 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-800">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      width={300}
                      height={300}
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <button className="mt-2 px-4 py-2 text-sm bg-cyan-100 text-cyan-800 rounded-full hover:bg-cyan-200 transition-colors duration-200">
                      Customize & Buy
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalisedGiftsTwo;