import { authReducer, IAuthState } from './auth.reducer';
import {ReducersMapObject} from 'redux';

export type IStateUnion = {
  auth: IAuthState;
};

export const reducers: ReducersMapObject<IStateUnion> = {
  auth: authReducer,
};
