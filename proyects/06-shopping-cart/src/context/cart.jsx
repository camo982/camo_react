import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider ({children}){

    const [cart, setCart] = useState([])
    
    const addToCart = (product) =>{

        const productCartIndex = cart.findIndex(item => item.id === product.id)

        if (productCartIndex >= 0) {
            const newCart = structuredClone (cart)
            newCart [productCartIndex].quantity += 1
            setCart(newCart)
        }else{
            setCart(prevstate => ([... prevstate,{...product,quantity:1}]))
        }
        console.log('cart:',cart)
    }

    const removeFromCart = (product) => {
        setCart(prevstate => prevstate.filter(item => item.id !== product.id))
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{cart,addToCart,clearCart,removeFromCart}}>
         {children}
        </CartContext.Provider>
    )

} 