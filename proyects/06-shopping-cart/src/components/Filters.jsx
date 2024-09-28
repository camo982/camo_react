import { useFilters } from "../hooks/useFilters.js"
import "./Filters.css"

export function Filters (){

    const {filters, setFilters} = useFilters()
    //const [minPrice,setMinPrice] = useState(0); //--> esto tiene un estado diferente al estado del useContext es local del componente
    const handleChangeMinPrice =(event)=>{
        //setMinPrice(event.target.value)
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
          }))
    }
    const handleChangeCategory =(event)=>{
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
          }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor='price'>Precio Mínimo:</label>
                <input type='range' id='price' min='0' max = '1000'onChange={handleChangeMinPrice} value={filters.minPrice}/>
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor='categories-select'>Categorías</label>
                <select name= 'categories' id="categories-select" onChange={handleChangeCategory}>
                    <option value= 'all'>Todas</option>
                    <option value= 'fragrances'>Perfumes</option>
                    <option value= 'furniture'>Muebles</option>
                    <option value= 'beauty'>Bellesa</option>
                </select>

            </div>
        </section>
    )
}