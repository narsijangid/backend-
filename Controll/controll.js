const fs = require("fs")
const data = JSON.parse(fs.readFileSync('data.json'))
const model = require("../Model/Product")
const Prods = model.Product



exports.GetAllDataApi = async (req,res)=>{
    let Comedata = await Prods.find()
    res.json(Comedata)
}



exports.GetApi = async (req, res) => {
    try {
      const prodId = req.params.id;  
      const product = await Prods.findById(prodId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
// ===================================================================
exports.PostApi = async (req, res) => {
    try {
     const { title, price, rating } = req.body;

    const NewProduct = new Prods({
      title,
      price,
      rating,
    });

    const data = await NewProduct.save(); 
    console.log("Success:", data);
      
      res.status(201).json(data); 
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    }
  };
//   ===================================================================
exports.PutApi = async (req, res) => {
    try {
      const id = req.params.id;
  
      const updatedData = {
        title: 'Updated Samsung galaxy c7 pro',
        price: 18000,
        rating: 5,
      };
  
      const result = await Prods.findByIdAndUpdate(id, updatedData, {
        new: true, // to return updated document
        overwrite: true // replaces the whole document
      });
  
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  };
  

 exports.PatchApi = (req, res) => {
    const id = +req.params.id;
    const productIndex = data.findIndex(p => p.id === id);
    const product = data[productIndex];
    data.splice(productIndex, 1, { ...product, ...req.body });
    res.status(201).json();
}


exports.DeleteApi = (req,res)=>{
    const id = +req.params.id;
    const ProductIndex = data.findIndex(p=>p.id==id)
    data.splice(ProductIndex,1)
    res.json(data)
 }
