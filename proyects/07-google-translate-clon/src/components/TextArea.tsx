import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props{  type: SectionType,
       // placeHolder: string, 
        loading ?: boolean, 
        value:string, 
        onChange:(value: string) => void
    } 

const commonStyles = {border:0, height : '200px'}
const placeholder = ({type, loading}:{type: SectionType, loading?:boolean} ) => {  
    if(type=== SectionType.From) return 'Ingresar Texto'
    if(loading===true) return 'cargando...'
    return 'Traducción'
}

export const TextArea = ({type, loading, value, onChange}:Props)=>{

    const styles = type === SectionType.From? commonStyles: {...commonStyles, backgroundColor: '#f5f5f5'}

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> )=>{
        onChange(event.target.value)
    }

    return(
        <Form.Control as='textarea' 
        placeholder={placeholder({type, loading})} 
        autoFocus={type=== SectionType.From} 
        style={styles}
        value= {value}
        onChange={handleChange}/>
    )
}