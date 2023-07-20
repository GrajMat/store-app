import axios from 'axios'
class ProductDataService {
    getProducts(skip, limit, searchQuery) {
        // return axios.get(`https://dummyjson.com/products?skip=${skipResults}&limit=${resultsNumbers}`)
        return axios.get(`https://dummyjson.com/products/search?q=${searchQuery}&skip=${skip}&limit=${limit}`)


    }

    getCategories() {
        return axios.get(`https://dummyjson.com/products/categories`)
    }

    findByCategory(skip, limit, category, total) {
        if (category === 'All products') {
            return axios.get(`https://dummyjson.com/products/?skip=${skip}&limit=${limit}`)
        } else {
            return axios.get(`https://dummyjson.com/products/category/${category}?skip=${skip >= total ? 0 : skip}&limit=${limit}`)

        }
    }

}


// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductDataService()