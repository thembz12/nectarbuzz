const OrderModel = require('../models/OrderModel');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require ("../models/UserModel");
const { orderMailTemplate, restaurantOrderMailTemplate } = require('../helpers/html');


// // User to place an order
// const checkout = async (req, res) => {
//     try {
//       const { userID } = req.user;
//       const {customerFirstName, customerLastName,customerPhoneNumber, customerAddress,city,country } = req.body;
  
//       // Find the user from the database
//       const user = await UserModel.findById(userID);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Find the user's cart
//       const cart = await CartModel.findOne({ user: userID });
//       if (!cart || cart.items.length === 0) {
//         return res.status(404).json({ message: 'Cart not found or is empty' });
//       }
  
//       // Extract the restaurant's ID from the cart and find the restaurant
//       const restaurantId = cart.restaurant;
//       const restaurant = await restaurantModel.findById(restaurantId);
  
//       // Calculate the total amount based on the items in the cart
//       let total = 0;
//       let itemNames = []
//       try {
//         for (const cartItem of cart.items) {
//           const prodcutItem = await ProductModel.findById(cartItem.product);
//           if (!prodcutItem) {
//             console.log(`Menu item not found for menu ID: ${cartItem.menu}`);
//             continue; // Skip to the next iteration
//           }
//           // Get the names of each item
//           itemNames.push(prodcutItem.name)
  
//           // Calculate the total price for the cart item based on the quantity and menu item price
//           const itemTotal = cartItem.quantity * prodcutItem.price;
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
  
  
//       // Add cashback amount to the existing cashback balance
//       user.cashBack += cashBackAmount;
  
//       // Create the order and save it to the database
//       const orderItems = cart.items.map((cartItem) => cartItem.product);
//       const userOrder = await OrderModel.create({
//         items: orderItems,
//         total: discountedTotal,
//         customerName: user.firstName,
//         customerName: user.lastName,
//         customerAddress,
//         cashBack: cashBack,
        
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
//       const html = await orderMailTemplate(user.firstName, userOrder._id, userOrder.orderDate, itemNames, userOrder.total);
//       const mail = {
//         email: user.email,
//         subject,
//         html,
//       };
//       sendEmail(mail);
  
//       const restSubject = "New Order Placed";
//       const html1 = await restaurantOrderMailTemplate(user.firstName, user.email, customerAddress, userOrder._id, userOrder.orderDate, itemNames, userOrder.total);
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
//           customerName: userOrder.customerFirstName,
//           customerAddress: userOrder.customerAddress,
//           cashBack: userOrder.cashBack,
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
// const checkout = async (req, res) => {
//     try {
//       const userID = req.body.userID; // Assuming userId is passed in request body
//       const productID = req.params.productID; // Assuming userId is passed in request body
  
      
//       const product = await ProductModel.findById(productID)
//       if(!product){
//         res.status(400);json({
//             message:"product not found"
//         })
//       }

//       // Ensure userId is provided
//       if (!userID) {
//         return res.status(400).json({ message: "User ID is required" });
//       }
  
//       // Fetch the user's cart
//       const cart = await CartModel.findOne({ user: userID }).populate('items.product');
  
//       // Check if cart exists or has items
//       if (!cart || cart.items.length === 0) {
//         return res.status(400).json({ message: "Cart is empty" });
//       }

  
//       // Calculate the total amount
//       let totalAmount = 0;
  
//       const orderItems = cart.items.map((item) => {
//         const price = parseFloat(item.price);
//         const quantity = parseInt(item.quantity);
//         totalAmount += price * quantity;

        
//         return {
//           product: item.product._id,
//           honeyName: item.honeyName,
//           quantity: quantity,
//           price: item.price,
//           productPicture: item.productPicture || item.product.productPicture
//         };
//       });
  
//       // Apply 2% cashback
//       const cashback = (totalAmount * 2) / 100;
//       const finalTotalAmount = totalAmount - cashback;
  
//       // Fetch user for cashback addition
//       const user = await UserModel.findById(userID);
//       if (!user) {
//         return res.status(400).json({ message: "User not found" });
//       }
  
//       // Add cashback to the user's cashback balance
//       user.cashBack = (user.cashBack || 0) + cashback;
//       await user.save();
  
//       // Create the order
//       const newOrder = new OrderModel({
//         user: mongoose.Types.ObjectId(userID),
//         items: orderItems,
//         totalAmount: finalTotalAmount,
//         customerFirstName: req.body.customerFirstName,
//         customerLastName: req.body.customerLastName,
//         customerAddress: req.body.customerAddress,
//         customerPhoneNumber: req.body.customerPhoneNumber,
//         city: req.body.city,
//         country: req.body.country || 'Nigeria',
//         orderStatus: 'Processing'
//       });
  
//       // Save the order to the database
//       const savedOrder = await newOrder.save();
  
//       // Clear the user's cart after successful checkout
//       await CartModel.findOneAndDelete({ user: userID });
  
//       // Send response back to the client
//       res.status(201).json({ 
//         message: "Checkout successful", 
//         order: savedOrder, 
//         cashback: cashback,
//         totalAmount: finalTotalAmount 
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error during checkout", error: error.message });
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
    //checkout

  }