import { Reducer } from 'redux';
import { AuthActionTypes, IAuthAction } from '../actions/auth.actions';

export interface IAuthState {
  readonly token: string;
}
export const initialAuthState: IAuthState = {
  token: '',
};

export const authReducer = ((state = initialAuthState, action) => {
  switch (action.type) {
    case AuthActionTypes.SetToken:
      return { ...state, token: action.payload || '' };
    case AuthActionTypes.UnsetToken:
      return { ...state, token: '' };
  }
  return state;
}) as Reducer<IAuthState, IAuthAction>;
