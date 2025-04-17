const mongoose = require('mongoose');
const {Schema} = mongoose;



const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String]
});

exports.Product = mongoose.model('Product', productSchema);


  //Schema ka kam hota hai type set karna kya kya honga chaye okkk or one more thing that jo product hai wo dynamic name hai jo pure collection ko point karta hai ki prodcut collection ka type


