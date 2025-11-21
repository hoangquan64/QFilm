export const  getOjectById = (array, id) => {
    return array.find(item => item.id === id);
}

export const  filterByCategory = (array, categoryId, title) => {
    return array.filter(item => item[title] === categoryId);
}


export const convertString = (str) => {
    return  str.length > 50 ? str.substring(0, 50) + "..." : str;
}