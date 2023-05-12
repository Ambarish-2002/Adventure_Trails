const { cloudinary } = require('../cloudinary')
const CampGround = require('../models/campground')
// MAp box stuff
const mapbox = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken=process.env.MAPBOX_TOKEN 
const geocoder=mapbox({ accessToken:mapboxToken })


module.exports.index=async (req,res)=>{
    const campgrounds = await CampGround.find({})
    res.render('campgrounds/index', {campgrounds})
}

module.exports.renderNewForm = (req,res)=>{
    // isLoggedin is a middleware
    res.render('campgrounds/new')
}

module.exports.createCampground = async(req,res)=>{
    // if(!req.body.campground) throw new ExpressError('Invalid Campground data',400)
    const geodata=await geocoder.forwardGeocode({
        query:req.body.campground.location,
        limit:1
    }).send()
    
    const campground = new CampGround(req.body.campground);
    campground.images = req.files.map(f=>({ url:f.path,filename:f.filename }))
    console.log(campground.images)
    campground.author = req.user._id
    campground.geometry=geodata.body.features[0].geometry;
    await campground.save();
    console.log(campground)
    req.flash('success',"Made a new Campground")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req,res)=>{
    const {id}=req.params;
    const campground = await CampGround.findById(id).populate({
        path:'reviews',
        //Populating the author of the review
        populate:{
            path:'author'
        }
    }).populate('author');
    
    if(!campground){
        req.flash('error','Cant find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show',{campground,})// IMP IMP IMP this comma is very important for the flash to work
}

module.exports.renderEditForm =async (req,res)=>{
    const {id}=req.params;
    const campground = await CampGround.findById(id);
    if(!campground){
        req.flash('error','Cant find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit',{campground})
}

module.exports.updateCampground = async(req,res)=>{
    const {id}= req.params;
    const campground = await CampGround.findByIdAndUpdate(id,{...req.body.campground})
    const imgs =req.files.map(f=>({ url:f.path,filename:f.filename }))
    campground.geometry=geodata.body.features[0].geometry;
    campground.images.push(...imgs)
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})    
    }
    await campground.save()
    req.flash('success',"Successfully Updated the Campground")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async(req,res)=>{
    const {id}= req.params;
    await CampGround.findByIdAndDelete(id);
    req.flash('success',"Successfully Deleted the Campground")
    res.redirect(`/campgrounds`)
}