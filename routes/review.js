
const express = require('express');
const reviewController = require('../controller/review');
const router = express.Router();

router.post('/postReview', reviewController.postReview);
router.get('/getreviewbyid', reviewController.getReviewById);
router.post('/editReview', reviewController.postEditReview);
router.get('/getreviews', reviewController.getReviews);
router.post('deletereview',reviewController.postDeleteReview);
module.exports = router;