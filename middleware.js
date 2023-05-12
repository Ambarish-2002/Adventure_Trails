const ExpressError = require('./utils/ExpressError')
const {validationSchema} = require('./schemas')
const CampGround = require('./models/campground')
const {reviewSchema} = require('./schemas')
const Review = require('./models/review')

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be Logged in first!')
        return res.redirect('/login')
    }
    next();
} 

module.exports.validateCampground = (req,res,next)=>{
    const {error} =validationSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    const {id}=req.params;
    const campgroundcheck = await CampGround.findById(id)
    if(!campgroundcheck.author.equals(req.user._id)){
       req.flash('error','You do not have permission')
       return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const {reviewId}=req.params;
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
       req.flash('error','You do not have permission')
       return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
//Function to validate reviws
module.exports.validateReviews = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}

