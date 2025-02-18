import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    carts: []
};

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addItem: (store, action) => {
            let found = false;
            
            store.carts.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.quantity += 1;  
                    found = true;
                }
            });

            if (!found) {
                store.carts.push({
                    id: action.payload.id,
                    food: action.payload.food,
                    price : action.payload.price,
                    quantity: 1
                });
            }
        },

        decreaseItem: (store, action) => {
            store.carts.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.quantity -= 1;
                }
            });

            store.carts = store.carts.filter((item) => item.quantity > 0);
        }
    },

});

export const { addItem, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;
