import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const dir = path.join('data', 'products.json')
  var rawData = fs.readFileSync(dir).toString()
  let products = JSON.parse(rawData)
  const filtered = products.products.filter(product => product.id === req.query.id)

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])

  } else {
    res.status(404).json({ message: `product with ${req.query.id} is not found` })

  }

}

