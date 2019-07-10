const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route GET /:code
// @desc Redirect to long/original URL

// TODO: try to make it better and use promises 
router.get('/:code', async (req,res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code });

        if (url) {
            return res.redirect(url.longUrl); //redirect to found url
        } else {
            return res.status(404).json('No url found!');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error!");
    }
});
module.exports = router;

