import {clients} from '../../../data/clients.json'

import fs from 'fs'
import path from 'path'
export default function handler(req, res){

    let id = req.body.phone
    const filtered = clients.filter(client => client.phone === id)

    if (req.method === 'POST'){
        // merge with previous orders
        let orders = filtered.length > 0 ? filtered[0].orders : []
        req.body.orders.forEach(element => {
            orders.push(element)
        });

        res.status(200).json(
            updateClient({
            phone:req.body.phone,
            name:req.body.name,
            address:req.body.address,
            orders:orders
        }))
    }
}


function updateClient({phone,name,address,orders}) {
    let filtered = clients.filter(client => client.phone != phone)
    filtered.push({phone,name,address,orders})
    // update json file
    const dir = path.join('data', 'clients.json')
    let myObj = { "clients": filtered };
    fs.writeFileSync(dir,JSON.stringify(myObj))

    return {phone,name,address,orders}
  }