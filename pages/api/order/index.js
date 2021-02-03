import {orders} from '../../../data/orders.json'

import fs from 'fs'
import path from 'path'
export default function handler(req, res){

    let id = req.body.id
    const filtered = orders.filter(order => order.id === id)

    if (req.method === 'POST'){
        // merge with previous orders
        res.status(200).json(
            updateClient({
            id:id,
            products:req.body.products,
            price:req.body.price,
            time: req.body.time,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        }))
    }
}


function updateClient({id,products,price,time,name,address,phone}) {
    orders.push({id,products,price,time,name,address,phone})
    // update json file
    const dir = path.join('data', 'orders.json')
    let myObj = { "orders": orders };
    fs.writeFileSync(dir,JSON.stringify(myObj))
    return {id,products,price}
  }