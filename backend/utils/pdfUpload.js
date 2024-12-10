import multer from "multer";
// import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file);
      cb(null, './Files');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage,limits: { fileSize: 1024 * 1024 * 10 } });

  export default upload;