'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const products = [
  {
    name: 'LED Name Lamp',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.41.08_AM_aeu7jl.mp4',
    url: '/product-details/customized-name-led-lamp',
    type: 'video'
  },
  {
    name: 'LED Photo Acrylic',
    image: 'https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_6.03.50_PM_l0wwwy.mp4',
    url: '/product-details/personalized-acrylic-cutout-photo-led-lamp',
    type: 'video'
  },
  {
    name: 'Raisen Name Lamps',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/odxhhyobm1godscsqpul_gptkgm.jpg',
    url: '/product-details/resin-led-lamp-with-name'
  },
  {
    name: '3D Name Plate',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/gdszkumgmliqurujumck_ijmmki.png',
    url: '/product-details/3d-name-lamp-plate'
  },
  {
    name: 'Customize Kids LED Lamp',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/n0v6qlolpj5m1e7lh5no_f0aaog.jpg',
    url: '/category/lamps/kids-lamp'
  },
  {
    name: 'Table Photo Frame',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/n0f1r1snff3ycwdtlmhr_zyk52r.jpg',
    url: '/product-details/engraved-table-photo-frame'
  },
  {
    name: '3D Name Plate With Photo',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/gbcrcki3sy5efbrdu6jo_okyoaj.jpg',
    url: '/product-details/customized-acrylic-picture-frame-with-name'
  },
  {
    name: 'Acrylic Cutout Fream',
    image: 'https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/wa3ajoqy8npjtha8k0qz_cirzlw.png',
    url: '/product-details/photo-cutout-frame',

  }
];

function PersonalizedGiftsTwo() {
  return (
    <section>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] py-10 max-[576px]:py-0">
          <div className="absolute inset-0" />
          <div className="relative container mx-auto px-4">
            <div className="text-center">

              <h1 className="text-4xl max-[576px]:text-2xl md:text-5xl font-bold text-slate-600 mb-4 font-serif">
              <span className="text-rose-900" style={{ fontFamily: "DancingScript-VariableFont" }}>Personalised </span><span className='text-teal-600' style={{fontFamily:"Buttervill"}}>Gifts</span>
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
                <div className="relative overflow-hidden rounded-[5px] border-0 border-cyan-600 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-amber-800">
                  <div className="aspect-square overflow-hidden">
                    {
                      product.type === 'video' ?
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 border-2 rounded-t-[5px]"
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
                    <span className={`discount transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] right-[10px] bg-cyan-100 text-cyan-800 font-medium text-[12px] px-2 rounded-full`}>
                      <span className="max-[576px]:hidden">SAVE</span> 30%
                    </span>
                  </div>
                  <div className="p-4 max-[576px]:p-1 text-center">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <button className="mt-2 px-4 py-2 max-[567px]:px-2 max-[567px]:py-1 text-sm bg-cyan-100 text-cyan-800 rounded-full hover:bg-cyan-200 transition-colors duration-200">
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

export default PersonalizedGiftsTwo;