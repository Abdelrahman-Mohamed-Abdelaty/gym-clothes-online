const Product = require('../models/product')
const {getAllFactory, deleteFactory, updateFactory, createFactory, getOneFactory} = require("./handlerFactory");


const sharp=require("sharp");
const multer=require('multer');
const AppError = require("../utils/appError");
const {promises: fs} = require("fs");
const multerStorage=multer.memoryStorage();

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        console.log("multer filter")
        console.log(file);
        cb(null,true);
    }else{
        cb(new AppError('Not an image! Please upload only images',400),false);
    }
}
const upload=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
})
exports.uploadProductPhotos=upload.fields([
    {name:'images',maxCount:2},
]);

exports.resizeProductPhotos=async (req,res,next)=>{
    console.log("before error")
    if(!req.files.images || req.files.images.length!==2) {
        delete req.body.images
        return next();
    }
    //2) images
    console.log("Hello error")
    req.body.images=[]
    await Promise.all(
        req.files.images.map(async (img,i)=>{
            const filename=`product-${Date.now()}-${i+1}.jpeg`
            await sharp(img.buffer)
                // .resize(2000,1333)
                .toFormat('jpeg')
                .jpeg({quality:90})
                .toFile(`public/img/products/${filename}`);
            req.body.images.push(filename);
        })
    )
    next();
}

exports.validateImages = (req,res,next)=>{
    if(!req.body.images || req.body.images.length!==2){
        return next(new AppError('You must add 2 image only for this product'));
    }
    next();
}

exports.getAllProducts=getAllFactory(Product);
exports.deleteProduct=deleteFactory(Product);
exports.updateProduct=updateFactory(Product);
exports.createProduct=createFactory(Product);
exports.getOneProduct=getOneFactory(Product);