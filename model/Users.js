// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const UsersSchema = mongoose.Schema(
    {
        username: {
          type: String,
        },
        email: {
          type: String,
          unique: true
        },
        password: {
          type: String,
          unique: true
        },
        phoneNumber: {
          type: String,
          required: true
        },
        profileImage: {
          type: String,
          default:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },
        isAdmin: {
            type: Boolean,
            // required: true,
            default: false 
          },
        capability: {
            type: String,
            enum: ['customer', 'editor', 'admin'],
            default: 'customer'
        },
        otpCode: {
            type: String,
            required: true
          },
        otpExpire: {
            type: String,
            required: true
          },
        status: {
            type: String,
            enum: ['0', '1'],
            default: '0'
          },
      },
      {
        timestamps: true
      }
);

// export default mongoose.model('Users', UsersSchema);
module.exports = mongoose.model('Users', UsersSchema);
