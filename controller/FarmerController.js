const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const FarmerModel = require(`../model/FarmerModel.js`)
const cloudinary = require(`../config/cloudinary.js`)
const sendMail = require(`../helpers/email.js`);
const {
    verifyTemplate,
    forgotPasswordTemplate,
    signUpTemplate,
} = require(`../helpers/html.js`);

const farmerSignUp = async (req, res) => {
    
    try {
        const { firstName,lastName, businessLicenseNo, email, password, address, phoneNumber} = req.body;
        if(!firstName ||!lastName || !businessLicenseNo || !email || !password || !phoneNumber || !address ){
            return res.status(400).json(`Please enter all fields.`)
        }
       
        const emailExist = await FarmerModel.findOne({ email });
        if (emailExist) {
            return res.status(400).json(`User with email already exist.`);
        } else {
            //perform an encryption using salt
            const saltedPassword = await bcrypt.genSalt(10);
            //perform an encrytion of the salted password
            const hashedPassword = await bcrypt.hash(password, saltedPassword);
            // create object of the body
            const user = new FarmerModel({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.toLowerCase(),
                password: hashedPassword,
                address: address.trim(),
                businessLicenseNo,
                phoneNumber
            });

            const userToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.jwt_secret,
                { expiresIn: "20 Minutes" }
            );
            const verifyLink = `${req.protocol}://${req.get(
                "host"
            )}/api/v1/verify/${userToken}`;

            await user.save();
            await sendMail({
                subject: `Kindly Verify your mail`,
                email: user.email,
                html: signUpTemplate(verifyLink, user.firstName),
            });

            const motivationalQuotes = [
                "Welcome! Remember, the journey of a thousand miles begins with a single step. Let’s take that step together!",
                "Success is not final; failure is not fatal: It is the courage to continue that counts. Let's achieve greatness together!",
                "The future belongs to those who believe in the beauty of their dreams. Thank you for believing in yours with us!",
                "You’re capable of amazing things. We’re thrilled to be a part of your journey!",
                "Every great journey begins with a first step. Thank you for choosing us to be part of your adventure!"
            ];

            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

            res.status(201).json({
                message: `Welcome ${user.firstName}!${randomQuote}. KINDLY CHECK YOUR MAIL TO ACCESS THE LINK TO VERIFY YOUR EMAIL`,
                data: user,
            });
        }

    } catch (error){
        if (error.code === 11000) {
            const whatWentWrong = Object.keys(error.keyValue)[0];
            return res.status(500).json({ message: `A user with this ${whatWentWrong} exist. Please check your phoneNumber or email,either of them already exist.` });
          }else{
            res.status(500).json({
                message: 'An error occurred while processing your request.',
                errorMessage:error.message
            })
          }
     }}


const verifyEmail = async (req, res) => {
    try {
        // Extract the token from the request params
        const { token } = req.params;
        // Extract the email from the verified token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user with the email
        const user = await FarmerModel.findOne({ email });
        // Check if the user is still in the database
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        // Check if the user has already been verified
        if (user.isVerified) {
            return res.status(400).json({
                message: "User already verified",
            });
        }
        // Verify the user
        user.isVerified = true;
        // Save the user data
        await user.save();
        // Send a success response
        res.status(200).json({
            message: "User verified successfully",
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.json({ message: "Link expired." });
        }
        res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await FarmerModel.findOne({
            email
        });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found."}); }

        const confirmPassword = await bcrypt.compare(password,existingUser.password);
        if (!confirmPassword) {
            return res.status(404).json({
                message: "Incorrect Password." });}
        if (!existingUser.isVerified) {
            return res.status(400).json({
                message:
                    "User not verified, Please check you email to verify your account.",
            });
        }

        const token = await jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successfully",
            data: existingUser,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // Find the user with the email
        const user = await FarmerModel.findOne({ email });
        // Check if the user is still in the database
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if the user has already been verified
        if (user.isVerified) {
            return res.status(400).json({
                message: "User already verified."
            });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "20mins"
        });
        const verifyLink = `${req.protocol}://${req.get(
            "host"
        )}/api/v1/verify/${token}`;
        let mailOptions = {
            email: user.email,
            subject: "Verification email",
            html: verifyTemplate(verifyLink, user.firstName),
        };
        // Send the the email
        await sendMail(mailOptions);
        // Send a success message
        res.status(200).json({
            message: "Verification email resent successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        // Extract the email from the request body
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await FarmerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });
        const resetLink = `${req.protocol}://${req.get(
            "host"
        )}/api/v1/user/reset-password/${resetToken}`;

        // Send reset password email
        const mailOptions = {
            email: user.email,
            subject: "Password Reset",
            html: forgotPasswordTemplate(resetLink, user.firstName),
        };
        //   Send the email
        await sendMail(mailOptions);
        //   Send a success response
        res.status(200).json({
            message: "Password reset email sent successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Verify the user's token and extract the user's email from the token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await FarmerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Salt and hash the new password
        const saltedRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedRound);

        // Update the user's password
        user.password = hashedPassword;
        // Save changes to the database
        await user.save();
        // Send a success response
        res.status(200).json({
            message: "Password reset successful",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, existingPassword } = req.body;

        // Verify the user's token and extract the user's email from the token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await FarmerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Confirm the previous password
        const isPasswordMatch = await bcrypt.compare(
            existingPassword,
            user.password
        );
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Existing password does not match.",
            });
        }

        // Salt and hash the new password
        const saltedRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedRound);

        // Update the user's password
        user.password = hashedPassword;
        // Save the changes to the database
        await user.save();
        //   Send a success response
        res.status(200).json({
            message: "Password changed successful",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getOne = async (req, res) => {
    try {
        const {farmerID} = req.params

        const user = await FarmerModel.findOne({farmerID})
        if(!user){
            return res.status(404).json(`User not found.`)
        }
        res.status(200).json({
            message: `Dear ${user.firstName}, kindly find your information below:`,
            data: user
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const logOut = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];

        if(!token){
            return res.status(401).json({
                message: 'invalid token'
            })
        }
        // Verify the user's token and extract the user's email from the token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID
        const user = await CustomerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.blackList.push(token);
        // Save the changes to the database
        await user.save();
        //   Send a success response
        res.status(200).json({
            message: "User logged out successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const uploadDP = async (req, res) => {
    try {
      // Extract token from headers
      const token = req.headers.authorization.split(" ")[1];
  
      // Check if file is provided
      if (!req.file) {
        return res.status(400).json({ message: "No profile picture selected" });
      }
  
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET, async (error, decodedUser) => {
        if (error) {
          return res.status(400).json({ message: "Could not authenticate" });
        } else {
          const userID = decodedUser.id;
  
          // Find user to get the current profile picture
          const user = await FarmerModel.findById(userID);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
  
          // Upload new profile picture to Cloudinary
          const cloudProfile = await cloudinary.uploader.upload(req.file.path, { folder: "users_dp" });
  
          // Prepare update data
          const pictureUpdate = {
            profilePicture: {
              pictureUrl: cloudProfile.secure_url
            }
          };
  
          // Update user profile picture
          const updatedUser = await FarmerModel.findByIdAndUpdate(userID, pictureUpdate, { new: true });
  
          // Return success response
          return res.status(200).json({
            message: "User image uploaded successfully",
            data: updatedUser.profilePicture
          });
        }
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const userID = req.params.userID;
      const { firstName, lastName, phoneNumber, address } = req.body;
      const data = await FarmerModel.findById(userID)
      if(!data){
        return res.status(404).json({message:`user not found`})
      }

      
       
        data.firstName = firstName || data.firstName,
        data.lastName = lastName || data.lastName,
        data.phoneNumber = phoneNumber || data.phoneNumber,
        data.address = address || data.address

        await data.save()
  
      // Check if a file is uploaded
      if (req.file) {
        const cloudProfile = await cloudinary.uploader.upload(req.file.path, { folder: "user_dp" });
  
        data.profilePicture = {
          pictureUrl: cloudProfile.secure_url
        };
      }
  
      const updatedUser = await FarmerModel.findByIdAndUpdate(userID, data, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: `User with ID:${userID} not found. `});
      }
  
      res.status(200).json({
        message: `User with ID:${userID} was updated successfully.`,
         data:updatedUser
      });
    } catch (error) {
      res.status(500).json({ message: error.message });}
  };



module.exports = {farmerSignUp, loginUser, verifyEmail, resendVerificationEmail, resetPassword, forgotPassword,updateUser,uploadDP, changePassword, getOne, logOut}