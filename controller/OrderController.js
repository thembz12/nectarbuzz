const OrderModel = require('../model/OrderModel');
const CartModel = require('../model/CartModel');
const ProductModel = require('../model/ProductModel');

// Place an order (buyer)
exports.placeOrder = async (req, res) => {
    const userID = req.user.userID;
    const { shippingAddress, paymentMethod } = req.body;

    try {
        // Find buyer's cart
        const cart = await CartModel.findOne({ user: userID }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total price
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
        }));

        const totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

        // Create the order
        const order = new OrderModel({
            user: buyerId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid: false,
        });

        // Save the order
        const createdOrder = await order.save();

        // Clear the cart after placing an order
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order: createdOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders for the buyer
exports.getMyOrders = async (req, res) => {
    const userID = req.user.userID;

    try {
        const orders = await OrderModel.find({ user: userID });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders for the admin (admin access)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({}).populate('buyer', 'firstName lastName email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status (admin access)
exports.updateOrderStatus = async (req, res) => {
    const orderID = req.params.orderID;
    const { status } = req.body;

    try {
        const order = await OrderModel.findById(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark an order as paid
exports.markAsPaid = async (req, res) => {
    const orderID = req.params.orderID;

    try {
        const order = await OrderModel.findById(orderID);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isPaid = true;
        order.orderDate = Date.now();

        await order.save();

        res.status(200).json({ message: 'Order marked as paid', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};