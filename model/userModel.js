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
      type:Number,
      require:true,
      unique:true,
      trim:true,
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
    profilePicture: {
      pictureUrl: { type: String},
    },
    cashBack: {
      type: Number,
    },
    blackList:[]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
