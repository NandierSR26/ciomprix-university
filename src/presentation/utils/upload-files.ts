import multer, { Multer, MulterError } from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { envs } from "../../config/envs";
import { NextFunction, Request, Response } from "express";

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         const currentDirectory = dirname(fileURLToPath(import.meta.url))
//         const path = join(currentDirectory, '../public')
//         cb(null, path)
//     },
//     filename: function(req, file, cb) {
//         const extension = file.originalname.split(".").pop()
//         const filename = `file-${Date.now()}.${extension}`
//         cb(null, filename)
//     }
// })

// export const upload = multer({storage})



const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      const currentDirectory = __dirname;
      const path = join(currentDirectory, '../../../public');
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split(".").pop()
      const filename = `file-${Date.now()}.${extension}`
      cb(null, filename)
    },
  },
)

export const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1 * 1024 * 1024 
  // },
  // fileFilter(req, file, cb) {
  //   const allowedTypes = ['image/jpeg', 'image/gif'];
  //   if (allowedTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     throw new Error('formato no valido')
  //   }
  // },
});

