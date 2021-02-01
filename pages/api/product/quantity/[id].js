import fs from 'fs'
import path from 'path'
export default function handler(req, res){

    const dir = path.join('data', 'product_quantity.json')
    var rawData = fs.readFileSync(dir)
    let quantities = JSON.parse(rawData);

    let id = req.query.id
    const filtered = quantities.quantities.filter(product => product.id === id)
  
    if(filtered.length <= 0){
      res.status(404).json({message: `product with id ${id} is not found`})
    }
    if (req.method === 'PUT' ){
        setQuantity(id, req.body.quantity);
        // update json file
        const dir = path.join('data', 'product_quantity.json')
        let myObj = { "quantities": quantities };
        fs.writeFileSync(dir,JSON.stringify(myObj))
    }
    res.status(200).json(filtered[0])
}


function setQuantity(id, newQuantity) {
    for (var i = 0; i < quantities.length; i++) {
      if (quantities[i].id === id) {
        quantities[i].quantity = newQuantity;
        return;
      }
    }
  }