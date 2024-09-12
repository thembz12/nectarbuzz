const ProductModel = require ("../models/ProductModel")
const FarmerModel = require ("../models/FarmerModel")
const categoryModel = require ("../models/categoryModel")
const cloudinary = require ("cloudinary")
const path = require ("path")
const fs = require ("fs")


const createProduct = async (req,res)=>{
    try { 
        const categoryID = req.params.categoryID
        const FarmerID = req.params.farmerID
        const {honeyName, description, price}= req.body
        // if(!honeyName || !description || !price){
        //     return res.status(400).json({message:"enter all fields"})
        // }

        const farmerProduct = await FarmerModel.findById(FarmerID)
        if(!farmerProduct){
            return res.status(400).json({
                message: "farmer not founder"
            })
        }

        const category = await categoryModel.findById(categoryID);
      if (!category) {
        return res.status(401).json({
          message: "Category not found",
        });
      }

        
        const file = req.file.path

        console.log(path);
        
        const photo = await cloudinary.uploader.upload(file)
        // fs.unlink(file.path, (err) => {
        //   if (err) {
        //     console.log("unable to delete.", err);
        //   }
        // });
        const Newproduct = await ProductModel.create({
            Farmers : FarmerID, honeyName,
            farmerName: farmerProduct.firstName,
            farmerID: farmerProduct.businessLicenseNo,
            description: description.trim(),
            price,
            category: req.params.categoryID,
            farmerProduct: req.params.farmerID,
            productPicture:photo.secure_url
        })
        farmerProduct.product.push(Newproduct._id);
        category.Products.push(Newproduct._id);

        await farmerProduct.save()
        await category.save()
        res.status(201).json({
            message:"product posted successfully",
            data:product
        })
        
    } catch (error) {
        res.status(500).json(error.message)
        }}

        const getAll = async(req,res)=>{
            try {
             const users = await ProductModel.find()
             if(users.length <= 0){
                return res.status(404).json(`No available users`)
             }else{
                res.status(200).json({message:`Kindly find the ${users.length} registered users & students below`, data: users})
             }
        
            } catch (error) {
                res.status(500).json({
                    status:"server error",
                    errorMessage:error.message
                })
                
            }
        }

        const getAllPendingPost = async  (req,res)=>{
            try {

                const statusPending = await ProductModel.find()
                if(status.lenght = pending){
                    return res.status(200).json({
                        message:`below are ${pending.lenght} product waiting for approval`, data:status
                    })
                }
                
            } catch (error) {
                res.status(500).json(error.message)
                
            }
        }

        const getAllApprovedPost = async  (req,res)=>{
            try {

                const statusApproved = await ProductModel.find()
                if(status.lenght = approved){
                    return res.status(200).json({
                        message:`below are ${approved.lenght} product waiting for approval`, data:status
                    })
                }
                
            } catch (error) {
                res.status(500).json(error.message)
                
            }
        }

        const approvedProduct = async(req, res)=> {
            try {
                const {productID} = req.params
                const WhatToApprove = await ProductModel.findById(productID)
                if(!WhatToApprove){
                    return res.status(404).json(`User with ID ${productID} was not found`)
                }
                WhatToApprove.productStatus = true
                await user.save()
                res.status(200).json({message: `Dear ${WhatToApprove.productID}, is now an approved`, data: WhatToApprove})
            } catch (error) {
                res.status(500).json(error.message)
            }
        }
        const getOne = async (req,res)=>{
            try {
                const productID = req.params.productID
                const oneProduct = await ProductModel.findById(productID)
                res.status(200).json({
                    status:"succesful",
                    message:"products below",
                    data: oneProduct
                })
                
            } catch (error) {
                res.status(500).json({
                    status:"server error",
                    errorMessage:error.message
                })}}

        
                const deleteProduct = async (req,res)=>{
                    try {
                        const {userID} = req.params
                         const user = await ProductModel.findById(userID)
                         if(!user){
                         return res.status(404).json(`User not found.`)}
                    
                        const productDelete = await ProductModel.findByIdAndDelete(productID)
                        res.status(200).json({
                            status:"succesful",
                            message:"all products below",
                        })
                        
                    } catch (error) {
                        res.status(500).json({
                            status:"server error",
                            errorMessage:error.message
                        })
                        
                    }
                }

                const updateProduct = async (req,res)=>{
                    try {
                        const userID = req.params.userID
                        const {honeyName, description, price}= req.body
                        const productPoster = await ProductModel.findById({userID})
                        if(!productPoster){
                            return res.status(400).json({
                                message: "farmer not founder"
                            })
                        }
                        const product = new ProductModel({
                            honeyName: honeyName.trim(),
                            description: description.trim(),
                            price,
                            productPicture:image.secure_url
                        })
                        await product.save()
                        res.status(201).json({
                            message:"product updated successfully"
                        })
                        
                    } catch (error) {
                        res.status(500).json(error.message)
                        }}

module.exports = {createProduct, getOne, getAll, deleteProduct, updateProduct,approvedProduct,getAllApprovedPost, getAllPendingPost}
