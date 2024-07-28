// const mongoose = require('mongoose');
// const BannerModel = new mongoose.Schema({
//   image: [{ type: String }],
//   });
// const BannerData = mongoose.model('BannerData', BannerModel);
// module.exports = BannerData;


const mongoose = require('mongoose');

const BannerModel = new mongoose.Schema({
  imageGroups: [[{ type: String }]], // Nested array to store image groups
});

const BannerData = mongoose.model('BannerData', BannerModel);
module.exports = BannerData;
