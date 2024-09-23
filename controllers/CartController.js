const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel'); 
const mongoose = require ('mongoose')

// const formatter = new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     minimumFractionDigits: 2
//   });

const addToCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        const qty = Number(quantity)
        // Ensure user is authenticated and extract the userId from req.user
        const userId =  req.user._id; 
        
        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated." });
        }

        // Ensure valid quantity is provided
        if (!qty || qty <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive number." });
        }

        // Find the product by its ID
        const product = await ProductModel.findById(productID);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Find the user's cart, or create a new one if it doesn't exist
        let cart = await CartModel.findOne({ user: userId })
        if (!cart) {
            cart = new CartModel({
                user: userId,  // Ensure the user is attached to the cart
                items: [],
                totalPrice: 0,
            });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);

        if (itemIndex > -1) {
            // If the product exists in the cart, update the quantity
            cart.items[itemIndex].quantity += qty;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.items.push({
                product: productID,
                honeyName: product.honeyName,
                quantity,
                price: Number(product.price),
                productPicture: product.productPicture,
                farmers: product.farmers
            });
        }

        // Recalculate the total price of the cart
        cart.totalPrice = cart.items.reduce((acc, item) =>Number (acc )+Number (item.quantity) *Number (item.price), 0);

        // Save the cart back to the database
        await cart.save();
        

          const data = {
              items: cart.items.map(item => ({
                productId: item.product, // replace product with productId for clarity
                productName: item.productName,
                quantity: item.quantity,
                price: (item.price),
                productPicture: item.productPicture,
              })),
              totalPrice: (cart.totalPrice),
            }
        

        res.status(200).json({
            message: "Item added to cart successfully.",
            data  // Send formatted prices
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const viewCart = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User is not authenticated." });
      }
      const userId = req.user._id;
      const cart = await CartModel.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
      }
  
      const data = {
          items: cart.items.map(item => ({
            productID: item.product, // replace product with productId for clarity
            honeyName: item.honeyName,
            quantity: item.quantity,
            price: (item.price),
            productPicture: item.productPicture,
          })),
          totalPrice: (cart.totalPrice),
      };
      res.status(200).json({ data  });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const increaseItemQuantity = async (req, res) => {
      try {
        //   console.log(req.user)
          const userId = req.user._id
        //   console.log(userId)
      
		if (!userId) {
			return res.status(400).json({ message: "User is not authenticated." });
		}
		

        const { productID, quantity } = req.body;
        //const qty = parseInt(quantity);
        const qty = Number(quantity)
        if (!qty || qty <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive number." });
        }

        const cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        // Increase the item quantity
        cart.items[itemIndex].quantity += qty;

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        console.log(typeof cart.totalPrice)
        
         const  data = {
                items: cart.items.map(item => ({
                    productID: item.product,
                    honeyName: item.honeyName,
                    quantity: item.quantity,
                    price: Number(item.price),
                    productPicture: item.productPicture,
                })),
                totalPrice: cart.totalPrice,
            }
        console.log(data.totalPrice)
        await cart.save();

        res.status(200).json({ message: "Item quantity increased successfully.", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const reduceItemQuantity = async (req, res) => {
  try {
      const userId = req.user._id
      if (!userId) {
          return res.status(400).json({ message: "User is not authenticated." });
      }

      const { productID, quantity } = req.body;
      const qty = Number(quantity)
      if (!quantity || quantity <= 0) {
          return res.status(400).json({ message: "Quantity must be a positive number." });
      }

      const cart = await CartModel.findOne({ user: userId });
      if (!cart) {
          return res.status(404).json({ message: "Cart not found." });
      }

      const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);
      if (itemIndex === -1) {
          return res.status(404).json({ message: "Item not found in cart." });
      }

      // Reduce the item quantity
      cart.items[itemIndex].quantity -= quantity;

      // If the quantity reaches 0 or below, remove the item from the cart
      if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
      }

      // Recalculate the total price
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

      await cart.save();

         const data = {
              items: cart.items.map(item => ({
                  productID: item.product,
                  honeyName: item.honeyName,
                  quantity: item.quantity,
                  price: Number(item.price),
                  productPicture: item.productPicture,
              })),
              totalPrice: cart.totalPrice,
          }
          await cart.save()

      res.status(200).json({ message: "Item quantity reduced successfully.", data });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const removeItemFromCart = async (req, res) => {
	try {
		const userId = req.user._id
        // console.log(req.user)
        // console.log(userId)
		if (!userId) {
			return res.status(400).json({ message: "User is not authenticated." });
		}
		const { productID } = req.body;
		const cart = await CartModel.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found." });
		}
		const itemIndex = cart.items.findIndex(item => item.product.toString() === productID);
		if (itemIndex === -1) {
			return res.status(404).json({ message: "Item not found in cart." });
		}
		cart.items.splice(itemIndex, 1);

		cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

		await cart.save();
        
           const data = {
              items: cart.items.map(item => ({
                productID: item.product, // replace product with productId for clarity
                honeyName: item.honeyName,
                quantity: item.quantity,
                price: Number(item.price),
                productPicture: item.productPicture,
              })),
              totalPrice: cart.totalPrice,
            }
        
		res.status(200).json({ message: "Item removed from cart successfully.", data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


const clearCart = async (req, res) => {
	try {
        
		const userId = req.user._id;
		if (!userId) {
			return res.status(400).json({ message: "User is not authenticated." });
		}
		const cart = await CartModel.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found." });
		}
		cart.items = [];
		cart.totalPrice = 0;
		await cart.save();
		res.status(200).json({ message: "Cart cleared successfully." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { addToCart, viewCart, increaseItemQuantity, reduceItemQuantity, removeItemFromCart, clearCart};