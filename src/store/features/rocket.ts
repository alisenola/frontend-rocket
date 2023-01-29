import { createSlice } from "@reduxjs/toolkit";
import { IRocket } from "interfaces/IRocket";

export interface IRocketState {
  items: IRocket[];
  loaded: boolean;
}

const initialState: IRocketState = { items: [], loaded: false };

const rocketSlice = createSlice({
  name: "rocket",
  initialState,
  reducers: {
    fetchRocketAction: (state, action) => {
      state.items = action.payload.item;
      state.loaded = true;
    },
    createRocketAction: (state, action) => {
      state.items = [...state.items, action.payload.item];
      state.loaded = true;
    },
    updateRocketAction: (state, action) => {
      let updated = state.items.map((t) =>
        t.id === Number(action.payload.item.id) ? action.payload.item : t
      );
      state.items = updated;
    },
    deleteRocketAction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload.item);
    },
  },
});

export const {
  fetchRocketAction,
  createRocketAction,
  updateRocketAction,
  deleteRocketAction,
} = rocketSlice.actions;

export default rocketSlice.reducer;
