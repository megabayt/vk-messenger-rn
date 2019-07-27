import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import { IApisauceService } from '@/utils/apisauce';
import { watchChat } from '@/store/sagas/chat.saga';

export function* sagaInit(api: IApisauceService): SagaIterator {
  yield all([
    call(watchChat, api),
  ]);
}
