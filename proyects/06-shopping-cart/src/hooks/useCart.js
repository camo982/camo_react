import { useContext, useState } from "react";
import { CartContext } from "../context/cart";

export function useCart () {

    const context = useContext(CartContext)

    if (context === undefined){
        throw new Error('useCart must be used withing a CartProvider')
    }

    return context
}