const CAT_IMAGE_URL = 'https://cataas.com/cat'

export const getCatImages = async ({fact}) =>{
    const firstWord = fact.split(" ")[0]
    const res = await fetch(`${CAT_IMAGE_URL}/says/${firstWord}?fontSize=50&fontColor=red&json=true`)
    const catData = await res.json()
    const { _id } = catData
    return `${CAT_IMAGE_URL}/${_id}/says/${firstWord}`          
}

