const multer = require("multer");



//define the types of images
/*
const MIME_TYPES = {
  "images/jpg": "jpg",
  "images/png": "png",
  "images/jpeg": "jpeg",
};*/
//create the object of multer configuration
/*
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //indicate the folder where images will be saved, null - means without errors
    // callback(null, "images");
    callback(null, "/../images");
  },
  //file name
  filename: (req, file, callback) => {
    //give the new file name - here name remains the same
    //replace the space by underscores and add timestamp
    const name = file.originalname.split(" ").join("_");
    //need to give the file extension , so acess to Mime type
    const extension = MIME_TYPES[file.mimetype];
    //create entire file name
    callback(null, name + Date.now() + "." + extension);
  },
});
*/



// module.exports = multer({storage}).single('image')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    //reject file
    cb({
      message: 'Unsupported file format'
    }, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter: fileFilter
})

module.exports = upload;