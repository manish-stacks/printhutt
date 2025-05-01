import React, { useState } from 'react';
import Image from 'next/image';

interface OrderItem {
    name0?: string;
    name1?: string;
    name2?: string;
    name3?: string;
    selectedDesign?: string;
    radiusValue?: string;
    shapeName?: string;
    orientation?: string;
    variant?: string;
    sizeThickness?: string;
    frameDesign?: string;
    text?: string;
    color?: string;
    font?: string;
    size?: string;
    style?: string;
    lineHeight?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    previewCanvas?: { url: string };
    previewImage?: { url: string };
    previewImageTwo?: { url: string };
    previewImageThree?: { url: string };
    previewImageFour?: { url: string };
}

interface OrderDetailRowProps {
    label: string;
    value: string | undefined;
}

const OrderDetailRow: React.FC<OrderDetailRowProps> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center justify-between border-b last:border-0 py-2">
            <p className="font-semibold">{label}</p>
            <p>{value}</p>
        </div>
    );
};

const ImageGallery: React.FC<{
    images: Array<{ url: string | undefined; alt: string }>;
    onImageClick: (url: string) => void;
}> = ({ images, onImageClick }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {images.map((img, index) => (
            img.url && (
                <div key={index} className="aspect-w-16 aspect-h-9">
                    <Image
                        onClick={() => onImageClick(img.url!)}
                        alt={img.alt}
                        src={img.url}
                        width={400}
                        height={400}
                        className="rounded-md object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                </div>
            )
        ))}
    </div>
);

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
    onDownload: (url: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose, onDownload }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="relative h-[70vh]">
                    <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => onDownload(imageUrl)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Download Image
                    </button>
                </div>
            </div>
        </div>
    );
};

const CustomizeOderModel: React.FC<{ item: OrderItem }> = ({ item }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    const images = [
        { url: item?.previewCanvas?.url, alt: "Preview Canvas" },
        { url: item?.previewImage?.url, alt: "Preview Image" },
        { url: item?.previewImageTwo?.url, alt: "Preview Image Two" },
        { url: item?.previewImageThree?.url, alt: "Preview Image Three" },
        { url: item?.previewImageFour?.url, alt: "Preview Image Four" }
    ];

    return (
        <div className="space-y-4">
            <div className="p-6 rounded-lg bg-white shadow-sm">
                {item && (
                    <>
                        <div className="space-y-2">
                            {Array.from({ length: 4 }, (_, i) => (
                                <OrderDetailRow
                                    key={`name${i}`}
                                    label={`Name-${i}`}
                                    value={item[`name${i}` as keyof OrderItem]}
                                />
                            ))}
                            <OrderDetailRow label="Selected Design" value={item.selectedDesign} />
                            <OrderDetailRow label="Radius Value" value={item.radiusValue} />
                            <OrderDetailRow label="Shape Name" value={item.shapeName} />
                            <OrderDetailRow label="Shape Orientation" value={item.orientation} />
                            <OrderDetailRow label="Variant" value={item.variant} />
                            <OrderDetailRow label="Thickness" value={item.sizeThickness} />
                            <OrderDetailRow label="Frame Design" value={item.frameDesign} />
                            <OrderDetailRow label="Text" value={item.text} />
                            <OrderDetailRow label="Color" value={item.color} />
                            <OrderDetailRow label="Font" value={item.font} />
                            <OrderDetailRow label="Size" value={item.size} />
                            <OrderDetailRow label="Style" value={item.style} />
                            <OrderDetailRow label="Line Height" value={item.lineHeight} />
                            <OrderDetailRow label="Font Size" value={item.fontSize} />
                            {item.width && item.height && (
                                <OrderDetailRow
                                    label="Box Size"
                                    value={`${item.width}" x ${item.height}"`}
                                />
                            )}
                        </div>
                        <ImageGallery images={images} onImageClick={setSelectedImage} />
                    </>
                )}
            </div>

            {selectedImage && (
                <ImageModal
                    imageUrl={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onDownload={downloadPreviewImage}
                />
            )}
        </div>
    );
};

export default CustomizeOderModel;