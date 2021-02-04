import { orders } from '../../../data/orders.json'

import fs from 'fs'
import path from 'path'
export default function handler(req, res) {

    let id = req.body.id
    const filtered = orders.filter(order => order.id === id)

    if (req.method === 'POST') {
        // merge with previous orders
        updateQuantity(req.body.products)
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

function updateQuantity(items) {
    const dir = path.join('data', 'products.json')
    var rawData = fs.readFileSync(dir).toString()
    let products = JSON.parse(rawData)

    for (var i = 0; i < products.products.length; i++) {

        items.forEach(item => {
            if (products.products[i].id === item.id) {
                products.products[i].quantity = products.products[i].quantity - item.quantity
            }
        });

    }
    // update json file
    let myObj = { "products": products.products };
    // console.log(myObj)
    fs.writeFileSync(dir, JSON.stringify(myObj))

}