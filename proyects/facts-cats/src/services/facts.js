const CAT_ENDPOINT_FACT = 'https://catfact.ninja/fact'

export const getFact =async () => {
    console.log("getFact")
    const res = await fetch(CAT_ENDPOINT_FACT)
    const factData = await res.json()
    const { fact } = factData
    return fact
  }