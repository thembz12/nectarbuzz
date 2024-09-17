const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel")
// Place an order (buyer)
// exports.placeOrder = async (req, res) => {
//     const userID = req.user.userID;
//     const { shippingAddress, paymentMethod } = req.body;

//     try {
//         // Find buyer's cart
//         const cart = await CartModel.findOne({ user: userID }).populate('items.product');
//         if (!cart || cart.items.length === 0) {
//             return res.status(400).json({ message: 'Cart is empty' });
//         }

//         // Calculate total price
//         const orderItems = cart.items.map(item => ({
//             product: item.product._id,
//             name: item.product.name,
//             quantity: item.quantity,
//             price: item.product.price
//         }));

//         const totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

//         // Create the order
//         const order = new OrderModel({
//             user: userID,
//             orderItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             isPaid: false,
//         });

//         // Save the order
//         const createdOrder = await order.save();

//         // Clear the cart after placing an order
//         cart.items = [];
//         await cart.save();

//         res.status(201).json({ message: 'Order placed successfully', order: createdOrder });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const OrderModel = require('./models/OrderModel'); // Adjust the path to your Order model
// const CartModel = require('./models/CartModel'); // Adjust the path to your Cart model
// const UserModel = require('./models/UserModel'); // Adjust the path to your User model
// const nodemailer = require('nodemailer');

 exports.checkout = async (req, res) => {
  try {
    const { userId, customerName, customerAddress, cashBackUsed } = req.body;

    // Fetch the cart for the user
    const userCart = await CartModel.findOne({ user: userId }).populate('items.product');
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }

    // Calculate the total cost and cashback
    const cartItems = userCart.items;
    const grandTotal = cartItems.reduce((total, item) => total + item.total, 0);
    const cashbackEarned = grandTotal * 0.02; // 2% cashback

    // Fetch the user to update their cashback
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Apply used cashback and update the user's total cashback
    user.cashback = (user.cashback || 0) + cashbackEarned - (cashBackUsed || 0);

    // Create the order based on cart contents
    const newOrder = new OrderModel({
      user: userId,
      total: grandTotal,
      customerName,
      customerAddress,
      cashBackUsed: cashBackUsed || 0,
      isPaid: false,
      orderDate: Date.now(),
    });

    // Save the new order and updated user data
    await newOrder.save();
    await user.save();

    // Send email notification to the user and admin
    await sendEmailNotification(user.email, customerName, grandTotal, cashbackEarned, newOrder._id);

    // Clear the cart (if you want to clear it after checkout)
    await CartModel.deleteOne({ user: userId });

    // Return success response
    res.status(201).json({
      message: "Order successfully created!",
      order: newOrder,
      cashbackEarned,
    });

  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "An error occurred during checkout.", error: error.message });
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
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};