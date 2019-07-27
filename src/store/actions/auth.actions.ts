import { Action } from 'redux';

export enum AuthActionTypes {
  SetToken = 'SET_TOKEN',
  UnsetToken = 'UNSET_TOKEN',
}

export const setToken = (params: string): IAuthAction =>
  ({ type: AuthActionTypes.SetToken, payload: params });
export const unsetToken = (): IAuthAction =>
  ({ type: AuthActionTypes.UnsetToken });

export interface IAuthAction extends Action<AuthActionTypes> {
  payload?: string;
}
