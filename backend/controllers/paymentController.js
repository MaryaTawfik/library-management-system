const paymentService =require('../services/payment_service')
const createpayment = async (req,res)=>{
     try {
        const { userId, amount } = req.body;
        const paymentProof = req.file.path; // Get the URL of the uploaded file

        const newPayment = await paymentService.createPayment(userId, amount, paymentProof);
        res.status(201).json({ status: 'success', message: 'Payment created successfully', data: newPayment });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
const getuserpayment =async (req,res)=>{
    try{
        const payment = await paymentService.getUserPayment(req.params.userId);
        res.json({ data:payment});

    }catch(error){
        res.status(500).json({message: 'can not get user payments',error:error.message});

    }
}
const getAllpayments=async(req,res)=>{
    try{
    const payment = await paymentService.getAllPayments();
    res.json({ data:payment})}
    catch(error){
        res.status(500).json({message:'error can not get all payments', error: error.message})
    }
}

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
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports ={
    createpayment,
    getuserpayment,
    getAllpayments,
    updatepaymentstatus
};