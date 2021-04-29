/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const {Product} = require('../models/Product');


// fetching products

router.get('/', (req, res) => {
  Product.find({})
      .then((results) => {
        return res.status(200).send(results);
      });
});


// fetching products according to user's favourites


module.exports = router;
