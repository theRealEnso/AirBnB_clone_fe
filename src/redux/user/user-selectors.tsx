import { RootState } from "../root-reducer"

export const selectCurrentUser = (state: RootState) => state.user.user;

export const selectUserError = (state: RootState) => state.user.error;