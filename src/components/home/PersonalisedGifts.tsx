'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const products = [
  {
    name: 'Acrylic Night Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737373042/products/thumbnails/ay3jgwsmmqyqomsck0yx.jpg',
    url: '/product-details/couple-led-name-lamp-with-photo-wedding-gifts-for-couples'
  },
  {
    name: 'Multi Color Heart Neon',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737980307/products/thumbnails/f6cy0e1zk2epeoaet9cd.jpg',
    url: '/product-details/personalized-couple-name-with-heart-led-neon-sign'
  },
  {
    name: 'Couple LED Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737985193/products/thumbnails/h3lbzoharsjhnhruoyij.png',
    url: '/product-details/couple-name-lamp-rectangle-shape'
  },
  {
    name: 'Couple LED Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737985883/products/puoeblwgabofqoep5zjl.png',
    url: '/product-details/couple-name-lamp-diamond-shape'
  },
  {
    name: 'Couple LED Name Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737913742/products/thumbnails/u2p4raxkfdvilirshc8x.jpg',
    url: '/product-details/personalized-heart-night-lamp'
  },
  {
    name: 'Couple LED Name Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737915138/products/pw0jklkcrhwpsnucnfgx.png',
    url: '/product-details/personalized-double-heart-night-lamp'
  },
  {
    name: 'Couple LED Name Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737965914/products/xyutjqist7sfdla7lols.jpg',
    url: '/product-details/acrylic-couple-lamp-with-name'
  },
  {
    name: 'LED Photo Frame',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737974050/products/nioal6cjozy2oeb3plee.jpg',
    url: '/product-details/customize-acrylic-full-photo-frame-a4-size'
  }
];

function PersonalisedGifts() {
  return (
    <section>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] py-10">
          <div className="absolute inset-0" />
          <div className="relative container mx-auto px-4">
            <div className="text-center">

              <h1 className="text-4xl md:text-5xl font-bold text-slate-600 mb-4 font-serif">
                Personalised Couple Gifts
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
                <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-400">
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
                    <button className="mt-2 px-4 py-2 text-sm bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors duration-200">
                      View Details
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

export default PersonalisedGifts;