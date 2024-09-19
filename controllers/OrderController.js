const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel");
const { orderMailTemplate, restaurantOrderMailTemplate } = require('../helpers/html');



const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  });


//     // User to place an order
// const createOrder = async (req, res) => {
//     try {
//       const { userId } = req.user;
//       const { customerFirstName, customerLastName, customerAddress, customerPhoneNumber, city, country } = req.body;
  
//       // Find the user from the database
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Find the user's cart
//       const cart = await CartModel.findOne({ user: userId });
//       if (!cart || cart.items.length === 0) {
//         return res.status(404).json({ message: 'Cart not found or is empty' });
//       }
  
//       // Extract the restaurant's ID from the cart and find the restaurant
//       const productID = cart.product;
//       const product = await ProductModel.findById(productID);
  
//       // Calculate the total amount based on the items in the cart
//       let total = 0;
//       let itemNames = []
//       try {
//         for (const cartItem of cart.items) {
//           const menuItem = await menuModel.findById(cartItem.menu);
//           if (!menuItem) {
//             console.log(`Menu item not found for menu ID: ${cartItem.menu}`);
//             continue; // Skip to the next iteration
//           }
//           // Get the names of each item
//           itemNames.push(menuItem.name)
  
//           // Calculate the total price for the cart item based on the quantity and menu item price
//           const itemTotal = cartItem.quantity * menuItem.price;
//           total += itemTotal;
  
//           // Update the cart item's total price
//           cartItem.itemTotal = itemTotal;
//         }
//       } catch (error) {
//         // Handle any errors that occur during the loop
//         console.error('An error occurred while processing cart items:', error);
//         res.status(500).json({ message: 'Failed to process cart items' });
//         return; // Stop further processing
//       }
  
//       // Update the cart's total price
//       cart.grandTotal = total
//       await cart.save()
  
//       // Calculate cash back based on the total amount and the user's cashback toggle
//       let cashBackToUse = 0;
//       if (cashBack && user.cashBack === true) {
//         if (user.cashBack >= total) {
//           cashBackToUse = total
//         } else {
//           cashBackToUse = Math.min(user.cashBack, total);
//         }
//         // Return the user's cashBackToggle to false so as to make it optional for the next order
//         user.cashBack = false;
//       }
  
//       // Apply cash back to the current order
//       const discountedTotal = total - cashBackToUse;
  
//       // Update the user's cashback by subtracting the cashBackToUse from the user's current cashback
//       user.cashBack = user.cashBack - cashBackToUse;
  
//       // Calculate cash back amount for the next order
//       let cashBackAmount = 0;
//       try {
//         if (discountedTotal >= 2000) {
//           cashBackAmount = 60;
//         }
//       } catch (error) {
//         console.error('An error occurred while calculating cash back amount:', error);
//       }
  
//       // Add cashback amount to the existing cashback balance
//       user.cashBack += cashBackAmount;
  
//       // Create the order and save it to the database
//       const orderItems = cart.items.map((cartItem) => cartItem.menu);
//       const userOrder = await orderModel.create({
//         items: orderItems,
//         total: discountedTotal,
//         customerName: user.fullName,
//         customerAddress,
//         cashBackUsed: cashBackToUse,
//         cashBackOnOrder: cashBackAmount,
//       });
  
//       // Link the order to the user's 'orders' field and the restaunt's orders field
//       user.orders.push(userOrder._id);
//       restaurant.orders.push(userOrder._id);
  
//       // Clear the user's cart after placing the order
//       cart.restaurant = null
//       cart.items = [];
//       cart.grandTotal = 0;
//       cart.cashBack = user.cashBack;
//       await cart.save();
  
//       // Save the user changes to the database
//       await user.save();
//       await restaurant.save();
  
//       const subject = "Order Confirmation";
//       const html = await orderMailTemplate(user.fullName, userOrder._id, userOrder.orderDate, itemNames, userOrder.total);
//       const mail = {
//         email: user.email,
//         subject,
//         html,
//       };
//       sendEmail(mail);
  
//       const restSubject = "New Order Placed";
//       const html1 = await restaurantOrderMailTemplate(user.fullName, user.email, customerAddress, userOrder._id, userOrder.orderDate, itemNames, userOrder.total);
//       const restMail = {
//         email: restaurant.email,
//         subject: restSubject,
//         html: html1,
//       };
//       sendEmail(restMail);
  
//       const response = {
//         message: `Order successfully processed, Your cashback for this order is ${cashBackAmount}`,
//         userOrder: {
//           orderId: userOrder._id,
//           items: itemNames,
//           total: userOrder.total,
//           customerName: userOrder.customerName,
//           customerAddress: userOrder.customerAddress,
//           cashBackUsed: userOrder.cashBackUsed,
//           orderDate: userOrder.orderDate,
//           cashBackOnOrder: userOrder.cashBackOnOrder,
//           totalUserCashBack: user.cashBack,
//         }
//       };
  
//       res.status(201).json(response);
  
//     } catch (error) {
//       res.status(500).json({
//         message: 'Failed to create order',
//         error: error.message
//       });
//     }
//   };

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
    getAllOrders,
    //createOrder
}