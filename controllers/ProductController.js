const ProductModel = require ("../models/ProductModel")
const FarmerModel = require ("../models/FarmerModel")
const categoryModel = require ("../models/CategoriesModel")
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
        })}

        const file = req.file.path
        const photo = await cloudinary.uploader.upload(file)
        fs.unlink(file, (err) => {
          if (err) {
            console.log("unable to delete.", err);
          }
        });
        
        const Newproduct = await ProductModel.create({
            farmers : FarmerID, honeyName,
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
            data:farmerProduct
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
                res.status(200).json({message:`All product ${users.length} `, data: users})
             }
        
            } catch (error) {
                res.status(500).json({
                    status:"server error",
                    errorMessage:error.message
                })
                
            }
        }

        const getAllPendingPost = async (req, res) => {
            try {
                
                const pendingProducts = await ProductModel.find({ ProductStatus: 'pending' });
        
                if (pendingProducts.length > 0) {
                    return res.status(200).json({
                        message: `Below are ${pending.length} pending products.`,
                        data: pendingProducts,
                    });
                } else {
                    return res.status(404).json({
                        message: 'No approved products found.',
                    });
                }
                
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        };

        const getAllApprovedPost = async (req, res) => {
            try {
                
                const approvedProducts = await ProductModel.find({ ProductStatus: 'approved' });
        
                if (approvedProducts.length > 0) {
                    return res.status(200).json({
                        message: `Below are ${approvedProducts.length} approved products.`,
                        data: approvedProducts,
                    });
                } else {
                    return res.status(404).json({
                        message: 'No approved products found.',
                    });
                }
                
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        
        const approvedProduct = async(req, res)=> {
            try {
                const {productID} = req.params
                const WhatToApprove = await ProductModel.findById(productID)
                if(!WhatToApprove){
                    return res.status(404).json(`User with ID ${productID} was not found`)
                }
                WhatToApprove.productStatus = "approved"
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
                            message:"products deleted",
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
                        const productUpdate = await ProductModel.findById({userID})
                        if(!productUpdate){
                            return res.status(400).json({
                                message: "product not founder"
                            })
                        }
                        const product = new ProductModel({
                            honeyName: honeyName.trim(),
                            description: description.trim(),
                            price,
                            
                        })
                        await product.save()
                        res.status(201).json({
                            message:"product updated successfully",
                            data:product
                        })
                        
                    } catch (error) {
                        res.status(500).json(error.message)
                        }}

module.exports = {createProduct, getOne, getAll, deleteProduct, updateProduct,approvedProduct,getAllApprovedPost, getAllPendingPost}
