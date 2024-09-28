import { useContext } from "react"
import { FiltersContext } from "../context/filters"

export function useFilters(products){
    const {filters, setFilters} = useContext(FiltersContext)

    
    const filterProducts = (product) =>{
      if(product.price >= filters.minPrice && (product.category === filters.category || filters.category==='all')){
        return true
      }else
      return false
    }
    
    let filteredProducts ={}
    if (products){
    filteredProducts = products.filter(filterProducts)}

    return {filters, filteredProducts, setFilters} 
  } 