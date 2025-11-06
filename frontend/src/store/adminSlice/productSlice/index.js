import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/admin/addProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/admin/getAllProdcuts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );

    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "/admin/editProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/admin/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return response.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
