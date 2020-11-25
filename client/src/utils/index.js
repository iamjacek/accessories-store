const BASKET_KEY = "basket"
const TOKEN_KEY = "jwt"



export const filteredCats = ( searchTerm, data ) => {
    return data.filter(cat => {
      return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  export const calculatePrice = items => {
    return `£${items.reduce((acc, item) => acc + item.quantity * item.price, 0 ).toFixed(2)}`
  }

  export const calculateAmount = items => {
    return Number(items.reduce((acc, item) => acc + item.quantity * item.price, 0 ).toFixed(2))
  }

  // BASKET
  export const setBasket = (value, basketKey = BASKET_KEY) => {
    if (localStorage) {
      localStorage.setItem(basketKey, JSON.stringify(value))
    }
  }

  export const getBasket = (basketKey = BASKET_KEY) => {
    if (localStorage && localStorage.getItem(basketKey)){
      return JSON.parse(localStorage.getItem(basketKey))
    }
    return []
  }

  export const clearBasket = (basketKey = BASKET_KEY) => {
    if (localStorage) {
      localStorage.removeItem(basketKey)
    }
  }

  // AUTHORISATION

  export const setToken = (value, tokenKey = TOKEN_KEY) => {
    if (localStorage) {
      localStorage.setItem(tokenKey, JSON.stringify(value))
    }
  }

  export const getToken = (tokenKey = TOKEN_KEY) => {
    
    if (localStorage && localStorage.getItem(tokenKey)){
      
      return JSON.parse(localStorage.getItem(tokenKey))
    }
    return null
  }

  export const clearToken = (tokenKey = TOKEN_KEY) => {
    if (localStorage) {
      localStorage.removeItem(tokenKey)
    }
  }