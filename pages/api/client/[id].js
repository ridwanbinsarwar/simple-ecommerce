import {clients} from '../../../data/clients.json'

export default function handler(req, res){
    let id = req.query.id
    const filtered = clients.filter(client => client.phone === id)
  
    if(filtered.length <= 0){
      res.status(404).json({message: `client with id ${id} is not found`})
    }

    res.status(200).json(filtered[0])
}

