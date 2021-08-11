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

      console.log(bItem, 'item');

      let newBasket = [...state.items];

      if (bItem) {
        state.items = newBasket.filter((item) => item.id !== bItem.id);
      } else {
        console.log('Cannot remove product');
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
