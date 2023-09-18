import { createSlice } from "@reduxjs/toolkit";

//redux allows you to store state and access these states anywhere in your application

const initialState = {     //initialState is the state the app will start off with - cart is closed, cart is empty, items is empty
    isCartOpen: false,
    cart: [],
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",   //The name is what will be used to reference this slice in the future, so it must be unique.
    initialState, 
    reducers: {   //The reducers property contains functions that are called when actions are dispatched to this slice.
        setItems: (state, action) => {     //setItems is a function. Whatever action you pass into the setItems, the state.items will be updated.
            state.items = action.payload
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen; 
        }
    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer;

