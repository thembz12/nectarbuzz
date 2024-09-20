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


  const confirmOrder = async (req, res) => {
    try {
        const { customerFirstName, customerLastName, customerAddress, customerPhoneNumber, city, country } = req.body;
        const userId = req.user ? req.user._id : null;

        // Ensure the user is logged in
        if (!userId) {
            return res.status(400).json({ message: 'User is not authenticated' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the cart for the logged-in user
        const cart = await CartModel.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Populate merchant information for each item in the cart
        async function populateCartWithMerchantInfo(cart) {
            const cartItems = cart.items;
            for (let i = 0; i < cartItems.length; i++) {
                const productId = cartItems[i].product;
                const product = await ProductModel.findById(productId).populate('merchant');
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                cartItems[i].merchant = product.merchant;  // Attach the merchant to the cart item
            }
            cart.items = cartItems;
            return cart;
        }
        await populateCartWithMerchantInfo(cart);

        // Group products by merchants to avoid sending multiple emails to the same merchant
        const merchantOrders = {};
        cart.items.forEach(item => {
            const merchantId = item.merchant._id;
            if (!merchantOrders[merchantId]) {
                merchantOrders[merchantId] = {
                    merchant: item.merchant,
                    items: [],
                    total: 0
                };
            }
            merchantOrders[merchantId].items.push(item);
            merchantOrders[merchantId].total += item.quantity * item.price; // Calculate total for each merchant
        });

        // Calculate the total amount for the overall order (all products combined)
        const productTotal = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const deliveryCharge = 1050; // Fixed delivery charge
        const totalAmount = productTotal + deliveryCharge;

        // Create a new order
        const newOrder = await Order.create({
            user: userId,
            items: cart.items,
            totalAmount: totalAmount,
            customerFirstName: customerFirstName,
            customerLastName: customerLastName,
            customerAddress: customerAddress,
            customerPhoneNumber: customerPhoneNumber,
            city: city,
            country: country || 'Nigeria',
            orderStatus: 'Processing',
            paymentStatus: 'Paid'
        });

        // Link the order to the user
        user.orders.push(newOrder._id);
        await user.save();
        
        // Clear the user's cart after saving the order
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        // Prepare a list of additional users (admins, etc.) who will also receive order notifications
        const additionalUsers = await userModel.find({ role: 'admin' }); // Example: Find all admins
        const additionalEmails = additionalUsers.map(user => user.email);

        // Send confirmation email to the buyer
        await sendMail({
            subject: "Order Confirmation",
            email: user.email,
            html: orderMailTemplate(user.fullName, newOrder._id, newOrder.orderDate, newOrder.items, totalAmount, deliveryCharge),
        });

        // // Send a separate email to each merchant with the price specific to their products
        // for (const [merchantId, merchantOrder] of Object.entries(merchantOrders)) {
        //     const merchant = merchantOrder.merchant;
        //     const merchantItems = merchantOrder.items;
        //     const merchantTotal = merchantOrder.total;

        //     await sendMail({
        //         subject: "New Order Received",
        //         email: merchant.email,
        //         html: newOrderNotificationTemplate(
        //             merchant.businessName,
        //             user.fullName,
        //             user.phoneNumber,
        //             customerAddress,
        //             newOrder._id,
        //             newOrder.orderDate,
        //             merchantItems,
        //             merchantTotal
        //         ),
        //     });

        //     // Save order to the merchant's order list
        //     merchant.orders.push(newOrder._id);
        //     await merchant.save();
        // }

        // Send email notifications to the additional users (e.g., admins)
        for (const email of additionalEmails) {
            await sendMail({
                subject: "New Order Notification",
                email: email,
                html: adminOrderNotificationTemplate(
                    user.fullName,
                    user.phoneNumber,
                    customerAddress,
                    newOrder._id,
                    newOrder.orderDate,
                    cart.items,
                    totalAmount
                ),
            });
        }

        const cleanOrder = {
            user: newOrder.user,
            items: newOrder.items.map(item => ({
                productName: item.productName,
                quantity: item.quantity,
                price: formatter.format(item.price),
                productImage: item.productImage
            })),
            totalAmount: formatter.format(newOrder.totalAmount),
            customerFirstName: newOrder.customerFirstName,
            customerLastName: newOrder.customerLastName,
            customerAddress: newOrder.customerAddress,
            customerPhoneNumber: newOrder.customerPhoneNumber,
            city: newOrder.city,
            country: newOrder.country,
            orderStatus: newOrder.orderStatus,
            orderDate: newOrder.orderDate,
            _id: newOrder._id
        };

        res.status(201).json({
            message: "Order placed successfully",
            order: cleanOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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
    confirmOrder
  }