const bookService=require('../services/bookService')

const getAll = async(req,res)=>{
    
    try{
        const books = await bookService.getAllBooks()
        
        res.json({status:'success' , data:books || [] })
    }catch(err){
        res.status(500).json({status:'error' , message:err.message})
    }  
};
const getOne = async(req,res)=>{
    const id = req.params.id;
    try{
       const oneBook =  await bookService.getBookById(id);
       if (!oneBook){
        return res.status(404).json({message:'Book not found'})
       }
       res.json(oneBook)
    }catch(err){
        console.log(err)
    }
    
};
const create = async (req, res) => {
  try {
    const {
      title,
      author,
      publishedYear,
      catagory,
      totalcopies,
      avaliablecopies,
      isbn,
      pages,
      description
    } = req.body;

    const imageUrl = req.file ? req.file.path : undefined; // From Cloudinary

    const newBook = await bookService.createBook(
      title,
      author,
      publishedYear,
      catagory,
      totalcopies,
      avaliablecopies,
      isbn,
      pages,
      description,
      imageUrl
    );

    res.status(201).json({
      status: 'success',
      message: 'Created successfully',
      data: newBook
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};


    

const update = async(req,res)=>{
    const id = req.params.id;
    const updatedData=req.body;
    try{
        const updatedBook = await bookService.updateBook(id , updatedData)
        if(!updatedBook){
            return res.status(400).json({message:'Book not found'})
        }
        res.json(updatedBook)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error', error: err.message });
}

    }
    

const remove = async(req,res)=>{
    const id=req.params.id
    try{
       const deleted = await bookService.deleteBook(id)
        if(!deleted){
            return res.status(404).json('Book is not found')
       
        }
        res.json({message:'Book is deleted'})

    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
    
}

module.exports={
    getAll ,
    getOne,
    create,
    remove,
    update
}
