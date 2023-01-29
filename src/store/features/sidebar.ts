import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  folded: boolean;
  open: boolean;
}

const initialState: SidebarState = { folded: false, open: false };

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleFolded(state) {
      state.folded = !state.folded;
    },
    toggleOpen(state) {
      state.open = !state.open;
    },
  },
});

export const { toggleFolded, toggleOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
