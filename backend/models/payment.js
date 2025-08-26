const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
    
  },
   paymentProof: {
  type: String,
  required: true,
  trim: true,
  default: 'https://via.placeholder.com/150',
},

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
approvedAt: {
    type: Date,
    
  },


}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
