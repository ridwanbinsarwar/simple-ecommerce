import fs from 'fs'
import path from 'path'
export default async function handler(req, res){

  const dir = path.join('data', 'clients.json')
  var rawData = await fs.readFileSync(dir)
  let clients = JSON.parse(rawData);
  res.status(200).json(clients)
}