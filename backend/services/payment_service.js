const Payment = require('../models/payment'); 
const User = require('../models/users');      

const createPayment = async (userId, amount, paymentProof) => {
 
  if (![300, 500, 1000].includes(amount)) {
    throw new Error('Invalid payment amount. Must be 300, 500, or 1000.');
  }

  const newPayment = new Payment({ userId, amount, paymentProof }); 
  await newPayment.save();
  return newPayment;
};


const getAllPayments = async () => {
  return await Payment.find().populate('userId', ' userID firstName lastName email ');
};

// const updatePaymentAndMembership = 

//  async (id, status) => {
//   const payment = await Payment.findByIdAndUpdate(
//     id,
//     {
//       status,
//       approvedAt: status === 'approved' ? new Date() : null
//     },
//     { new: true }
//   );

//   if (!payment) throw new Error('Payment not found');


//   if (status === 'approved') {
//   let durationDays;

//   switch (payment.amount) {
//     case 300:
//       durationDays = 30; 
//       break;
//     case 500:
//       durationDays = 180; 
//       break;
//     case 1000:
//       durationDays = 365; 
//       break;
//     default:
//       throw new Error('Invalid payment amount');
//   }

//   const newExpiry = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
  

//   await User.findByIdAndUpdate(payment.userId, {
//     is_member: true,
//     expiryDate: newExpiry
//   });
// }
//  else if (status === 'rejected') {
//     await User.findByIdAndUpdate(payment.userId, {
//       is_member: false,
//       expiryDate: null
//     });
//   }

//   return payment;
// };

const updatePaymentAndMembership = async (id, status) => {
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
    let durationDays;

    switch (payment.amount) {
      case 300:
        durationDays = 30; 
        break;
      case 500:
        durationDays = 180; 
        break;
      case 1000:
        durationDays = 365; 
        break;
      default:
        throw new Error('Invalid payment amount');
    }

    const newExpiry = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

    // ✅ Extra safety: if already expired, deactivate immediately
    if (newExpiry < new Date()) {
      await User.findByIdAndUpdate(payment.userId, {
        is_member: false,
        expiryDate: null
      });
    } else {
      await User.findByIdAndUpdate(payment.userId, {
        is_member: true,
        expiryDate: newExpiry
      });
    }
  } 
  
  else if (status === 'rejected') {
    await User.findByIdAndUpdate(payment.userId, {
      is_member: false,
      expiryDate: null
    });
  }

  return payment;
};




const getUserPayment = async (userId) => {
  return await Payment.find({ userId: userId }).populate('userId', 'userID firstName lastName email');
};


const getBlockedUsers = async () => {
  return await User.find({ status: 'blocked' }).select('-password');
};



module.exports = {
  createPayment,
  getAllPayments,
  updatePaymentAndMembership,
  getUserPayment,
  getBlockedUsers 
};
