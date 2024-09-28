import { Products } from "./components/Products"
import { Header } from "./components/Headers"
import hasproducts from './mocks/products.json'
import { Footer } from "./components/Footer"
import { useFilters } from "./hooks/useFilters" 
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"

function App() {

  const products = hasproducts.products
  
  const {filteredProducts} = useFilters(products)

  return (
    <CartProvider>
      <Header />
      <Cart/>
      <main>
        <Products products={filteredProducts}/>
        {<Footer />}
      </main>
    </CartProvider>
  )
}

export default App
