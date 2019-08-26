import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import {
  IApisauceService,
  ICommonErrorResponse,
  ICommonOkResponse,
  ICommonResponse,
} from '@/utils/apisauce';
import {
  ChatActionTypes,
  chatsSet,
  chatsAppendSet,
  chatsErrorSet,
  chatsAppendErrorSet,
  IChatAction,
  IChatsParams,
  IChatsResponse,
  IChatMessagesParams,
  chatMessagesSet,
  IChatMessagesResponse,
  chatMessagesErrorSet, chatMessagesAppendSet, chatMessagesAppendErrorSet,
} from '@/store/actions/chat.actions';

export const chatsFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatsResponse>> =
    yield call(api.getConversations, (action.payload as IChatsParams));
  if (result.status === 200) {
    yield put(chatsSet(result.data as ICommonOkResponse<IChatsResponse>));
  } else {
    yield put(chatsErrorSet(result.data as ICommonErrorResponse<IChatsParams>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const chatsAppendFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatsResponse>> =
    yield call(api.getConversations, (action.payload as IChatsParams));
  if (result.status === 200) {
    yield put(chatsAppendSet(result.data as ICommonOkResponse<IChatsResponse>));
  } else {
    yield put(chatsAppendErrorSet(result.data as ICommonErrorResponse<IChatsParams>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const chatMessagesFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatMessagesResponse>> =
    yield call(api.getHistory, (action.payload as IChatMessagesParams));
  if (result.status === 200) {
    yield put(chatMessagesSet(result.data as ICommonOkResponse<IChatMessagesResponse>));
  } else {
    yield put(chatMessagesErrorSet(result.data as ICommonErrorResponse<IChatMessagesParams>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const chatMessagesAppendFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IChatMessagesResponse>> =
    yield call(api.getHistory, (action.payload as IChatMessagesParams));
  if (result.status === 200) {
    yield put(chatMessagesAppendSet(result.data as ICommonOkResponse<IChatMessagesResponse>));
  } else {
    yield put(chatMessagesAppendErrorSet(result.data as ICommonErrorResponse<IChatMessagesParams>));
  }
} as (api: IApisauceService, action: IChatAction) => SagaIterator);

export const watchChat = (function* (api) {
  yield takeLatest(ChatActionTypes.ChatsFetch, chatsFetchSaga, api);
  yield takeLatest(ChatActionTypes.ChatsAppendFetch, chatsAppendFetchSaga, api);
  yield takeLatest(ChatActionTypes.ChatMessagesFetch, chatMessagesFetchSaga, api);
  yield takeLatest(ChatActionTypes.ChatMessagesAppendFetch, chatMessagesAppendFetchSaga, api);
} as (api: IApisauceService) => SagaIterator);
