const joi = require("joi");
module.exports.listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().pattern(/^(?!\d+$).+$/).required(),
      description: joi.string().pattern(/^(?!\d+$).+$/).required(),
      price: joi.number().required().min(0),
      country: joi.string().pattern(/^(?!\d+$).+$/).required(),
      location: joi.string().pattern(/^(?!\d+$).+$/).required(),
      image:joi.string().allow("",null),
    })
    // .required(),
});


module.exports.reviewSchema = joi.object({
  review: joi.object({
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().pattern(/^(?!\d+$).+$/).required(),
  }).required(),
});
