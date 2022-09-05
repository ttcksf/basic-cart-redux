import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//オブジェクトの中身を追加・削除できなくするためにobject.breeze()を使用
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  //APIなど非同期処理を行う場合にはextraReducersを使う。非同期処理自体はスコープの外に記述する
  extraReducers: (builder) => {
    //createAsyncThunkではAPIなど非同期処理を行なった後にpending,fulfilled,rejectedの3つのステータスが返ってくる
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));

//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       console.log(data);
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
