import React from 'react';
import Image from 'next/image';

const CustomizeOderModel = ({ item }) => {
    // const downloadPreviewImage = (url: string) => {
    //     // Implement download functionality here
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = url.split('/').pop(); // Set the filename based on the URL
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const downloadPreviewImage = async (url: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = url.split('/').pop() || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release memory
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };


    return (
        <div className='p-4 rounded-md bg-slate-200'>
            {item && (
                <>
                    {Array.from({ length: 4 }, (_, index) => {
                        const key = `name${index}`;
                        return (
                            item[key] && (
                                <div key={index} className="flex items-center justify-between  border-b last:border-0">
                                    <p className="font-semibold">{`Name-${index}`}</p>
                                    <p>{item[key]}</p>
                                </div>
                            )
                        );
                    })}
                    {
                        item?.selectedDesign && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Selected Design</p>
                                <p>{item?.selectedDesign}</p>
                            </div>
                        )
                    }


                    {/* customize Acrylic  design start    */}
                    {
                        item?.radiusValue && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Radius Value</p>
                                <p>{item?.radiusValue}</p>
                            </div>
                        )
                    }
                    {
                        item?.shapeName && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Shape Name</p>
                                <p>{item?.shapeName}</p>
                            </div>
                        )
                    }
                    {
                        item?.variant && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Variant</p>
                                <p>{item?.variant}</p>
                            </div>
                        )
                    }
                    {
                        item?.sizeThickness && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Thickness</p>
                                <p>{item?.sizeThickness}</p>
                            </div>
                        )
                    }

                    {

                        item?.frameDesign && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Frame Design</p>
                                <p>{item?.frameDesign}</p>
                            </div>
                        )
                    }





                    {
                        item?.text && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Text</p>
                                <p>{item?.text}</p>
                            </div>
                        )
                    }

                    {
                        item?.color && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Color</p>
                                <p>{item?.color}</p>
                            </div>
                        )
                    }
                    {
                        item?.font && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Font</p>
                                <p>{item?.font}</p>
                            </div>
                        )
                    }
                    {
                        item?.size && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Size</p>
                                <p>{item?.size}</p>
                            </div>
                        )
                    }
                    {
                        item?.style && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Style</p>
                                <p>{item?.style}</p>
                            </div>
                        )
                    }
                    {
                        item?.lineHeight && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">lineHeight</p>
                                <p>{item?.lineHeight}</p>
                            </div>
                        )
                    }

                    {
                        item?.fontSize && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">fontSize</p>
                                <p>{item?.fontSize}</p>
                            </div>
                        )
                    }

                    {
                        item?.width && (
                            <div className="flex items-center justify-between  border-b last:border-0">
                                <p className="font-semibold">Box Size</p>
                                <p>{item?.width}" x {item?.height}"</p>
                            </div>
                        )
                    }

                    {/* customize Acrylic  design end    */}



                    <div className='flex space-x-3'>
                        {item?.previewImage && (
                            <Image
                                onClick={() => downloadPreviewImage(item?.previewImage.url)}
                                alt="img"
                                src={item?.previewImage?.url || 'https://res.cloudinary.com/dkprths9f/image/upload/v1737632594/elementor-placeholder-image_wps86z.webp'}
                                width={400}
                                height={400}
                                className="rounded-md w-[50%] h-[200px] object-cover"
                            />
                        )}
                        {item?.previewCanvas && (
                            <Image
                                onClick={() => downloadPreviewImage(item?.previewCanvas.url)}
                                alt="img"
                                src={item?.previewCanvas?.url || 'https://res.cloudinary.com/dkprths9f/image/upload/v1737632594/elementor-placeholder-image_wps86z.webp'}
                                width={400}
                                height={400}
                                className="rounded-md w-[50%] h-[200px] object-cover"
                            />
                        )}



                    </div>
                </>
            )}
        </div>
    );
};

export default CustomizeOderModel;