import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import { IApisauceService, ICommonOkResponse, ICommonResponse } from '@/utils/apisauce';
import {
  ChatActionTypes,
  chatsSet,
  chatsAppendSet,
  IChatAction,
  IChatsParams,
  IChatsResponse,
} from '@/store/actions/chat.actions';

export const chatsFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatsResponse>> =
    yield call(api.getConversations, (action.payload as IChatsParams));
  if (result.status === 200) {
    yield put(chatsSet(result.data as ICommonOkResponse<IChatsResponse>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const chatsAppendFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatsResponse>> =
    yield call(api.getConversations, (action.payload as IChatsParams));
  if (result.status === 200) {
    yield put(chatsAppendSet(result.data as ICommonOkResponse<IChatsResponse>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const watchChat = (function* (api) {
  yield takeLatest(ChatActionTypes.ChatsFetch, chatsFetchSaga, api);
  yield takeLatest(ChatActionTypes.ChatsAppendFetch, chatsAppendFetchSaga, api);
} as (api: IApisauceService) => SagaIterator);
