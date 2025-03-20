import Link from 'next/link'
import React from 'react'

const AcrylicPhotoVideo = () => {
    return (
        <>
            <section className="section-banner-one overflow-hidden py-[50px] max-[1199px]:py-[35px] bg-[rgb(14,16,47,1)]">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 lg:px-16 py-10 max-w-7xl mx-auto">
                    <div className="w-full lg:w-1/2">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-[470px] h-auto rounded-lg shadow-lg border-4 border-[#cbefff]"
                            width="470" height="470"
                            preload="none"
                        >
                            <source src="https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_9.11.26_PM_online-video-cutter.com_1_yq8a8p.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-100 mb-4">
                            Acrylic Photo
                        </h2>
                        <p className="text-slate-200 text-lg leading-relaxed mb-6">
                            Showcase your loved ones in a striking way with the unique Clear
                            Acrylic Photo. Featuring a personalized, people-only design where the
                            background is removed, allowing your wall to seamlessly integrate
                            through the transparent areas.
                        </p>
                        <Link
                            href="/product-details/customized-wall-photo-frame-acrylic--acrylic-photo-frame"
                            className="px-6 py-3 text-lg font-medium bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section >
        </>
    )
}

export default AcrylicPhotoVideo