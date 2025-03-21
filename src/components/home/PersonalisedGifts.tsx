'use client'
import { image } from 'html2canvas/dist/types/css/types/image';
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
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1741695836/h3lbzoharsjhnhruoyij_twmise.webp',
    url: '/product-details/couple-name-lamp-rectangle-shape'
  },
  {
    name: 'Couple LED Lamp',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737985883/products/puoeblwgabofqoep5zjl.png',
    url: '/product-details/couple-name-lamp-diamond-shape'
  },
  {
    name: 'Wooden Rolling Dice',
    // image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737913742/products/thumbnails/u2p4raxkfdvilirshc8x.jpg',
    image: 'https://cloudify.printhutt.com/video/cube.mp4',
    url: '/customize/frame/personalized-premium-wooden-rolling-dice-cube-with-photos',
    type: 'video'
  },
  {
    name: 'Fridge Magnets',
    // image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737915138/products/pw0jklkcrhwpsnucnfgx.png',
    image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1742371242/products/v0adkqf07z4uqzkakqxy.jpg',
    url: '/customize/magnet/custom-photo-fridge-magnets',
  },
  {
    name: 'Couple LED Name Lamp',
    // image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737965914/products/xyutjqist7sfdla7lols.jpg',
    image: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.51.09_AM_kc8lja.mp4",
    url: '/product-details/acrylic-couple-lamp-with-name',
    type: 'video'
  },
  {
    name: 'LED Photo Frame',
    // image: 'https://res.cloudinary.com/dkprths9f/image/upload/v1737974050/products/nioal6cjozy2oeb3plee.jpg',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.58.10_AM_iyvpqf.mp4',
    url: '/product-details/customize-acrylic-full-photo-frame-a4-size',
    type: 'video'
  }
];


const productsTwo = [
  {
    name: ' Acrylic Cutout Photo',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_6.03.50_PM_l0wwwy.mp4',
    url: '/product-details/personalized-acrylic-cutout-photo-led-lamp'
  },
  {
    name: 'Couple LED Name Lamp',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.51.09_AM_kc8lja.mp4',
    url: '/product-details/acrylic-couple-lamp-with-name'
  },
  {
    name: 'LED Name Lamp',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.41.08_AM_aeu7jl.mp4',
    url: '/product-details/customized-name-led-lamp'
  },
  {
    name: 'LED Photo Frame',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.58.10_AM_iyvpqf.mp4',
    url: '/product-details/customize-acrylic-full-photo-frame-a4-size',
  }

];

function PersonalizedGifts() {
  return (
    <section>
      {/*}
      <div>
        <div className="container mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsTwo.map((product, index) => (
              <Link
                key={index}
                href={product.url}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-rose-400 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-900">
                  <div className="aspect-square overflow-hidden">

                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 border-2 rounded-t-2xl"
                      width="470" height="470"
                      preload="none"
                    >
                      <source src={product.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <button className="mt-2 px-4 py-2 text-sm bg-rose-100 text-rose-800 rounded-full hover:bg-rose-200 transition-colors duration-200">
                      <span className="block md:hidden">Customize</span>
                      <span className="hidden md:block">Customize & Buy</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      */}
      <div className="min-h-screen mt-4">
        {/* Hero Section */}
        <div className="relative mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] py-10 max-[576px]:py-0">
          <div className="absolute inset-0" />
          <div className="relative container mx-auto px-4">
            <div className="text-center">

              <h1 className="text-4xl max-[576px]:text-2xl md:text-5xl font-bold text-slate-600 mb-4 font-serif ">
                Personalised <span className='text-pink-600' style={{fontFamily:"Buttervill"}}>Couple</span> Gifts
              </h1>
              <p className="text-lg text-slate-600/90 max-w-2xl mx-auto max-[576px]:text-sm">
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
                <div className="relative overflow-hidden rounded-2xl border-2 border-rose-400 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-900">
                  <div className="aspect-square overflow-hidden">
                    {
                      product?.type === 'video' ?
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 border-2 rounded-t-2xl"
                          width="470" height="470"
                          preload="none"
                        >
                          <source src={product.image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        :
                        <Image
                          width={300}
                          height={300}
                          src={`${product.image}?q=10&blur=30`}
                          alt={product.name}
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                    }

                    <span className={`discount transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] right-[10px] bg-rose-500 text-[#fff] font-medium text-[12px] px-2 rounded-full`}>
                      <span className="max-[576px]:hidden">SAVE</span> 30%
                    </span>

                  </div>
                  <div className="p-4 max-[576px]:p-1 text-center">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <button className="mt-2 px-4 py-2 max-[567px]:px-2 max-[567px]:py-1 text-sm bg-rose-100 text-rose-800 rounded-full hover:bg-rose-200 transition-colors duration-200">
                      <span className="block md:hidden">Customize</span>
                      <span className="hidden md:block">Customize & Buy</span>
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

export default PersonalizedGifts;