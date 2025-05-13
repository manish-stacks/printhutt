import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

// Helper to upload buffer
const uploadToS3 = async (buffer: Buffer, mimeType: string, folder: string) => {
  const fileType = mimeType.split('/')[1];
  const key = `${folder}/${uuidv4()}.${fileType}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  });

  await s3.send(command);

  return {
    // url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    url: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${BUCKET_NAME}/${key}`,
    public_id: key,
    fileType,
  };
};

export const uploadImage = async (file: File, folderName = 'common', width?: number, height?: number): Promise<{ url: string; public_id: string; fileType: string }> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(width, height); // NOTE: S3 doesn’t do transformations natively
  return await uploadToS3(buffer, file.type, folderName);
};

export const uploadImageOrder = async (dataUri: string, folderName: string): Promise<{ url: string; public_id: string; fileType: string }> => {
  const matches = dataUri.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid data URI');

  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');

  return await uploadToS3(buffer, mimeType, folderName);
};

export const reviewImage = async (file: File): Promise<{ url: string; public_id: string; fileType: string }> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return await uploadToS3(buffer, file.type, 'reviews');
};

export const deleteImage = async (public_id: string): Promise<void> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: public_id,
    });
    await s3.send(command);
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw new Error('Failed to delete image');
  }
};

export const sign_url = async (publicId: string): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: publicId,
  });

  // Signed URL valid for 5 mins
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return signedUrl;
};



/*import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file, folderName = 'common', width: number, height: number): Promise<{ url: string; public_id: string; fileType: string }> => {
  try {

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64File}`;
    console.log(width, height)
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folderName,
      // transformation: [
      //   { width: width, height: height, crop: "fill", gravity: "center" },
      // ]
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      fileType: result.format
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};


export const uploadImageOrder = async (dataUri: string, folderName: string): Promise<{ url: string; public_id: string; fileType: string }> => {
  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folderName
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      fileType: result.format
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};


export const reviewImage = async (file): Promise<{ url: string; public_id: string; fileType: string }> => {

  const buffer = await file.arrayBuffer();
  const base64File = Buffer.from(buffer).toString('base64');
  const dataUri = `data:${file.type};base64,${base64File}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'reviews'
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      fileType: result.format
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


export const sign_url = async (publicId: string) => {
  const signedUrl = cloudinary.url(publicId, {
    secure: true,
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 5, // 5 min valid
  });

  return signedUrl
}



*/
