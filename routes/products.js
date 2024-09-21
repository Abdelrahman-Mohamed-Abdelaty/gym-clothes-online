const express = require('express');
const {getAllProducts, getOneProduct, updateProduct, deleteProduct, createProduct, resizeProductPhotos,
    uploadProductPhotos, validateImages
} = require("../controllers/productController");
const router = express.Router();

router.get('/',getAllProducts)
router.get('/:id',getOneProduct);
router.post('/',uploadProductPhotos,resizeProductPhotos,validateImages,createProduct);
router.delete('/:id',deleteProduct);

router.patch('/:id',uploadProductPhotos,resizeProductPhotos,updateProduct)

module.exports = router;
