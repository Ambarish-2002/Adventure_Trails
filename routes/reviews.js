const express = require('express')

// The mergeParams is important to use Id in our code , because router will not pass it on default
const router = express.Router({mergeParams:true})
const catchAsync = require('../utils/catchAsync')
const {validateReviews,isLoggedIn,isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews')


router.post('/',isLoggedIn,validateReviews,catchAsync(reviews.newReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;