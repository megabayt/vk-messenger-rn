import { Reducer } from 'redux';
import { compose, lensPath, concat, view, set } from 'ramda';

import {
  ChatActionTypes,
  IChatAction, IChatMessagesParams, IChatMessagesResponse,
  IChatsParams,
  IChatsResponse,
} from '../actions/chat.actions';
import { ICommonErrorResponse, ICommonOkResponse } from '@/utils/apisauce';

export interface IChatState {
  readonly chats: {
    readonly fetching: boolean;
    readonly error: ICommonErrorResponse<IChatsParams> | null;
    readonly data: ICommonOkResponse<IChatsResponse> | null;
  };
  readonly messages: {
    readonly fetching: boolean;
    readonly error: ICommonErrorResponse<IChatMessagesParams> | null;
    readonly data: ICommonOkResponse<IChatMessagesResponse> | null;
  };
}
export const initialChatState: IChatState = {
  chats: {
    fetching: false,
    error: null,
    data: null,
  },
  messages: {
    fetching: false,
    error: null,
    data: null,
  },
};

export const chatReducer: Reducer<IChatState, IChatAction> = (state = initialChatState, action) => {
  switch (action.type) {
    case ChatActionTypes.ChatsFetch:
    case ChatActionTypes.ChatsAppendFetch:
      return compose(
        set(lensStateChatsFetching, true) as (obj: IChatState) => IChatState,
        set(lensStateChatsError, null) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatsSet:
      return compose(
        set(lensStateChatsFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatsData, action.payload) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatsErrorSet:
    case ChatActionTypes.ChatsAppendErrorSet:
      return compose(
        set(lensStateChatsFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatsError, action.payload) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatsAppendSet:
      return compose(
        set(lensStateChatsFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatsItems, concat(
          view(lensStateChatsItems, state) || [],
          view(lensPayloadItems, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
        set(lensStateChatsProfiles, concat(
          view(lensStateChatsProfiles, state) || [],
          view(lensPayloadProfiles, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
        set(lensStateChatsGroups, concat(
          view(lensStateChatsGroups, state) || [],
          view(lensPayloadGroups, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatMessagesFetch:
    case ChatActionTypes.ChatMessagesAppendFetch:
      return compose(
        set(lensStateChatMessagesFetching, true) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesError, null) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatMessagesSet:
      return compose(
        set(lensStateChatMessagesFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesData, action.payload) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatMessagesErrorSet:
    case ChatActionTypes.ChatMessagesAppendErrorSet:
      return compose(
        set(lensStateChatMessagesFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesError, action.payload) as (obj: IChatState) => IChatState,
      )(state);
    case ChatActionTypes.ChatMessagesAppendSet:
      return compose(
        set(lensStateChatMessagesFetching, false) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesItems, concat(
          view(lensStateChatMessagesItems, state) || [],
          view(lensPayloadItems, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesConversations, concat(
          view(lensStateChatMessagesConversations, state) || [],
          view(lensPayloadConversations, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesProfiles, concat(
          view(lensStateChatMessagesProfiles, state) || [],
          view(lensPayloadProfiles, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
        set(lensStateChatMessagesGroups, concat(
          view(lensStateChatMessagesGroups, state) || [],
          view(lensPayloadGroups, action.payload) || [],
        )) as (obj: IChatState) => IChatState,
      )(state);
    default:
      return state;
  }
};

const lensStateChatsFetching = lensPath(['chats', 'fetching']);
const lensStateChatsError = lensPath(['chats', 'error']);
const lensStateChatsData = lensPath(['chats', 'data']);

const lensStateChatsItems = lensPath(['chats', 'data', 'response', 'items']);
const lensPayloadItems = lensPath(['response', 'items']);

const lensStateChatsProfiles = lensPath(['chats', 'data', 'response', 'profiles']);
const lensPayloadProfiles = lensPath(['response', 'profiles']);

const lensStateChatsGroups = lensPath(['chats', 'data', 'response', 'groups']);
const lensPayloadGroups = lensPath(['response', 'groups']);


const lensStateChatMessagesFetching = lensPath(['messages', 'fetching']);
const lensStateChatMessagesError = lensPath(['messages', 'error']);
const lensStateChatMessagesData = lensPath(['messages', 'data']);

const lensStateChatMessagesItems = lensPath(['messages', 'data', 'response', 'items']);

const lensStateChatMessagesConversations =
  lensPath(['messages', 'data', 'response', 'conversations']);
const lensPayloadConversations = lensPath(['response', 'conversations']);

const lensStateChatMessagesProfiles = lensPath(['messages', 'data', 'response', 'profiles']);

const lensStateChatMessagesGroups = lensPath(['messages', 'data', 'response', 'groups']);
