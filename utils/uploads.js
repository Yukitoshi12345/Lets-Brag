const multer = require('multer');
// Import the Brag and User models from the models directory

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, './public/images/uploads/');
    },
    filename: (req, file, cb)=>{
      cb(null, Date.now() + '-' + file.originalname);
    } 
  });
  /*
  const storage= multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './public/images/');
    },
    filename: function(req, file, cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    } 
  });
  */
//   const upload = multer({dest: './images'});
  const upload = multer({storage: storage});

  module.exports = upload;