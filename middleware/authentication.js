const jwt = require('jsonwebtoken');
const userModel = require(`../model/UserModel`)

const authorize = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            return res.status(401).json({
                message: 'Authorization required'
            });
        }

        const token = auth.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Action requires sign-in. Please log in to continue.'
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Authentication Failed: User not found'
            });
        }
        if(!user.isAdmin){
            return res.status(403).json({
                message:`Authentication failed: User is not allowed to access this route.`
            })
        }

        req.user = decodedToken;

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Oops! Access denied. Please sign in."
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Unauthorized: Not an admin" });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const isFarmer = async (req, res, next) => {
    try {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Unauthorized: Not an admin" });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  
  module.exports = {
    authorize,
    isAdmin,
    isFarmer
  };