import fs from 'fs'
import path from 'path'

export default function handler(req, res){
  const dir = path.join('data', 'clients.json')
  var rawData = fs.readFileSync(dir).toString()
  let clients = JSON.parse(rawData)
    let id = req.query.id
    const filtered = clients.clients.filter(client => client.phone === id)
  
    if(filtered.length > 0){
      res.status(200).json(filtered[0])
    }
    else {
    res.status(404).json({message: `client with id ${id} is not found`})

    }

}

