import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const bItem = state.items.find(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (bItem) {
        newBasket.filter((item) => item.id !== bItem.id);
      } else {
        console.log('Cannot remove product');
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
