const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your first name'],
        required:true
    },
    lastName:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your last name'],
          required:true
    },
    phoneNumber:{
      type:String,
      require:true,
      unique:true,
  },
    address:{type:String,set: (entry) => {
      const capitalize =
      entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
        return capitalize;},required:[true,'Kindly enter your address'],
        required:true
    },
    sex:{type:String,
      set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},
        enum: ["Male", "Female"],
        required:true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim:true
    },
    password: {
      type: String,
      require: true,
    },
    isVerified: {
        type: Boolean, 
        default: false 
    },
    isAdmin: { 
        type: Boolean,
        default: false 
    },
    profile:{type:String,
      default:"User"
    },
    orders: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order' 
  }],
    profilePicture: {
      pictureUrl: { type: String},
    },
    cashBack: {
      type: String,
      default: 0
    },
    blackList:[]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel; 