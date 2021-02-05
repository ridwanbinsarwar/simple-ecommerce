import fs from 'fs'
import path from 'path'
import ProductList from '../components/product/ProductList'

export default function Home({ products }) {
  return (
    <div>
      <ProductList products={products}></ProductList>
    </div>
  )
}
export const getStaticProps = async () => {
  // api call does not work in production

  // const res = await fetch(`http://localhost:3000/api/products`)
  // const products = await res.json()
  const dir = path.join('data', 'products.json')
  var rawData = await fs.readFileSync(dir)
  let products = JSON.parse(rawData).products;
  return {
    props: {
      products,
    },
  }
}