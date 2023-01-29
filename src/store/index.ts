import { configureStore } from "@reduxjs/toolkit";
import rocketReducer from "./features/rocket";
import sidebarReducer from "./features/sidebar"

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    rocket: rocketReducer
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
