import { v2 as cloudinary } from "cloudinary";
import config from "../../config";

cloudinary.config({
  cloud_name: "duw657qjo",
  api_key: "343923594274485",
  api_secret: "n66XULrO3vvIFZYKfnrj5IwcufA",
});

export const cloudinaryUpload = cloudinary;
