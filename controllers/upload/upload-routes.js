// Import the Express router to create a new router instance
const router = require('express').Router();

const { User } = require('../../models');
const upload = require('../../utils/uploads');


router.post('/', upload.single('avatar'), async(req, res)=>{
    try {
      await User.update(
        {
          profile_photo: req.file.filename
        },
        {
          where:{
            id: req.session.userId
          }
        }
      );
      res.redirect(`/dashboard/`);
      // res.render('dashboard');
      // res.status(200).json(dbUpdatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.post('/brag', upload.single('brag'), async(req, res)=>{
    // res.status(200).json(req.file.filename);
    res.render('new-post',{
      uploadResult: req.file.filename
    });
  });

// Export the router for use in other parts of the application
module.exports = router;