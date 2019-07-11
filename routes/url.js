const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

//model 
const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Create short url

router.post('/shorten', async (req, res) => {
    const { longUrl, customUrl } = req.body;
    const baseUrl = config.get('baseUrl'); //url of our website


    //check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url!');
    }
    
    //if we have custom url we wont create the random one 
    let urlCode = '';
    if(customUrl){
        urlCode = customUrl;
    }
    else{
        urlCode = shortid.generate();
    }
    let usedCode = await Url.findOne({urlCode: urlCode});
    while (usedCode) {
        urlCode = shortid.generate();
        usedCode = await Url.findOne({urlCode: urlCode});
    }

    // TODO: use the promises in code below 
    //check longUrl 
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl});
            if (url) { 
                res.json(url); //returning found url
            }else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url); //returning freshly made url
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Server error!');
        }
    }else{
        res.status(401).json('Invalid input (url)');
    }

});


module.exports = router;

