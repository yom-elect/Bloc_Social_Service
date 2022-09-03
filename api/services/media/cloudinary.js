/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

exports.delete = (sourceId)=> {
    return new Promise((resolve)=>{
        cloudinary.uploader.destroy(
            sourceId, 
            (result) => { 
                if (result) {
                    resolve(result);
                }
                resolve(null);
         }
        );
    })
}

exports.uploads = (file, folder) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file, {
                resource_type: "auto",
                folder,
            },
            (error, result) => {
                if (result) {
                    resolve({
                        url: result.url,
                        id: result.public_id,
                    });
                }
                resolve(null);
            }
        );
    });
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports.sourceInfo = async(files, urls = [], uploader) => {
    await asyncForEach(files, async(file) => {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
    });
    return urls;
};