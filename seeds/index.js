// here we will make a seed database
const mongoose = require('mongoose')
const CampGround = require('../models/campground')
const Indiancities = require('./Indiancities')
const {descriptors , places} = require('./seedHelpers')
const axios = require('axios').default;

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Connection error'));
db.once('open',()=>{
    console.log('Database connected')
})

// fucntion to generate random name
const sample = (arr)=> arr[Math.floor(Math.random() * arr.length)]

// Using the unsplash api with axios
const campimg = async ()=>{
    try{
    const res= await axios.get("https://api.unsplash.com/photos/random?collections=0PS93s3CcF4&client_id=kn1mCPi60MIhSwM5T_DguvzA8QzcjQFL9mH0F2vJHls")
    return res.data.urls.small;
    }
    catch(e){
        console.log(e)
    } 
}

const seedDB = async()=>{
   await CampGround.deleteMany({});
   for(let i =0;i<400;i++)
   {    //let imgs = await campimg();
        const random = Math.floor(Math.random()*400);
        const pc = Math.floor(Math.random()*20);
        const camp = new CampGround({
            author:"633185baadc5ee209b207937",
            price:pc,
            location:`${Indiancities[random].city}, ${Indiancities[random].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/difv6zjz0/image/upload/v1664374442/YelpCamp/saelevnipd0fpqqmbxpi.jpg',
                    filename: 'YelpCamp/saelevnipd0fpqqmbxpi'
                },
              ],
            geometry:{ type: 'Point', coordinates: [Indiancities[random].lng,Indiancities[random].lat  ] }

        })
        await camp.save()
   }
}

// First calling the function then closing the connection
seedDB().then(()=>{
    db.close()
})