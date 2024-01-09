import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myBlogs: [],
  detailBlog: {},
  production_table: [],
  program_title: [],
  hash_blogs: [],
  history: [],
};

export const blogSlice = createSlice({
  name: "blog_slice",
  initialState,
  reducers: {
    addBlogs: (state, { payload }) => {
      state.myBlogs = payload;
    },
    removeBlogs: (state, { payload }) => {
      state.myBlogs = state.myBlogs.filter((blog) => blog.id !== payload.id);
    },
    addDetail: (state, { payload }) => {
      state.detailBlog = payload;
    },
    productionTable: (state, { payload }) => {
      state.production_table = payload;
    },
    programTitle: (state, { payload }) => {
      state.program_title = payload;
    },
    blogOfHash: (state, { payload }) => {
      state.hash_blogs = payload;
    },
    addHistory: (state, { payload }) => {
      state.history = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBlogs,
  removeBlogs,
  addDetail,
  productionTable,
  programTitle,
  blogOfHash,
  addHistory,
} = blogSlice.actions;

export default blogSlice.reducer;
