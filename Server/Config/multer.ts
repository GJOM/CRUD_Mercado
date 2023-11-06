import * as multer from 'multer';
import * as crypto from 'crypto'

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users');
    },
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.')[1];
        const newFilename = crypto.randomBytes(64).toString('hex');
    
        cb(null, `${newFilename}.${fileExtension}`)
      }
});

const productStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/products');
    },
    filename: (req, file, cb)=>{
        const fileExtension = file.originalname.split('.')[1];
        const newFilename = crypto.randomBytes(64).toString('hex');

        cb(null, `${newFilename}.${fileExtension}`)
    }
})

export const userUpload = multer({ storage: userStorage });
export const productUpload = multer({storage: productStorage})