const ProductModel = require ("../model/ProductModel")
const FarmerModel = require ("../model/FarmerModel")
const cloudinary = require ("cloudinary")


const createProduct = async (req,res)=>{
    try { 
        const FarmerID = req.params.FarmerID
        const {honeyName, description, price}= req.body
        if(!honeyName || !description || !price){
            return res.status(400).json({message:"enter all fields"})
        }
        const productPoster = await FarmerModel.findById({FarmerID})
        if(!productPoster){
            return res.status(400).json({
                message: "farmer not founder"
            })
        }
        const file = req.file.path
        const image = await cloudinary.uploader.upload(file)
        const product = new ProductModel({
            honeyName: honeyName.trim(),
            description: description.trim(),
            price,
            productPicture:image.secure_url
        })
        await product.save()
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
        
        const getOne = async (req,res)=>{
            try {
                const productID = req.params.productID
                const oneProduct = await ProductModel.findById(productID)
                res.status(200).json({
                    status:"succesful",
                    message:"all products below",
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
                            message:"product posted successfully"
                        })
                        
                    } catch (error) {
                        res.status(500).json(error.message)
                        }}

module.exports = {createProduct, getOne, getAll, deleteProduct, updateProduct}
