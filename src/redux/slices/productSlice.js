import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../app/index";

export const fetchHomePageProduct = createAsyncThunk(
  "product/fetchHomePageProduct",
  async () => {
    const { data } = await instance.get("/products");
    return data;
  }
);

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ product, isUpdating }, { dispatch }) => {
    const endpoint = isUpdating ? `/products/${product.id}` : "/products";
    const method = isUpdating ? "put" : "post";
    const { data } = await instance[method](endpoint, { product });
    dispatch(fetchHomePageProduct());
    dispatch(setSelectedProduct({ product: null }));

    return data;
  }
);

export const fetchCategoryProduct = createAsyncThunk(
  "product/fetchCategoryProduct",
  async (url) => {
    const { data } = await instance.get(`/products/categories/${url}`);
    return data;
  }
);

export const queryProducts = createAsyncThunk(
  "product/queryProducts",
  async (name) => {
    const { data } = await instance.get(`/products?name=${name}`);
    return data;
  }
);

export const fetchSingleProductById = createAsyncThunk(
  "product/fetchSingleProductById",
  async ({ id, category }) => {
    const { data } = await instance.get(`/products/category/${category}/${id}`);
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    homePageProducts: [],
    categories: [],
    categoryProducts: [],
    searchProducts: [],
    singleProduct: null,
    selectedProduct: null,
    error: null,
  },

  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload.product;
    },
    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHomePageProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageProducts = action.payload.products;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchHomePageProduct.rejected, (state) => {
      state.loading = false;
      state.error = "Oops......";
    });

    builder.addCase(fetchCategoryProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload;
    });
    builder.addCase(fetchCategoryProduct.rejected, (state) => {
      state.loading = false;
      state.error = "Oops......";
    });
    builder.addCase(queryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(queryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload.products;
    });
    builder.addCase(queryProducts.rejected, (state) => {
      state.loading = false;
      state.error = "false";
    });
    builder.addCase(fetchSingleProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload.product;
    });
    builder.addCase(fetchSingleProductById.rejected, (state) => {
      state.loading = false;
      state.error = "false";
    });
  },
});

export const productReducer = productSlice.reducer;
export const { setSelectedProduct, setSearchProducts } = productSlice.actions;
