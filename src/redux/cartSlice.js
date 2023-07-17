import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: []
}


export const cartSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {

        increaseCartQuantity: (state, action) => {
            if (state.cartItems.find((item) => item.id === action.payload.id) == null) {
                state.cartItems.push({ id: action.payload.id, quantity: 1, price: action.payload.price })
            }
            else {
                state.cartItems.map(item => {
                    if (item.id === action.payload.id) {
                        return item.quantity++
                    } else {
                        return item
                    }
                })
            }

        },
        decreaseCartQuantity: (state, action) => {
            if (state.cartItems.find((item) => item.id === action.payload)?.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            }
            else {
                state.cartItems.map(item => {

                    if (item.id === action.payload) {
                        return item.quantity--
                    } else {
                        return item
                    }
                })
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
        }


    },
})

// Action creators are generated for each case reducer function
export const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartItem } = cartSlice.actions

export default cartSlice.reducer