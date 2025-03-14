// Code by Ambarish Kshirsagar
// GitHub :- https://github.com/Ambarish-2002
// Linkedin :- https://www.linkedin.com/in/ambarishkshirsagar/

//Environt variables to hide API keys
if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash');

const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

const ExpressError = require('./utils/ExpressError')

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')

const passport = require('passport')
const localStrategy = require('passport-local')

const User = require('./models/user');


// connectig mongoose to mongodb on the localserver
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Connection error'));
db.once('open',()=>{
    console.log('Database connected')
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))


app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));


const sessionConfig={
    secret:'Thisismysecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() +1000*60*60*24*7,
        maxAge :1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()  ))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Flash middleware
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error= req.flash('error');
    next();
})

app.use('/',userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews',reviewRoutes)


//---------------------------------------------------------------------------------------------------------------
//                                        ROUTES IN routes folder
//---------------------------------------------------------------------------------------------------------------

app.get('/',(req,res)=>{
    res.render('home')
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500} = err;
    if(!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error',{err})
})

app.listen(3000,(req,res)=>{
    console.log("Listening on port 3000!!!")
})




