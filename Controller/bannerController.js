const asyncHandler = require('express-async-handler');
const BannerModel = require('../Model/BannerModel');

// POST - Create a new dish
// POST - Create a new banner
exports.postBanner = asyncHandler(async (req, res) => {
    const files = req.files;
    
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageGroups = [];
    const groupSize = Math.ceil(files.length / 6); // Assuming you have 6 input groups

    for (let i = 0; i < files.length; i += groupSize) {
        const group = files.slice(i, i + groupSize).map(file => file.filename);
        imageGroups.push(group);
    }

    try {
        const newBanner = await BannerModel.create({
            imageGroups,
        });

        res.status(200).json({
            message: 'Documents uploaded successfully',
            banner: newBanner,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while uploading the documents' });
    }
});

// exports.postBanner = asyncHandler(async (req, res) => {
//     const files = req.files;
    
//     if (!files || files.length === 0) {
//         return res.status(400).json({ message: 'No files uploaded' });
//     }

//     const images = files.map(file => file.filename);

//     try {
//         const newBanner = await BannerModel.create({
//             image: images,
//         });

//         res.status(200).json({
//             message: 'Documents uploaded successfully',
//             banner: newBanner,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'An error occurred while uploading the documents' });
//     }
// });
// // GET - Fetch all dishes
exports.getBanner = asyncHandler(async (req, res) => {
    try {
        const response = await BannerModel.find();
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});

exports.getBannerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await BannerModel.findById(id);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});


// PUT - Update a dish by ID
exports.putBannerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const files = req.files || [];
    const imageGroups = [];
    const groupSize = Math.ceil(files.length / 6); // Adjust the group size as needed

    for (let i = 0; i < files.length; i += groupSize) {
        const group = files.slice(i, i + groupSize).map(file => file.filename);
        imageGroups.push(group);
    }

    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            console.error('Invalid ID format.');
            return res.status(400).json({ err: 'Invalid ID format.' });
        }

        const banner = await BannerModel.findById(id);
        if (!banner) {
            console.error('Banner not found.');
            return res.status(404).json({ err: 'Banner not found.' });
        }

        const update = {
            ...(files.length && { imageGroups })
        };

        const updatedData = await BannerModel.findByIdAndUpdate(id, { $set: update }, { new: true });
        res.status(200).json(updatedData);
    } catch (err) {
        console.error('Error while updating data:', err);
        res.status(500).json({ err: 'Error while updating data', message: err.message });
    }
});

// exports.putBannerById = asyncHandler(async (req, res) => {
//     const { id } = req.params;
  
//     // Process files if present
//     const files = req.files || [];
//     const image = files.map(file => file.filename);
  
//     try {
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             console.error('Invalid ID format.');
//             return res.status(400).json({ err: 'Invalid ID format.' });
//         }
  
//         // Check if the dish exists
//         const banner = await BannerModel.findById(id);
//         if (!banner) {
//             console.error('banner not found.');
//             return res.status(404).json({ err: 'banner not found.' });
//         }
  
//         const update = {
//          ...(files.length && { image })
//         };
  
//         const updatedData = await BannerModel.findByIdAndUpdate(id, { $set: update }, { new: true });
//         res.status(200).json(updatedData);
//     } catch (err) {
//         console.error('Error while updating data:', err);
//         res.status(500).json({ err: 'Error while updating data', message: err.message });
//     }
// });

// DELETE - Delete a dish by ID
exports.deleteBannerById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await BannerModel.findByIdAndDelete(id);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'An error occurred while deleting data' });
    }
});
