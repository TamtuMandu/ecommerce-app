import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../app/index";
export const saveCard = createAsyncThunk(
  "card/saveCard",
  async ({ userId, cardItems }, { dispatch }) => {
    await instance.put(`/users/${userId}/cart`, { products: cardItems });
    dispatch(fetchCard(userId));
  }
);

export const fetchCard = createAsyncThunk("card/fetchCard", async (userId) => {
  const { data } = await instance.get(`/users/${userId}/cart`);
  return data;
});
const cardSlice = createSlice({
  name: "card",
  initialState: {
    loading: false,
    cardItems: [],
    error: null,
  },
  reducers: {
    addToCard: (state, action) => {
      const product = action.payload;
      const productId = product._id;
      const cardItem = state.cardItems?.find(
        (item) => item.product._id === productId
      );
      if (cardItem) {
        const updatedCard = state.cardItems.map((cardItem) =>
          cardItem.product._id === productId
            ? {
                ...cardItem,
                quantity: cardItem.quantity + 1,
              }
            : cardItem
        );
        state.cardItems = updatedCard;
      } else {
        state.cardItems.push({ product, quantity: 1 });
      }
    },
    removeFromCard: (state, action) => {
      const productId = action.payload;
      const foundItem = state.cardItems?.find(
        (item) => item.product._id === productId
      );
      let updatedCard;
      if (foundItem.quantity === 1) {
        updatedCard = state.cardItems.filter(
          (item) => item.product._id !== productId
        );
      } else {
        updatedCard = state.cardItems?.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      state.cardItems = updatedCard;
    },
    clearCard: (state, action) => {
      state.cardItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveCard.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(saveCard.rejected, (state) => {
      state.loading = false;
      state.error = "will change to custom error";
    });
    builder.addCase(fetchCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.loading = false;
      state.cardItems = action.payload.cart;
    });
    builder.addCase(fetchCard.rejected, (state) => {
      state.loading = false;
      state.error = "will change to custom error";
    });
  },
});

export const { addToCard, removeFromCard, clearCard } = cardSlice.actions;

export const cardReducer = cardSlice.reducer;
