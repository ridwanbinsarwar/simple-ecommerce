import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {

  const dir = path.join('data', 'products.json')
  var rawData = fs.readFileSync(dir)
  let products = JSON.parse(rawData);
  res.status(200).json(products)
}