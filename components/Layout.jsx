import Meta from './Meta'
import Header from './Header'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <div>
        <main>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout