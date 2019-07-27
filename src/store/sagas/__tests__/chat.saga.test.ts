import { call, put, takeLatest } from 'redux-saga/effects';

import { chatsFetchSaga, watchChat } from '@store/sagas/chat.saga';
import { apisauceMock } from '@__mocks__/apisauceMock';
import {
  ChatActionTypes,
  chatsFetch, chatsSet, IChatsParams, IChatsResponse,
} from '@store/actions/chat.actions';
import { stepper } from '@utils/tests';
import { ICommonOkResponse } from '@utils/apisauce';

describe('Chat sagas', () => {
  it('should fetch chats', async () => {
    const action = chatsFetch();

    const step = stepper(chatsFetchSaga(apisauceMock, action));
    expect(step()).toEqual(call(apisauceMock.getConversations, (action.payload as IChatsParams)));

    const response = await apisauceMock.getConversations(action.payload as IChatsParams);
    expect(step(response)).toEqual(
      put(chatsSet(response.data as ICommonOkResponse<IChatsResponse>))
    );
    expect(step()).toBeUndefined();
  });

  test('watch test', () => {
    const step = stepper(watchChat(apisauceMock));
    expect(step()).toEqual(takeLatest(ChatActionTypes.ChatsFetch, chatsFetchSaga, apisauceMock));
    expect(step()).toBeUndefined();
  });
});
