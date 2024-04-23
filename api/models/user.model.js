// Import necessary modules
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,

  },
  address: {
    type: String,
    required: false,
  },
  
}, {
  timestamps:true
});

// Create User model
const User = mongoose.model("User", userSchema);

export default User;
