const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 
 amount: {
  type: Number,
  required: true,
  enum: {
    values: [300, 500, 1000],
    message: 'Amount must be one of 300, 500, or 1000'
  }
},

   paymentProof: {
  type: String,
  required: true,
  trim: true,
  
},
bankTransactionID:{
  type: String,
  
  trim : true,
  unique: true

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
