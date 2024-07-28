var express = require('express')
var router = express.Router()
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
var upload = multer({
    storage: storage,
    limits: { files: 50 }
})




const isAuthenticated = require('../Middleware/authMiddleware');
const adminController = require('../Controller/adminController');
const bannerController = require('../Controller/bannerController');



// Route definitions
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);
// Protected route example
router.get('/protected', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route' });
});

// ----Banner----

router.post('/postbanner', upload.array('image'), bannerController.postBanner);
router.get('/getbanner',bannerController.getBanner);
router.get('/getbannerbyid/:id',bannerController.getBannerById);
router.put('/putbanner/:id', upload.array('image'), bannerController.putBannerById);
router.delete('/deletebanner/:id',bannerController.deleteBannerById);


module.exports = router
