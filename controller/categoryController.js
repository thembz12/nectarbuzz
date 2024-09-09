const categoryModel = require('../model/categoryModel');
const ProductModel = require('../model/ProductModel');

const newCategory = async (req, res) => {
    try {
        const { title } = req.body;

        // Validate that the 'title' is provided
        if (!title) {
            return res.status(400).json({ error: 'Invalid data provided' });
        }

        // Create a new category instance without any menus
        const newCategory = new categoryModel({ title });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error creating category',
            details: error.message
        });
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        if (categories.length === 0) {
            return res.status(404).json({
                message: 'There are no data in category database'
            })
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving categories',
            details: error.message
        });
    }
};


const oneCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id).populate('product');
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving categories',
            details: error.message
        });
    }
}



module.exports = {
    newCategory,
    getAllCategories,
    oneCategory,
};