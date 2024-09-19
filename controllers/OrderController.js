// const OrderModel = require('../models/OrderModel');
// const CartModel = require('../models/CartModel');
// const ProductModel = require('../models/ProductModel');
// const UserModel = require ("../models/UserModel");
// const { orderMailTemplate, restaurantOrderMailTemplate } = require('../helpers/html');



// const formatter = new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     minimumFractionDigits: 2
//   });


    
//          // Create order function
//         async function createOrder(userID) {
            
//           try {
//             // 1. Get the user's cart
//             const cart = await CartModel.findOne({ user: userID, isCheckedOut: false }).populate('items.product');
//             if (!cart || cart.items.length === 0) {
//               throw new Error('Cart is empty. Please add items to the cart.');
//             }
        
//             // 2. Calculate total price using cart's `calculateTotalPrice` method
//             const totalPrice = cart.calculateTotalPrice();
        
//             // 3. Fetch the user details
//             const user = await UserModel.findById(userID);
//             if (!user) {
//               throw new Error('User not found.');
//             }
        
//             // 4. Create the order from the cart
//             const formattedOrder = {
//                 data : {
//               user: userID,
//               items: cart.items.map(item => ({
//                 product: item.product._id,
//                 honeyName: item.honeyName,
//                 quantity: item.quantity,
//                 price: formatter.format(item.price),
//                 productPicture: item.productPicture
//               })),
//               totalAmount:  formatter.format.totalPrice,
//               customerFirstName: user.firstName,
//               customerLastName: user.lastName,
//               customerAddress: user.address,
//               customerPhoneNumber: user.phoneNumber,
//               city: 'Lagos', // Assuming city and country are predefined
//               country: 'Nigeria',
//               orderStatus: 'Processing'
//             }};
//             const order = new OrderModel(orderData);
//             await order.save();
        
//             // 5. Calculate and credit 2% cashback to the user's account
//             const cashback = totalPrice * 0.02;
//             user.cashBack = (user.cashBack || 0) + cashback;
//             await user.save();
        
//             // 6. Mark the cart as checked out
//             cart.isCheckedOut = true;
//             await cart.save();
        
//             // 7. Send email to the user
        
//                 await sendMail({
//                     subject: `Kindly Verify your mail`,
//                     email: user.email,
//                     html: orderMailTemplate(verifyLink, user.firstName),
//                 });
            
    
        
//             // 8. Send email to the admin
//             await sendMail({
//                 subject: `Kindly Verify your mail`,
//                 email: user.email,
//                 html: restaurantOrderMailTemplate(verifyLink, user.firstName),
//             });
        
        
//             // 9. Return the created order
//             return { success: true, order };
        
//           } catch (error) {
//             console.error('Error creating order:', error);
//             return { success: false, message: error.message };
//           }
//         }
        
//         // Sample usage
//         createOrder(userID)  // Replace 'user-id' with an actual user ID from your database
//           .then(response => {
//             if (response.success) {
//               console.log('Order created successfully:', response.order);
//             } else {
//               console.log('Order creation failed:', response.message);
//             }
//           })
//           .catch(error => console.error('Unexpected error:', error));


// // Get all orders for the buyer
// exports.getMyOrders = async (req, res) => {
//     const userID = req.user.userID;

//     try {
//         const orders = await OrderModel.find({ user: userID });
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// const getAllOrders = async (req, res) => {
//     try {
//         const userId = req.user ? req.user._id : null;
  
//         // Find the user from the database
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
  
//         // Find all orders for the user
//         const orders = await Order.find({ _id: { $in: user.orders } })
//             .sort({ orderDate: -1 })
//             .populate("items");
        
//         // Check if orders are empty
//         if (orders.length === 0) {
//             return res.status(200).json({ message: 'No orders found for this user.' });
//         }
  
//         // Return orders if they exist
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

// // Mark an order as paid
// exports.markAsPaid = async (req, res) => {
//     const orderID = req.params.orderID;

//     try {
//         const order = await OrderModel.findById(orderID);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         order.isPaid = true;
//         order.orderDate = Date.now();

//         await order.save();

//         res.status(200).json({ message: 'Order marked as paid', order });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// module.exports = {
//     getAllOrders,
//     createOrder
// }