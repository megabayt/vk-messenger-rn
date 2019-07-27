import { ReducersMapObject } from 'redux';
import { authReducer, IAuthState } from './auth.reducer';
import { chatReducer, IChatState } from './chat.reducer';

export type IStateUnion = {
  auth: IAuthState;
  chat: IChatState;
};

export const reducers: ReducersMapObject<IStateUnion> = {
  auth: authReducer,
  chat: chatReducer,
};
