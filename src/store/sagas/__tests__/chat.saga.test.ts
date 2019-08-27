import { call, put, takeLatest } from 'redux-saga/effects';

import {
  chatMessagesAppendFetchSaga,
  chatMessagesFetchSaga,
  chatsAppendFetchSaga,
  chatsFetchSaga,
  watchChat,
} from '@/store/sagas/chat.saga';
import { apisauceMock } from '@/__mocks__/apisauceMock';
import {
  ChatActionTypes,
  chatMessagesAppendErrorSet,
  chatMessagesAppendFetch,
  chatMessagesAppendSet,
  chatMessagesErrorSet,
  chatMessagesFetch,
  chatMessagesSet,
  chatsAppendErrorSet,
  chatsAppendFetch,
  chatsAppendSet,
  chatsErrorSet,
  chatsFetch,
  chatsSet,
  IChatMessagesParams, IChatMessagesResponse,
  IChatsParams,
  IChatsResponse,
} from '@/store/actions/chat.actions';
import { stepper } from '@/utils/tests';
import { ICommonErrorResponse, ICommonOkResponse, okResponse } from '@/utils/apisauce';

describe('Chat sagas', () => {
  it('should fetch chats', async () => {
    let action = chatsFetch();

    let step = stepper(chatsFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any = await apisauceMock.getConversations(action.payload as IChatsParams);
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

    // -------------------------------------------------------

    action = chatMessagesFetch();
    response = await apisauceMock.getHistory(action.payload as IChatMessagesParams);

    step = stepper(chatMessagesFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getHistory, (action.payload as IChatMessagesParams)));
    expect(step(response)).toEqual(
      put(chatMessagesSet(response.data as ICommonOkResponse<IChatMessagesResponse>))
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatMessagesAppendFetch();

    step = stepper(chatMessagesAppendFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getHistory, (action.payload as IChatMessagesParams)));
    expect(step(response)).toEqual(
      put(chatMessagesAppendSet(response.data as ICommonOkResponse<IChatMessagesResponse>))
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
      put(chatsErrorSet(response.data as ICommonErrorResponse<IChatsParams>))
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatsAppendFetch();

    step = stepper(chatsAppendFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));
    expect(step(response)).toEqual(
      put(chatsAppendErrorSet(response.data as ICommonErrorResponse<IChatsParams>)),
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatMessagesFetch();

    step = stepper(chatMessagesFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getHistory, (action.payload as IChatMessagesParams)));
    expect(step(response)).toEqual(
      put(chatMessagesErrorSet(response.data as ICommonErrorResponse<IChatMessagesParams>)),
    );
    expect(step()).toBeUndefined();

    // -------------------------------------------------------

    action = chatMessagesAppendFetch();

    step = stepper(chatMessagesAppendFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getHistory, (action.payload as IChatMessagesParams)));
    expect(step(response)).toEqual(
      put(chatMessagesAppendErrorSet(response.data as ICommonErrorResponse<IChatMessagesParams>)),
    );
    expect(step()).toBeUndefined();
  });

  test('watch test', () => {
    const step = stepper(watchChat(apisauceMock));
    expect(step()).toEqual(takeLatest(ChatActionTypes.ChatsFetch, chatsFetchSaga, apisauceMock));
    expect(step())
      .toEqual(takeLatest(ChatActionTypes.ChatsAppendFetch, chatsAppendFetchSaga, apisauceMock));
    expect(step())
      .toEqual(takeLatest(ChatActionTypes.ChatMessagesFetch, chatMessagesFetchSaga, apisauceMock));
    expect(step())
      .toEqual(takeLatest(
        ChatActionTypes.ChatMessagesAppendFetch, chatMessagesAppendFetchSaga, apisauceMock,
      ));
    expect(step()).toBeUndefined();
  });
});
