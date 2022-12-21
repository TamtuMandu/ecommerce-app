import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { productReducer } from "./slices/productSlice";
import { cardReducer } from "./slices/cardSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "card"],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  card: cardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();

export { registerOrLoginUser, logoutUser } from "./slices/userSlice";

export {
  fetchHomePageProduct,
  saveProduct,
  fetchCategoryProduct,
} from "./slices/productSlice";

export {
  addToCard,
  clearCard,
  removeFromCard,
  saveCard,
  fetchCard,
} from "./slices/cardSlice";

export const useProductLoading = () =>
  useSelector((state) => state.product.loading);

export const useCardItems = () => useSelector((state) => state.card.cardItems);

export const useCategoryProducts = () =>
  useSelector((state) => state.product.categoryProducts);
