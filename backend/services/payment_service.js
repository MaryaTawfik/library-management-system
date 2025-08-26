const Payment = require('../models/payment'); 
const User = require('../models/users');      

const createPayment = async (userId, amount, paymentProof) => {
  const newPayment = new Payment({ userId, amount, paymentProof }); 
  await newPayment.save();
  return newPayment;
};

const getAllPayments = async () => {
  return await Payment.find().populate('userId', 'firstName lastName email');
};

const updatePaymentAndMembership = 

 async (id, status) => {
  const payment = await Payment.findByIdAndUpdate(
    id,
    {
      status,
      approvedAt: status === 'approved' ? new Date() : null
    },
    { new: true }
  );

  if (!payment) throw new Error('Payment not found');


  if (status === 'approved') {
    await User.findByIdAndUpdate(payment.userId, {
      is_member: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
  } else if (status === 'rejected') {
    await User.findByIdAndUpdate(payment.userId, {
      is_member: false,
      expiryDate: null
    });
  }

  return payment;
};


const getUserPayment = async (userId) => {
  return await Payment.find({ userId });
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePaymentAndMembership,
  getUserPayment 
};
