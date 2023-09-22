import nc from 'next-connect';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { imgMiddleware } from '../../../middleware/imgMiddleware';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handler = nc()
  .use(
    fileUpload({
      useTempFiles: true,
    }),
  )
  .use(imgMiddleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req, res) => {
  try {
    let files = Object.values(req.files).flat();

    for (const file of files) {
      const img = await uploadToCloudinaryHandler(file, path);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
