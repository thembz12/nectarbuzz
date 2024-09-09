const mongoose = require(`mongoose`)
const customerSchema = new mongoose.Schema({
    firstName:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
          return capitalize;},required:[true,'Kindly enter your fullname']},
    lastName:{type:String,set: (entry) => {
        const capitalize =
        entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
        return capitalize;},required:[true,'Kindly enter your fullname']},
    phoneNumber:{
        type:Number,
        require:true,
        unique:true,
    },
    address:{type:String,set: (entry) => {
      const capitalize =
      entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
        return capitalize;},required:[true,'Kindly enter your address'],
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
    profilePicture: {
      pictureUrl: { type: String},
    },
    businessLicenseNo: {
      type:String,
      required:true
    },
    isVerified: {
      type: Boolean, 
      default: false 
  },
  isFarmer: {
    type: Boolean, 
    default: true 
},
  product:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
  blackList:[]
},{timestamps:true})

const FarmerModel = mongoose.model(`Farmers`,customerSchema)

module.exports = FarmerModel