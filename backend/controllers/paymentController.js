const paymentService =require('../services/payment_service')
const createpayment = async (req, res) => {
    try {
        const {userId , amount, bankTransactionID } = req.body;
        const paymentProof = req.file.path;

        const newPayment = await paymentService.createPayment(userId, Number(amount), paymentProof, bankTransactionID);

        res.status(201).json({ status: 'success', message: 'Payment created successfully', data: newPayment });
    } catch (err) {
        console.error(err); 

        
        let userFriendlyMessage;

        if (err.name === 'ValidationError') {
            userFriendlyMessage = 'Please ensure all required fields are filled out correctly.';
        } else if (err.code === 'LIMIT_FILE_SIZE') {
            userFriendlyMessage = 'The uploaded file is too large. Please upload a file smaller than 2MB.';
        } else if (err.message.includes('not found')) {
            userFriendlyMessage = 'The specified user does not exist. Please check the user ID.';
        }
        else if (err.message.includes('Invalid payment amount')) {
  userFriendlyMessage = 'Invalid payment amount. Please pay 300 for 1 month, 500 for 3 months, or 1000 for 1 year.';
}

         else {
            userFriendlyMessage = 'An unexpected error occurred. Please try again later.';
        }

        res.status(400).json({ status: 'error', message: userFriendlyMessage });
    }
};
const getuserpayment =async (req,res)=>{
    try{
        const payment = await paymentService.getUserPayment(req.params.userId);
        res.json({ data:payment});

    }catch(error){
        res.status(500).json({message: 'can not get user payments',error:error.message});

    }
}//what should the response be
const getAllpayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.json({ data: payments });
    } catch (error) {
        console.error(error); // Log the error for server-side debugging

        // Generate a user-friendly error message
        res.status(500).json({
            message: 'Unable to retrieve payments at this time. Please try again later.',
            error: error.message 
        });
    }
};

const updatepaymentstatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const updatedPayment = await paymentService.updatePaymentAndMembership(id, status);

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment updated successfully', data: updatedPayment });
  } catch (err) {
    console.error(err);
     if (err.message.includes('rejected')) {
    return res.status(400).json({
      message: 'Your membership payment has been rejected. Please check your payment details and try again. If the issue persists, contact support for assistance.'
    });
  }
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports ={
    createpayment,
    getuserpayment,
    getAllpayments,
    updatepaymentstatus
};