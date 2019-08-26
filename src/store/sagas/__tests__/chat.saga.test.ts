import { call, put, takeLatest } from 'redux-saga/effects';

import { chatsAppendFetchSaga, chatsFetchSaga, watchChat } from '@/store/sagas/chat.saga';
import { apisauceMock } from '@/__mocks__/apisauceMock';
import {
  ChatActionTypes, chatsAppendErrorSet, chatsAppendFetch, chatsAppendSet, chatsErrorSet,
  chatsFetch, chatsSet, IChatsParams, IChatsResponse,
} from '@/store/actions/chat.actions';
import { stepper } from '@/utils/tests';
import { ICommonErrorResponse, ICommonOkResponse, okResponse } from '@/utils/apisauce';

describe('Chat sagas', () => {
  it('should fetch chats', async () => {
    let action = chatsFetch();

    let step = stepper(chatsFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));

    let response = await apisauceMock.getConversations(action.payload as IChatsParams);
    expect(step(response)).toEqual(
      put(chatsSet(response.data as ICommonOkResponse<IChatsResponse>))
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatsAppendFetch();

    step = stepper(chatsAppendFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));
    expect(step(response)).toEqual(
      put(chatsAppendSet(response.data as ICommonOkResponse<IChatsResponse>))
    );
    expect(step()).toBeUndefined();
  });

  it('should invoke error', async () => {
    let action = chatsFetch();

    let step = stepper(chatsFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));

    const response = {
      ...okResponse,
      data: {
        error: {
          errorCode: 1,
          errorMsg: '',
          requestParams: [],
        },
      },
    };
    response.status = 400;
    expect(step(response)).toEqual(
      put(chatsErrorSet(response.data as ICommonErrorResponse<IChatsResponse>))
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatsAppendFetch();

    step = stepper(chatsAppendFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));
    expect(step(response)).toEqual(
      put(chatsAppendErrorSet(response.data as ICommonErrorResponse<IChatsResponse>)),
    );
    expect(step()).toBeUndefined();
  });

  test('watch test', () => {
    const step = stepper(watchChat(apisauceMock));
    expect(step()).toEqual(takeLatest(ChatActionTypes.ChatsFetch, chatsFetchSaga, apisauceMock));
    expect(step())
      .toEqual(takeLatest(ChatActionTypes.ChatsAppendFetch, chatsAppendFetchSaga, apisauceMock));
    expect(step()).toBeUndefined();
  });
});
