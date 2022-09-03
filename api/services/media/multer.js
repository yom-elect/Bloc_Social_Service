/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const multer = require("multer");

// specifying storage engine

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// media validation all types would be allowed for now
// if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(new Error('Only image are allowed.'), false);
// }
// cb(null, true);
// }
// const fileFilter = (req, file, cb) =>{
// if (file.mimetype === 'uploads/jpeg' || file.mimetype === 'uploads/jpg'
// ||file.mimetype === "uploads/png" ) {
//         cb(null, true)
//     }
//     else {
//         cb({message:"Unsupported File Format"}, false)
//     }
// }

const upload = multer({
    storage,
    limits: { files: 10, fileSize: 15 * 1024 * 1024 },
    // fileFilter
});

module.exports = upload;