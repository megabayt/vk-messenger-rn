import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { IApisauceService } from '@/utils/apisauce';
import { watchAuth } from '@/store/sagas/auth.saga';
import { watchChat } from '@/store/sagas/chat.saga';
import { watchProfile } from '@/store/sagas/profile.saga';
import { AuthActionTypes } from '@/store/actions';
import { IAuthAction } from '@/store/actions/auth.actions';
import { myProfileFetch } from '@/store/actions/profile.actions';
import { chatsFetch } from '@/store/actions/chat.actions';

export const afterAuthSaga = (function* () {
  yield put(myProfileFetch({}));
  yield put(chatsFetch());
} as (api: IApisauceService, action: IAuthAction) => SagaIterator);


export function* sagaInit(api: IApisauceService): SagaIterator {
  yield takeLatest(AuthActionTypes.SetToken, afterAuthSaga, api);
  yield all([
    call(watchAuth, api),
    call(watchChat, api),
    call(watchProfile, api),
  ]);
}
