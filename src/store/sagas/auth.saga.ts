import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';

import { IApisauceService } from '@/utils/apisauce';
import {
  AuthActionTypes, IAuthAction,
} from '@/store/actions/auth.actions';

export const setTokenSaga = (function (api, action) {
  api.setToken(action.payload || '');
} as (api: IApisauceService, action: IAuthAction) => SagaIterator);

export const watchChat = (function* (api) {
  yield takeLatest(AuthActionTypes.SetToken, setTokenSaga, api);
  yield takeLatest(AuthActionTypes.UnsetToken, setTokenSaga, api);
} as (api: IApisauceService) => SagaIterator);
