import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv/config"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //console.log("\n response ",response);
    // file has been uploaded successfully
    //console.log(`file is uploaded successfully on cloudinary ${response.url}`);
    fs.unlinkSync(localFilePath);
    //console.log('\n response is \n' ,response);
    return response;
  } catch (error) {
    console.log("\n " , error);
    fs.unlinkSync(localFilePath); //remove the locally saved temprary file as the upload operation got failed
    return null;
  }
};

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

export { uploadOnCloudinary };
