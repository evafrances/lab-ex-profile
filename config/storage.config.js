const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
// Comando para instlar dependencias: npm i --save morgan multer multer-storage-cloudinary cloudinary

cloudinary.config({ //esto lo requiere cloudinary siempre
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = cloudinaryStorage({
  // TODO: cloudinary storage configuration; allowed file types, unique file name...+
  cloudinary: cloudinary,
  folder: 'profile-avatars', //nombre de la carpeta en Cloudinary
  allowFormats: ['jpg', 'png'],
  filename: (req, file, next) => { //arrow function que retorna el nombre del fichero. 
    next(null, `${Date.now()}${file.originalname}`) //null = errores || día de la subida + nombre del fichero 
  }
})
// multer es una capa intermedia que nos ayuda a tratar al objeto image. 
module.exports = multer({ storage });

// se utilizará en el router, antes de llegar al controlador; es un middleware

// Las keys hay que revisarlas en el fichero .env 
// se obtienen con hacer una cuenta en https://cloudinary.com