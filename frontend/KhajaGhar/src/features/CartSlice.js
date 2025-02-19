import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [] // This should store multiple items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, food, price } = action.payload;
      const existingItem = state.carts.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ id, food, price, quantity: 1 });
      }
    },
    decreaseItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.carts.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.carts = state.carts.filter(item => item.id !== id);
        }
      }
    }
  }
});

export const { addItem, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;
