const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');

// Add product to cart
exports.addToCart = async (req, res) => {
    const userID = req.user.userID;
    const { productID, quantity } = req.body;

    try {
        const product = await ProductModel.findById(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await CartModel.findOne({ user: userID });
        if (!cart) {
            cart = new CartModel({ user: userID, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);
        if (itemIndex > -1) {
            // If product exists in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If product does not exist, add new item
            cart.items.push({ product: productID, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View cart
exports.viewwCart = async (req, res) => {
    const userID = req.params.userID

    try {
        const cart = await CartModel.findOne({ buyer: buyerId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update item quantity in cart
exports.updateCart = async (req, res) => {
    const userID = req.user.userID;
    const { productID, quantity } = req.body;

    try {
        const cart = await CartModel.findOne({ buyer: userID });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    const userID = req.user.userID;
    const { productID } = req.params;

    try {
        const cart = await CartModel.findOne({ user: userID });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productID);

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    
    try {
        const userID = req.user.userID;
        const cart = await CartModel.findOne({ user: userID });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};