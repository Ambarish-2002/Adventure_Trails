const { abs } = require('@tensorflow/tfjs');
const CampGround = require('../models/campground')
const Review = require('../models/review')
const { exec } = require('child_process');
const {PythonShell } = require("python-shell");

module.exports.newReview = async (req,res)=>{
    const {id} = req.params;
    const campground = await CampGround.findById(id);
    const review = new Review(req.body.review);
    const fs = require('fs');
    const content = req.body.review.body; // Replace this with your string variable
    fs.writeFile('review.txt', content, (error) => {
    if (error) {
        console.error('Error writing to file:', error);
            return;
    }
  console.log('File saved successfully!');
    });
    fs.readFile('review.txt', 'utf8', (error, data) => {
                if (error) {
                  console.error('Error reading file:', error);
                  return;
                }
                console.log(data)
            });
    await PythonShell.run("comment_toxic.py",async (req,res)=>{
        if(err) console.log("sdfasdfadsf")
        if(res) console.log(res)
    }).then(async()=>{
    await fs.readFile('review.txt', 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading file:', error);
                return;
            }
            if(data==="true")
            {
            req.flash('Failed , Could not create a new review');
            res.redirect(`/campgrounds/${campground._id}`);
            
            }
            else
            {
            review.author=req.user._id;
            campground.reviews.push(review);
            review.save();
            campground.save();
            req.flash('success','Created a new review');
            res.redirect(`/campgrounds/${campground._id}`);
            }
        })});
    // console.log(flag)
    // if(flag==="true")
    // {
    // req.flash('Failed',' Could not create a new review');
    // res.redirect(`/campgrounds/${campground._id}`);
    
    // }
    // else
    // {
    // review.author=req.user._id;
    // campground.reviews.push(review);
    // review.save();
    // campground.save();
    // req.flash('success','Created a new review');
    // res.redirect(`/campgrounds/${campground._id}`);
    // }
    
}

module.exports.deleteReview = async(req,res)=>{
    const {id} = req.params;
    const {reviewId} = req.params;
    await CampGround.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);   
}

// const fs = require('fs');
//     const content = req.body.review.body; // Replace this with your string variable
//     fs.writeFile('review.txt', content, (error) => {
//     if (error) {
//         console.error('Error writing to file:', error);
//             return;
//     }
//   console.log('File saved successfully!');
//     });
//     var result
//     const pythonProcess = exec('comment_toxic.py', (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error executing Python program: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.error(`Python program encountered an error: ${stderr}`);
//           return;
//         }
//       });
//       pythonProcess.on('error', (error) => {
//         console.error(`Failed to start Python program: ${error.message}`);
//       });

//       fs.readFile('review.txt', 'utf8', (error, data) => {
//         if (error) {
//           console.error('Error reading file:', error);
//           return;
//         }
//         result = data;
//     })
    
//     if(result=='true')
//     {
//         req.flash('Inappropriate Review')
//     }
//     //
//     else
//     {
//         (async () => {
//         review.author=req.user._id;
//         campground.reviews.push(review);
//         await review.save();
//         await campground.save();
//         req.flash('success','Created a new review')
//         res.redirect(`/campgrounds/${campground._id}`);
//           })();

//     // review.author=req.user._id;
//     // campground.reviews.push(review);
//     // await review.save();
//     // await campground.save();
//     // req.flash('success','Created a new review')
//     // res.redirect(`/campgrounds/${campground._id}`);
//     }




// function runPythonProgram() {
//     return new Promise((resolve, reject) => {
//       const pythonProgram = 'comment_toxic.py';
//       const command = `python ${pythonProgram}`;
  
//       exec(command, (error, stdout, stderr) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         if (stderr) {
//           reject(new Error(stderr));
//           return;
//         }
  
//         const output = stdout.trim();
//         resolve(output);
//       });
//     });
//   }
  
//   async function main() {
//     try {
//       const pythonOutput = await runPythonProgram();
//     } catch (error) {
//       console.error('Error executing Python program:', error);
//     }
//   }
  
//   main();

//   var result
//     fs.writeFile('review.txt', content, (error) => {
//     if (error) {
//         console.error('Error writing to file:', error);
//             return;
//     }
//   console.log('File saved successfully!');
//     });
   
//     function runPythonProgram() {
//         return new Promise((resolve, reject) => {
//           const pythonProgram = 'comment_toxic.py';
//           const command = `python ${pythonProgram}`;
      
//           exec(command, (error, stdout, stderr) => {
//             if (error) {
//               reject(error);
//               return;
//             }
//             if (stderr) {
//               reject(new Error(stderr));
//               return;
//             }
      
//             const output = stdout.trim();
//             resolve(output);
//           });
//         });
//       }
      
//       async function main() {
//         try {
//           const pythonOutput = await runPythonProgram();
//         } catch (error) {
//           console.error('Error executing Python program:', error);
//         }
//       }
      
//       main();
//       setTimeout(() => {
//         fs.readFile('review.txt', 'utf8', (error, data) => {
//             if (error) {
//               console.error('Error reading file:', error);
//               return;
//             }
//             console.log(data)
//       }, 2000);
//         fs.readFile('review.txt', 'utf8', (error, data) => {
//         if (error) {
//           console.error('Error reading file:', error);
//           return;
//         }
//         console.log(data)
//     })
