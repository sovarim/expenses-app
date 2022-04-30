import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export type ColorSchemeState = 'dark' | 'light' | 'default';

const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState: 'default' as ColorSchemeState,
  reducers: {
    setColorScheme: (_, action: PayloadAction<ColorSchemeState>) => action.payload,
  },
});

export default colorSchemeSlice.reducer;

export const selectColorScheme = (state: RootState) => state.colorScheme;

export const { setColorScheme } = colorSchemeSlice.actions;
