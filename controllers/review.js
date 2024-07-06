
const Review = require("../Models/review");
const Listing = require("../Models/listing");

module.exports.createReview = async (req, res) => {
  //   let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author =  req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }

  module.exports.destroyReview = async(req,res)=>{
  let{id,reviewId}= req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
  await Review.findOneAndDelete(reviewId);

  req.flash("success","Review deleted!");
  res.redirect(`/listings/${id}`);
}