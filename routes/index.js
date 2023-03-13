const express = require('express');
const router = express.Router();

const storeModule = require("./storeModule");

const listProducts			= storeModule.listProducts;
const saveOrder				= storeModule.saveOrder;
const listOrders			= storeModule.listOrders;
const listOrdersByCustomer	= storeModule.listOrdersByCustomer;
const adminProducts			= storeModule.adminProducts;
const adminUpdate			= storeModule.adminUpdate;
const restProduct			= storeModule.restProduct;
const restOrder				= storeModule.restOrder;

router.get('/', (req, res, next) => {
  res.redirect('/listProducts');
});

router.get('/listProducts', 			listProducts);

router.post('/listProducts/add', 		saveOrder);

router.get('/listOrders/',				listOrders);

router.get('/listOrders/:customer',		listOrdersByCustomer);

router.get('/adminProducts',			adminProducts);

router.post('/adminUpdate',				adminUpdate);

router.get('/rest/',					restProduct);

router.get('/restOrder',				restOrder);

module.exports = router;
