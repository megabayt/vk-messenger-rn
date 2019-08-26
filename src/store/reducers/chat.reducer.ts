import { Reducer } from 'redux';
import produce from 'immer';

import { ChatActionTypes, IChatAction, IChatsResponse } from '../actions/chat.actions';
import { ICommonResponse } from '@/utils/apisauce';

export interface IChatState {
  readonly chats: {
    readonly fetching: boolean;
    readonly error: boolean;
    readonly data: ICommonResponse<IChatsResponse> | null;
  };
}
export const initialChatState: IChatState = {
  chats: {
    fetching: false,
    error: false,
    data: null,
  },
};

export const chatReducer: Reducer<IChatState, IChatAction> = (state = initialChatState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case ChatActionTypes.ChatsFetch:
        draftState.chats.fetching = true;
        draftState.chats.error = false;
        break;
      case ChatActionTypes.ChatsSet:
        draftState.chats.fetching = false;
        (draftState.chats.data as IChatState['chats']['data']) =
          action.payload as IChatState['chats']['data'];
        break;
      case ChatActionTypes.ChatsAppendFetch:
        draftState.chats.fetching = true;
        draftState.chats.error = false;
        break;
      case ChatActionTypes.ChatsAppendSet:
        draftState.chats.fetching = false;
        // @ts-ignore
        draftState.chats.data.response.items = [
          // @ts-ignore
          ...draftState.chats.data.response.items,
          // @ts-ignore
          ...action.payload.response.items,
        ];
        // @ts-ignore
        draftState.chats.data.response.profiles = [
          // @ts-ignore
          ...draftState.chats.data.response.profiles,
          // @ts-ignore
          ...action.payload.response.profiles,
        ];
        // @ts-ignore
        draftState.chats.data.response.groups = [
          // @ts-ignore
          ...draftState.chats.data.response.groups,
          // @ts-ignore
          ...action.payload.response.groups,
        ];
        break;
    }
  });
