import "./Products.css"
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"
import { useCart } from "../hooks/useCart"

export function Products ({products}){

    const {cart,addToCart,clearCart,removeFromCart} = useCart()

    const checkProductInCart = (product) =>{
        return cart.some(item => item.id === product.id)
    }

    return(
        <div className="products">
            <ul>
                {
                    products.map (product =>{
                        const isProductInCart = checkProductInCart(product)
                        
                        return(
                        <li key={product.id} className="product">
                            <img src={product.thumbnail} alt= {product.title}/>
                            <div>
                                <strong>{product.title}</strong>
                            </div>
                            <div>
                                {product.price}
                            </div>
                            <div>
                                <button style={{backgroundColor : isProductInCart? 'red' : 'blue'}} 
                                        onClick={()=> isProductInCart?  removeFromCart(product): addToCart(product)} >
                                    {
                                        isProductInCart ?
                                        <RemoveFromCartIcon/>
                                            : <AddToCartIcon/>
                                    }
                                </button>
                            </div>
                        </li>
                    )})
                }
            </ul>
        </div>
    )
}