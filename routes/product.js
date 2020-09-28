
const express = require('express');
const productController = require('../controller/product');
const router = express.Router();

router.post('/postProduct', productController.postProduct);
router.get('/getproductbyid', productController.getProductById);
router.post('/editProduct', productController.postEditProduct);
router.get('/getproducts', productController.getProducts);
router.post('deleteproduct',productController.postDeleteProduct);
module.exports = router;