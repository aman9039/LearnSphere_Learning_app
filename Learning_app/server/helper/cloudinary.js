const cloudinary = require("cloudinary").v2;


// Configure with env data 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
    try {
        const result =await cloudinary.uploader.upload(filePath,{
            resource_type : "auto",
        })
    } catch (error) {
        console.log(error);
        throw new Error('Error uploading to cloudinary');        
    }
};

const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        throw new Error('Error uploading to cloudinary'); 
    }
};

module.exports = {uploadMediaToCloudinary,deleteMediaFromCloudinary};