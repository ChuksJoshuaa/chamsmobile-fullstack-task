import { createSlice } from "@reduxjs/toolkit";
import { IIProps } from "../../../utils/interface";

const initialState: IIProps = {
  isLoading: true,
  paginateData: [],
  storeData: [],
  page: 0,
  errors: "",
};

export const postSlice = createSlice({
  name: "post",

  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setPaginatedData: (state, action) => {
      state.paginateData = action.payload;
    },
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setLoader, setPaginatedData, setStoreData, setPage, setErrors } =
  postSlice.actions;

export default postSlice.reducer;
