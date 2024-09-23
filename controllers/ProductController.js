const ProductModel = require("../models/ProductModel");
const FarmerModel = require("../models/FarmerModel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const fs = require("fs");


// Create a new product
const createProduct = async (req, res) => {
    try {
      const { honeyName, price, quantity } = req.body;
      const file = req.file;
        console.log(file);
        
      if (!honeyName || !price || !quantity) {
        return res.status(400).json({ message: "Please enter all fields." });
      }
  
  
      const { farmerId} = req.params;
      console.log(farmerId)
      if (!mongoose.Types.ObjectId.isValid(farmerId)) {
          return res.status(400).json({ message: 'Invalid ID format.' });}
      const farmerProduct = await FarmerModel.findById(farmerId);
  
      if (!farmerProduct) {
        return res.status(401).json("farmer is currently offline.");
      }
  
      const photo = await cloudinary.uploader.upload(file.path);
      console.log(photo);
      
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log("Failed to delete the file locally:", err);
        }
      });
  
      const newProduct = await ProductModel.create({
        farmers: farmerId,
        honeyName,
        farmerName: farmerProduct.firstName,
        quantity,
        price,
        productPicture: photo.secure_url,
    
      });
  
      farmerProduct.product.push(newProduct._id);
  
      await farmerProduct.save();
  
      res.status(201).json({
        message: "New Product created successfully.",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }; 

  const createHamperProduct = async (req, res) => {
    try {
      const { honeyName, price, quantity } = req.body;
      const file = req.file;
        console.log(file);
        
      if (!honeyName || !price || !quantity) {
        return res.status(400).json({ message: "Please enter all fields." });
      }
  
  
      const { farmerId} = req.params;
      console.log(farmerId)
      if (!mongoose.Types.ObjectId.isValid(farmerId)) {
          return res.status(400).json({ message: 'Invalid ID format.' });}
      const farmerProduct = await FarmerModel.findById(farmerId);
  
      if (!farmerProduct) {
        return res.status(401).json("farmer is currently offline.");
      }
  
      const photo = await cloudinary.uploader.upload(file.path);
      console.log(photo);
      
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log("Failed to delete the file locally:", err);
        }
      });
  
      const newProduct = await ProductModel.create({
        farmers: farmerId,
        honeyName,
        farmerName: farmerProduct.firstName,
        quantity,
        price,
        productPicture: photo.secure_url,
    
      });
  
      farmerProduct.product.push(newProduct._id);
  
      await farmerProduct.save();
  
      res.status(201).json({
        message: "New Product created successfully.",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }; 

const getAll = async (req, res) => {
  try {
    const product = await ProductModel.find();
    if (product.length <= 0) {
      return res.status(404).json({
        message: `No available products`,
      });
    } else {
      res
        .status(200)
        .json({ message: `All product ${product.length} `, data: product });
    }
  } catch (error) {
    res.status(500).json({
      status: "server error",
      Message: error.message,
    });
  }
};

const getAllHamper = async (req, res) => {
  try {
    const product = await ProductModel.find();
    if (product.length <= 0) {
      return res.status(404).json({
        message: `No available hamper products`,
      });
    } else {
      res
        .status(200)
        .json({
          message: `All hamper product ${product.length} `,
          data: product,
        });
    }
  } catch (error) {
    res.status(500).json({
      status: "server error",
      Message: error.message,
    });
  }
};

const getAllPendingPost = async (req, res) => {
  try {
    const pendingProducts = await ProductModel.find({
      productStatus: "pending",
    });

    if (pendingProducts.length > 0) {
      return res.status(200).json({
        message: `Below are ${pendingProducts.length} pending products.`,
        data: pendingProducts,
      });
    } else {
      return res.status(404).json({
        message: "No pending products found.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllApprovedPost = async (req, res) => {
  try {
    const approvedProducts = await ProductModel.find({
      productStatus: "approved",
    });

    if (approvedProducts.length > 0) {
      return res.status(200).json({
        message: `Below are ${approvedProducts.length} approved products.`,
        data: approvedProducts,
      });
    } else {
      return res.status(404).json({
        message: "No approved products found.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approvedProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    const WhatToApprove = await ProductModel.findById(productID);
    if (!WhatToApprove) {
      return res.status(404).json({
        message: `Product with ID was not found`,
      });
    }
    WhatToApprove.productStatus = "approved";
    // if(WhatToApprove.productStatus = "approved"){
    //     return res.status(404).json({
    //         message:"post has already been approved."
    //     })
    // }else{

    await WhatToApprove.save();
    res
      .status(200)
      .json({
        message: `your ${WhatToApprove.productID}, is now an approved`,
        data: WhatToApprove,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOne = async (req, res) => {
  try {
    const productID = req.params.productID;
    const oneProduct = await ProductModel.findById(productID);
    res.status(200).json({
      status: "succesful",
      message: "products below",
      data: oneProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "server error",
      Message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const user = await ProductModel.findById(productID);
    if (!user) {
      return res.status(404).json({
        message: `User not found.`,
      });
    }

    const productDelete = await ProductModel.findByIdAndDelete(productID);
    res.status(200).json({
      status: "succesful",
      message: "products deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "server error",
      Message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const userID = req.params.userID;
    const { honeyName, description, price } = req.body;
    const productUpdate = await ProductModel.findById({ userID });
    if (!productUpdate) {
      return res.status(400).json({
        message: "product not founder",
      });
    }
    const product = new ProductModel({
      honeyName: honeyName.trim(),
      description: description.trim(),
      price: price.trim(),
    });
    await product.save();
    res.status(201).json({
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getOne,
  getAll,
  deleteProduct,
  getAllHamper,
  updateProduct,
  approvedProduct,
  getAllApprovedPost,
  getAllPendingPost,
  createHamperProduct,
};
