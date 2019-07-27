import { Action } from 'redux';

export enum AuthActionTypes {
  SetToken = 'SET_TOKEN',
  UnsetToken = 'UNSET_TOKEN',
}

export interface IAuthAction extends Action<AuthActionTypes> {
  payload?: string;
}
