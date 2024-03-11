// Import the Express router to create a new router instance
const router = require('express').Router();

const { User } = require('../../models');
const upload = require('../../utils/uploads');


router.post('/', upload.single('avatar'), async(req, res)=>{
    try {
      console.log('---------------------------------------');
      console.log(req.file);
      const dbUpdatedUser = await User.update(
        {
          profile_photo: req.file
        },
        {
          where:{
            id: req.session.userId
          }
        }

      );
      req.session.save(()=>{
        req.session.photo=dbUpdatedUser.profile_photo;
      });
      // Respond with a success status code (200) and the updated post data
      res.status(200).json(dbUpdatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

// Export the router for use in other parts of the application
module.exports = router;