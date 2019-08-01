const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// get all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find()
        .sort('name');
    res.send(customers);
});

router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(err.details[0].message);

    var customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    customer = await customer.save();
    res.send(customer);
});

module.exports = router;