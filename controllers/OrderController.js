const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel");
const { orderMailTemplate, restaurantOrderMailTemplate } = require('../helpers/html');


// const checkout = async (req,res)=>{
//     try {
//         const cart = await CartModel.find({user: userID})
//         if(!cart){
//             res.status(400).json({
//                 message:"cart not found"})
//         }
//         user.cashback =
        
//      }catch (error) {
//         res.status(500).json(error.message)
        
//     }



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


const getAllOrders = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
  
        // Find the user from the database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Find all orders for the user
        const orders = await Order.find({ _id: { $in: user.orders } })
            .sort({ orderDate: -1 })
            .populate("items");
        
        // Check if orders are empty
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found for this user.' });
        }
  
        // Return orders if they exist
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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


module.exports = {
    getAllOrders
  }