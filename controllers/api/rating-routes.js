const router = require('express').Router();
// const { Brag, Comment, User, Rating } = require('../..models');
const withAuth = require('../../utils/auth');

//create a new or update an existing brag post rating
router.post('/', withAuth, async (req, res) => {
  try {
    const [dbRatingData, created] = await Rating.findOrCreate({
      where: {
        rater_id: req.session.userId,
        brag_id: req.body.brag_id,
      },
      defaults: {
        rating: req.body.rating,
      },
    });

    if (created) {
      res.status(200).json(dbRatingData);
    } else {
      const dbUpdatedRating = await Rating.update(
        {
          rating: req.body.rating,
        },
        {
          where: {
            rater_id: req.session.userId,
            brag_id: req.body.brag_id,
          },
        },
      );
      res.status(200).json(dbUpdatedRating);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
