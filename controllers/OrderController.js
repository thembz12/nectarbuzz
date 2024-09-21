const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel");
const { orderMailTemplate, restaurantOrderMailTemplate } = require('../helpers/html');



const checkout = async (req, res) => {
    try {
        const {currentAddress} = req.body
      const userId = req.user._id
      if (!userId) {
        return res.status(400).json({ message: "User is not authenticated." });
    }
    const cart = await CartModel.find({user:userId})
    if(!cart){
        return res.status(400).json({
            message:"cart not found or cart is empty"
        })}

    let totalAmount = 0
    let itemNames = []

    try {
        for (const cartItem of cart.items) {
          const product = await ProductModel.findById(cartItem.product);
          if (!product) {
            //console.log(`Menu item not found for menu ID: ${cartItem.product}`);
            continue; 
          }
        itemNames.push(product.name)

        const itemTotal = cartItem.quantity * product.price
        totalAmount += itemTotal

        cartItem.itemTotal = itemTotal
        }
    } catch (error) {
        // Handle any errors that occur during the loop
        console.error('An error occurred while processing cart items:', error);
        res.status(500).json({ message: 'Failed to process cart items' });
        return; 
      }
      await cart.save()
      let cashBackAmount = 0
      try {
        if (discountedTotal >= 5000) {
          cashBackAmount = 100;
        }
      } catch (error) {
        console.error('An error occurred while calculating cash back amount:', error);
      }
  
      user.cashBack += cashBackAmount;

      const orderItems = cart.items.map((cartItem) => cartItem.menu);
      const userOrder = await OrderModel.create({
        items: orderItems,
        total: discountedTotal,
        customerFirstName: user.firstName,
        customerLastName:user.lastName,
        customerAddress:user.address,
        currentAddress,
        cashBack: cashBackAmount,
      });

    
    user.orders.push(userOrder._id);
    

    
    cart.itemNames = [];
    cart.totalAmount = 0;
    cart.cashBack = user.cashBack;
    await cart.save();

    // Save the user changes to the database
    await user.save();

    const response = {
        message: `Order successfully processed, Your cashback for this order is ${cashBackAmount}`,
        userOrder: {
          orderId: userOrder._id,
          items: itemNames,
          total: userOrder.totalAmount,
          customerName: userOrder.customerFirstName,
          customerAddress: userOrder.currentAddress,
          cashBack: userOrder.cashBack,
          orderDate: userOrder.orderDate,
          totalUserCashBack: user._id.cashBack,
        }
      };
      res.status(201).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during checkout", error: error.message });
    }
  }


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