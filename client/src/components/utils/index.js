export const filteredCats = ( searchTerm, data ) => {
    return data.filter(cat => {
      return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }