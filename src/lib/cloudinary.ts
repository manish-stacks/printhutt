import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file:any,folderName='common'): Promise<{ url: string; public_id: string;fileType:string }> => {
  try {

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64File}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folderName,
      // transformation: [
      //   { width: 500, height: 500, crop: "fill", gravity: "center" }
      // ]
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      fileType:result.format
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (public_id: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
};


