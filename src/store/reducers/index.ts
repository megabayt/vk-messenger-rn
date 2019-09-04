import { ReducersMapObject } from 'redux';
import { authReducer, IAuthState } from './auth.reducer';
import { chatReducer, IChatState } from './chat.reducer';
import { IProfileState, profileReducer } from '@/store/reducers/profile.reducer';

export type IStateUnion = {
  auth: IAuthState;
  chat: IChatState;
  profile: IProfileState;
};

export const reducers: ReducersMapObject<IStateUnion> = {
  auth: authReducer,
  chat: chatReducer,
  profile: profileReducer,
};
