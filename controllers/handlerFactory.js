const APIFeature=require("../utils/APIFeature")
const catchAsync=require("../utils/catchAsync")
const AppError=require("../utils/appError")
const Tour = require("../models/product");
const {readFile} = require("node:fs");
const path = require("node:path");
const fs = require('fs').promises;

exports.deleteFactory=Model=>catchAsync (async (req,res,next)=>{
    const doc= await Model.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError("document is not found",404));
    }
    res.status(204).json({
        status:"success",
        data:null,
    })
})

exports.createFactory=Model=>catchAsync (async (req,res,next)=>{
    const document=await Model.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
            document
        }
    })
})
exports.updateFactory=Model=>catchAsync(async (req,res,next)=>{
    console.log(req.body);
    const doc= await Model.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
    });
    if(!doc){
        return next(new AppError("document is not found",404));
    }
    res.status(200).json({
        status:"success",
        data:{
            document:doc
        }
    })
    if(req.body.images){
        const promises= doc.images.map((image)=>{
            console.log(image);
           return fs.unlink(`public/img/products/${image}`)
        })
        await Promise.all(promises);
    }
})
exports.getOneFactory=(Model,populatOptions)=>catchAsync (async (req,res,next)=>{
    let query=  Model.findById(req.params.id);
    if(populatOptions){
        query=query.populate(populatOptions);
    }
    const document=await query;
    if(!document){
        return next(new AppError("document is not found",404));
    }
    res.status(200).json({
        status:"success",
        data:{
            document
        }
    })
})
exports.getAllFactory=Model=>catchAsync(async (req,res,next)=>{
    let filerObj={};
    const apiFeature= new APIFeature(Model.find(filerObj),req.query)
        .filter()
        .sort()
        .paginate()
        .limitFields();
    const documents=await apiFeature.query;
    res.status(200).json({
        status:"success",
        results:documents.length,
        data:{
            documents
        }
    })
});


