const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const CampGround = require('../models/campground')
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware')
const campgrounds = require('../controllers/campgrounds')

//multer is required to take file input in image
const {storage} = require('../cloudinary')
const multer  = require('multer')
const upload = multer({storage})

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground));
    
// to add new campgrounds
router.get('/new',isLoggedIn,campgrounds.renderNewForm)

//editing the campgrround
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isAuthor,catchAsync(campgrounds.deleteCampground))

module.exports = router;