const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../public/images/bragImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // change the name of the file from its original name to its posted date and extended name
        console.log(file);
    }
});

const uploading = multer({storage: storage});

router.get('/', (req, res) => {
    res.render('layouts/upload.handlebars');
});

router.post('/', uploading.single('image'), (req, res) => {
    res.send("successfully uploaded the image.");
});

module.exports = router;