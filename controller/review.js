
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const Review = require('../model/review');
//=============Post Add review==============
exports.postReview = (req, res, next) => {
    const {message,review}=req.body
    Review.create({
      id: uuid(),
      message:message,
      review:review,
      createdOn: Date(Date.now()),
      modifiedOn: Date(Date.now())
    }).then((review) => {

      res.status(201).json({ message: 'Review  Successful Added', review,hasError: false });
    }).catch(err => console.log(err));
  };
  //===========Get review By ID=============
exports.getReviewById = (req, res, next) => {
    const id = req.query.id;

    Review.findOne({
      where: { id: id, isActive: true }

    })

      .then(review => {
        if (!review) {
          return res.status(201).json({
            message: 'Nothing Found Against Your Id', is,hasError: true
          })
        }
        res.status(201).json({
          message: 'successful', review,hasError: false
        })
      })
      .catch(err => console.log(err));
  };
  //===========Post Edit review===============
  exports.postEditReview = (req, res, next) => {
    const {message,review,id}=req.query;
    Review.findOne({ where: { id: id, isActive: true } })
      .then(review => {
        review.message = message;
        review.review = review;

        review.modifiedOn = Date(Date.now());
        review.updateOn = Date(Date.now());
        return review.save();
      }).then(review => {
        res.status(201).json({ message: 'UPDATED Review!', review,hasError: false })
      }).catch(err => console.log(err));
  };
  //======Post Delete review=======
  exports.postDeleteReview = (req, res, next) => {
    const reviewId = req.query.id;
    Review.findOne({ where: { id: reviewId, isActive: true } })
      .then(review => {
        review.isActive = false;
        return review.save();
      }).then(review => {
        res.status(201).json({ message: 'DELETE Review Successfuly!', review ,hasError: false})
      }).catch(err => console.log(err));
  };
  exports.getReviews = (req, res, next) => {


    Review.findAll({
      where: {  isActive: true }

    })

      .then(review => {
        if (!review) {
          return res.status(201).json({
            message: 'Nothing Found ', hasError: true
          })
        }
        res.status(201).json({
          message: 'successful', review,hasError: false
        })
      })
      .catch(err => console.log(err));
  };