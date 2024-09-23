const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel");
const { orderMailTemplate, restaurantOrderMailTemplate, adminOrderMailTemplate } = require('../helpers/html');
const sendMail = require('../helpers/email');


const checkout = async (req, res) => {
    try {
        const { currentAddress } = req.body;
        const userId = req.user._id;

        // Check if user is authenticated
        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated." });
        }

        // Find user's cart
        const cart = await CartModel.findOne({ user: userId });
        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart not found or cart is empty"
            });
        }

        // Initialize variables for total amount and item names
        let totalAmount = 0;
        let itemNames = [];

        // Process cart items
        try {
            for (const cartItem of cart.items) {
                const product = await ProductModel.findById(cartItem.product);
                if (!product) {
                    console.log(`Product not found for product ID: ${cartItem.product}`);
                    continue; 
                }
                
                itemNames.push(product.name);
                const itemTotal = cartItem.quantity * product.price;
                totalAmount += itemTotal;
                cartItem.itemTotal = itemTotal; // Optionally store item total in the cart
            }
        } catch (error) {
            console.error('An error occurred while processing cart items:', error);
            return res.status(500).json({ message: 'Failed to process cart items' });
        }

        // Save updated cart
        await cart.save();

        //  let cashBackAmount = 0;
        // if (totalAmount <= 5000) {
        //  cashBackAmount = 15;
        //     } else {
        //  cashBackAmount = totalAmount * 0.002;
        //  }

        // Retrieve user information
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //user.cashBack += cashBackAmount;

        // Create a new order
        const orderItems = Array.isArray(cart.items) ? cart.items.map((cartItem) => cartItem.product) : [];
        const userOrder = await OrderModel.create({
            user: userId,
            items: orderItems,
            totalAmount,
            customerFirstName: user.firstName,
            customerLastName: user.lastName,
            customerAddress: user.address,
            currentAddress, 
            //cashBack: cashBackAmount,
        });

        // Add order to user's orders
        user.orders.push(userOrder._id);

        // Clear cart
        cart.items = [];
        cart.totalAmount = 0;
        //cart.cashBack = user.cashBack;
        await cart.save();

        // Save updated user
        await user.save();
        
    const subject = "Order Confirmation";
    const html = await orderMailTemplate(user.firstName, userOrder._id, userOrder.orderDate, itemNames, userOrder.totalAmount);
    const mail = {
      email: user.email,
      subject,
      html,
    };
    sendMail(mail);

    const restSubject = "New Order Placed";
    const html1 = await adminOrderMailTemplate(user.firstName, user.email, currentAddress, userOrder._id, userOrder.orderDate, itemNames, userOrder.total);
    const adminMailOrder = {
      email: user.email,
      subject: restSubject,
      html: html1,
    };
    sendMail(adminMailOrder);
    //console.log({ cashBackAmount, userId, totalAmount, cart });

        // Response data
        const response = {
            message: `Order successfully processed.`,
            userOrder: {
                orderId: userOrder._id,
                items: orderItems,
                total: userOrder.totalAmount,
                customerName: `${userOrder.customerFirstName} ${userOrder.customerLastName}`,
                customerAddress: userOrder.currentAddress,
                //cashBack: userOrder.cashBack,
                orderDate: userOrder.createdAt,
                orderStatus:userOrder.orderStatus,
                country:userOrder.country,
            }
        };

        // Send response
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during checkout", error: error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
  
        // Find the user from the database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Find all orders for the user
        const orders = await OrderModel.find({ _id: { $in: user.orders } })
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
    getAllOrders,
    checkout

  }