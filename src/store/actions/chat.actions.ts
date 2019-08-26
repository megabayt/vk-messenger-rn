import { Action } from 'redux';
import { ICommonErrorResponse, ICommonOkResponse, ICommonResponse } from '@/utils/apisauce';

export enum ChatActionTypes {
  ChatsFetch = 'CHATS_FETCH',
  ChatsErrorSet = 'CHATS_ERROR_SET',
  ChatsSet = 'CHATS_SET',
  ChatsAppendFetch = 'CHATS_APPEND_FETCH',
  ChatsAppendErrorSet = 'CHATS_APPEND_ERROR_SET',
  ChatsAppendSet = 'CHATS_APPEND_SET',

  ChatMessagesFetch = 'CHAT_MESSAGES_FETCH',
  ChatMessagesErrorSet = 'CHAT_MESSAGES_ERROR_SET',
  ChatMessagesSet = 'CHAT_MESSAGES_SET',
  ChatMessagesAppendFetch = 'CHAT_MESSAGES_APPEND_FETCH',
  ChatMessagesAppendErrorSet = 'CHAT_MESSAGES_APPEND_ERROR_SET',
  ChatMessagesAppendSet = 'CHAT_MESSAGES_APPEND_SET',
}

export const chatsFetch = (params?: Partial<IChatsParams>): IChatAction => ({
  type: ChatActionTypes.ChatsFetch,
  payload: params,
});

export const chatsErrorSet = (data: ICommonErrorResponse<IChatsParams>): IChatAction => ({
  type: ChatActionTypes.ChatsErrorSet,
  payload: data,
});

export const chatsSet = (data: ICommonOkResponse<IChatsResponse>): IChatAction => ({
  type: ChatActionTypes.ChatsSet,
  payload: data,
});


export const chatsAppendFetch = (params?: Partial<IChatsParams>): IChatAction => ({
  type: ChatActionTypes.ChatsAppendFetch,
  payload: params,
});

export const chatsAppendErrorSet = (data: ICommonErrorResponse<IChatsParams>): IChatAction => ({
  type: ChatActionTypes.ChatsAppendErrorSet,
  payload: data,
});

export const chatsAppendSet = (data: ICommonOkResponse<IChatsResponse>): IChatAction => ({
  type: ChatActionTypes.ChatsAppendSet,
  payload: data,
});


export const chatMessagesFetch = (params?: Partial<IChatMessagesParams>): IChatAction => ({
  type: ChatActionTypes.ChatMessagesFetch,
  payload: params,
});

export const chatMessagesErrorSet = (
  data: ICommonErrorResponse<IChatMessagesParams>
): IChatAction => ({
  type: ChatActionTypes.ChatMessagesErrorSet,
  payload: data,
});

export const chatMessagesSet = (data: ICommonOkResponse<IChatMessagesResponse>): IChatAction => ({
  type: ChatActionTypes.ChatMessagesSet,
  payload: data,
});


export const chatMessagesAppendFetch = (params?: Partial<IChatMessagesParams>): IChatAction => ({
  type: ChatActionTypes.ChatMessagesAppendFetch,
  payload: params,
});

export const chatMessagesAppendErrorSet = (
  data: ICommonErrorResponse<IChatMessagesParams>
): IChatAction => ({
  type: ChatActionTypes.ChatMessagesAppendErrorSet,
  payload: data,
});

export const chatMessagesAppendSet = (
  data: ICommonOkResponse<IChatMessagesResponse>
): IChatAction => ({
  type: ChatActionTypes.ChatMessagesAppendSet,
  payload: data,
});

export interface IChatAction extends Action<ChatActionTypes> {
  payload?: Partial<IChatsParams>
  | ICommonResponse<IChatsResponse>
  | Partial<IChatMessagesParams>
  | ICommonResponse<IChatMessagesResponse>;
}

export type IChatsParams = {
  offset: number;
  count: number;
  filter: 'all' | 'unread' | 'important' | 'unanswered';
  extended: 1 | 0;
  bool: number;
  start_message_id: number;
  fields: string;
  group_id: number;
}

export interface IChatsResponse {
  count: number;
  items: ReadonlyArray<IChatItem>;
  profiles: ReadonlyArray<IChatProfile>;
  groups: ReadonlyArray<IChatGroup>;
}

export interface IChatGroup {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_admin: number;
  is_member: number;
  is_advertiser: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
}

export interface IChatProfile {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
  sex: number;
  screen_name: string;
  photo_50: string;
  photo_100: string;
  online: number;
}

export type IChatMergedProfiles = {
  [keyNumber: number]: IChatProfile | IChatGroup;
}

export interface IChatItem {
  conversation: IConversation;
  last_message: ILastmessage;
}

interface ILastmessage {
  date: number;
  from_id: number;
  id: number;
  out: number;
  peer_id: number;
  text: string;
  conversation_message_id: number;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fwd_messages: Array<any>;
  important: boolean;
  random_id: number;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments: Array<any>;
  is_hidden: boolean;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any;
}

interface IConversation {
  peer: IPeer;
  in_read: number;
  out_read: number;
  last_message_id: number;
  can_write: ICanwrite;
  current_keyboard?: ICurrentkeyboard;
  chat_settings?: IChatsettings;
  unread_count?: number;
}

interface IChatsettings {
  owner_id: number;
  title: string;
  state: string;
  acl: IAcl;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  active_ids: Array<any>;
}

interface IAcl {
  can_change_info: boolean;
  can_change_invite_link: boolean;
  can_change_pin: boolean;
  can_invite: boolean;
  can_promote_users: boolean;
  can_see_invite_link: boolean;
  can_moderate: boolean;
}


interface ICurrentkeyboard {
  one_time: boolean;
  author_id: number;
  buttons: Array<Array<IButton>>;
}

interface IButton {
  action: IButtonAction;
  color: string;
}

interface IButtonAction {
  type: string;
  label: string;
  payload: string;
}

interface ICanwrite {
  allowed: boolean;
  reason?: number;
}

interface IPeer {
  id: number;
  type: string;
  local_id: number;
}

export type IChatMessagesParams = {
  offset: number;
  count: number;
  user_id: number;
  peer_id: number;
  start_message_id: number;
  rev: 1 | 0;
  fields: string;
  group_id: number;
  extended: 1 | 0;
}
export interface IChatMessagesResponse {
  count: number;
  items: Array<IMessageItem>;
  conversations: Array<IConversation>;
  profiles: Array<IChatProfile>;
  groups: Array<IChatGroup>;
}
interface IMessageItem {
  date: number;
  from_id: number;
  id: number;
  out: number;
  peer_id: number;
  text: string;
  conversation_message_id: number;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fwd_messages: Array<any>;
  important: boolean;
  random_id: number;
  // TODO: Убрать any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments: Array<any>;
  is_hidden: boolean;
  update_time?: number;
}
