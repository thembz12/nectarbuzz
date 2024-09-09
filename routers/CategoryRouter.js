const { newCategory, getAllCategories, oneCategory, getAllCategoriesByRestaurant } = require('../controllers/categoryController');
const router = require('express').Router();


router.post('/create-category',newCategory);
router.get('/all-categories',getAllCategories);
router.get('/category/:id',oneCategory);


module.exports = router