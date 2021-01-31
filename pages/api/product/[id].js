import {products} from '../../../data/products.json'

export default function handler(req, res){

  const filtered = products.filter(product => product.id === req.query.id)

  if(filtered.length <= 0){
    res.status(404).json({message: `product with ${req.query.id} is not found`})
    
  }
  if (req.method === 'PUT' ){
      
  }
  res.status(200).json(filtered[0])
}