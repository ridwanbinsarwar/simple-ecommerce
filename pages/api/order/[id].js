import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const dir = path.join('data', 'orders.json')
  var rawData = fs.readFileSync(dir).toString()
  let orders = JSON.parse(rawData)
  let id = req.query.id
  const filtered = orders.orders.filter(order => order.id === id)

  if (filtered.length <= 0) {
    res.status(404).json({ message: `client with id ${id} is not found` })
  }

  res.status(200).json(filtered[0])
}

