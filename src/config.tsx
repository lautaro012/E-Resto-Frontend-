import rootReducer from './redux/reducer';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
const { configureStore } = require ('@reduxjs/toolkit');

const store = configureStore({
    reducer: rootReducer
})
type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;