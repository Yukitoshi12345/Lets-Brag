// Import the Express router to create a new router instance
const router = require('express').Router();
const multer = require("multer");
const path = require("path");

const { User } = require('../../models');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/bragImages")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // change the name of the file from its original name to its posted date and extended name
        console.log(file)
    }
})

const upload = multer({storage: storage})

router.get("/", (req, res) => {
    res.render("layouts/upload");
});

router.post("/", upload.single("image"), (req, res) => {
    res.send("upload successful");
});
//router.post('/', upload.single('avatar'), async(req, res)=>{
    //try {
      //console.log('---------------------------------------');
      //console.log(req.file);
      //const dbUpdatedUser = await User.update(
        //{
          //profile_photo: req.file
        //},
        //{
          //where:{
            //id: req.session.userId
          //}
        //}

      //);
      //req.session.save(()=>{
        //req.session.photo=dbUpdatedUser.profile_photo;
      //});
      // Respond with a success status code (200) and the updated post data
      //res.status(200).json(dbUpdatedUser);
    //} catch (error) {
      //console.log(error);
      //res.status(500).json(error);
    //}
  //});

// Export the router for use in other parts of the application
module.exports = router;