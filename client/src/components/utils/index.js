const BASKET_KEY = "basket"



export const filteredCats = ( searchTerm, data ) => {
    return data.filter(cat => {
      return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  export const calculatePrice = items => {
    return `£${items.reduce((acc, item) => acc + item.quantity * item.price, 0 ).toFixed(2)}`
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