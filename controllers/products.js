const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

router.patch('/:id', getProduct,async (req, res) => {
    if(req.body.qty != null) res.product.qty = req.body.qty;
    if(req.body.name != null) res.product.name = req.body.name;
    if(req.body.price != null) res.product.price = req.body.price;
    try{
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    }catch (e) {
        res.status(400).json({message:e.message})
    }
});

router.delete('/:id', getProduct, async (req, res) => {
    try {
        res.product.remove();
        res.json({message: 'Deleted Subscriber'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "Cannot find product!"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
    res.product = product;
    next()
}

module.exports = router;