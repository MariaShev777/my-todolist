import { AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { authThunks } from 'features/auth/model/auth.reducer';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialised: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
      state.isInitialised = action.payload.isInitialised;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = 'failed';
        if (action.payload) {
          if (action.type.includes('addTodolist') || action.type.includes('addTask') || action.type.includes('initializeApp')) return;
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred';
        }
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state) => {
        state.isInitialised = true;
      });
  },
});

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const appReducer = slice.reducer;
export const appActions = slice.actions;
