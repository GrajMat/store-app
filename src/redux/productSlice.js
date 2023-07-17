import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            return action.payload

        },

        addProduct: (state, action) => {
            console.log("state", state)
            state.products.push(
                action.payload
            )
        }
    },
})

// Action creators are generated for each case reducer function
export const { getProducts, addProduct } = productSlice.actions

export default productSlice.reducer