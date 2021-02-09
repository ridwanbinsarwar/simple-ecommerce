import { orders } from '../../../data/orders.json'

import fs from 'fs'
import path from 'path'
export default function handler(req, res) {

    let id = req.body.id
    if (req.method === 'POST') {
        // merge with previous orders
        let pavailable = updateQuantity(req)
        console.log(pavailable, req.body.products);

        if(pavailable == -1){

            res.status(400).json(req.body.products)

        }else {

            res.status(200).json(
                updateClient({
                    id: id,
                    products: req.body.products,
                    price: req.body.price,
                    time: req.body.time,
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone
                }))
        }
    } else {
        const dir = path.join('data', 'orders.json')
        var rawData = fs.readFileSync(dir)
        let orders = JSON.parse(rawData);
        res.status(200).json(orders.orders)
    }
}


function updateClient({ id, products, price, time, name, address, phone }) {
    orders.push({ id, products, price, time, name, address, phone })
    // update json file
    const dir = path.join('data', 'orders.json')
    let myObj = { "orders": orders };
    fs.writeFileSync(dir, JSON.stringify(myObj))
    return { id, products, price }
}

function updateQuantity(req) {

    const dir = path.join('data', 'products.json')
    var rawData = fs.readFileSync(dir).toString()
    let products = JSON.parse(rawData)
    let qavailable = true
    for (var i = 0; i < products.products.length; i++) {
        req.body.products.forEach(item => {
            if (products.products[i].id === item.id) {
                if(products.products[i].quantity - item.quantity < 0){
                    item.quantity = products.products[i].quantity
                    req.body.price = req.body.products - (Math.abs(products.products[i].quantity - item.quantity)*products.products[i].price)
                    qavailable = false
                    
                }
                products.products[i].quantity = products.products[i].quantity - item.quantity
            }
        });
    }
    if(qavailable){

        // update json file
        let myObj = { "products": products.products };
        // console.log(myObj)
        fs.writeFileSync(dir, JSON.stringify(myObj))
        return 1
    } else {
        return -1
    }

}