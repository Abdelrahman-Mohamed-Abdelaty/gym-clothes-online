const express = require('express');
const {getAllProducts, getOneProduct, updateProduct, deleteProduct, createProduct, resizeProductPhotos,
    uploadProductPhotos
} = require("../controllers/productController");
const router = express.Router();

router.get('/',getAllProducts)
router.get('/:id',getOneProduct);
router.post('/',uploadProductPhotos,resizeProductPhotos,createProduct);
router.delete('/:id',deleteProduct);
router.patch('/:id',uploadProductPhotos,resizeProductPhotos,updateProduct)

module.exports = router;
// http://localhost:3000/img/products/product-1725283976484-1.jpeg to get photos