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

  ChatSendFetch = 'CHAT_SEND_FETCH',
  ChatSendErrorSet = 'CHAT_SEND_ERROR_SET',
  ChatSendSet = 'CHAT_SEND_SET',
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

export const chatSendFetch = (params?: Partial<IChatSendParams>): IChatAction => ({
  type: ChatActionTypes.ChatSendFetch,
  payload: params,
});

export const chatSendErrorSet = (
  data: ICommonErrorResponse<IChatSendParams>
): IChatAction => ({
  type: ChatActionTypes.ChatSendErrorSet,
  payload: data,
});

export const chatSendSet = (
  data: ICommonOkResponse<number>
): IChatAction => ({
  type: ChatActionTypes.ChatSendSet,
  payload: data,
});

export interface IChatAction extends Action<ChatActionTypes> {
  payload?: Partial<IChatsParams>
  | ICommonResponse<IChatsResponse>
  | Partial<IChatMessagesParams>
  | ICommonResponse<IChatMessagesResponse>
  | Partial<IChatSendParams>
  | ICommonResponse<number>;
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
  count:         number;
  items:         Array<IMessageItem>;
  conversations: Array<IConversation>;
  profiles:      Array<IChatProfile>;
  groups:        Array<IChatGroup>;
}

export interface IMessageItem {
  date:                    number;
  from_id:                 number;
  id:                      number;
  out:                     number;
  peer_id:                 number;
  text:                    string;
  conversation_message_id: number;
  fwd_messages:            Array<IFwdMessage>;
  important:               boolean;
  random_id:               number;
  attachments:             Array<IItemAttachment>;
  is_hidden:               boolean;
}

export interface IItemAttachment {
  type:     IAttachmentType;
  wall?:    IWallAttachment;
  link?:    ILinkAttachment;
  photo?:   IPhotoAttachment;
  sticker?: IStickerAttachment;
}

export interface ILinkAttachment {
  url:          string;
  title:        string;
  caption?:     string;
  description:  string;
  photo:        IPhotoAttachment;
  is_favorite?: boolean;
  target?:      string;
}

export interface IPhotoAttachment {
  id:          number;
  album_id:    number;
  owner_id:    number;
  sizes:       Array<IAttachmentSize>;
  text:        string;
  date:        number;
  access_key?: string;
  user_id?:    number;
  post_id?:    number;
}

export interface IAttachmentSize {
  type?:  ISizeType;
  url:    string;
  width:  number;
  height: number;
}

export enum ISizeType {
  K = 'k',
  L = 'l',
  M = 'm',
  O = 'o',
  P = 'p',
  Q = 'q',
  R = 'r',
  S = 's',
  Temp = 'temp',
  W = 'w',
  X = 'x',
  Y = 'y',
  Z = 'z',
}

export interface IStickerAttachment {
  product_id:             number;
  sticker_id:             number;
  images:                 Array<IAttachmentSize>;
  images_with_background: Array<IAttachmentSize>;
  animation_url?:         string;
}

export enum IAttachmentType {
  Link = 'link',
  Photo = 'photo',
  Sticker = 'sticker',
  Wall = 'wall',
  Audio = 'audio',
  Video = 'video',
  Gift = 'gift',
}

export interface IWallAttachment {
  id:            number;
  from_id:       number;
  to_id:         number;
  date:          number;
  post_type:     string;
  text:          string;
  copy_history?: Array<ICopyHistory>;
  marked_as_ads: number;
  post_source:   IWallPostSource;
  comments:      IWallComment;
  likes:         IWallLikes;
  reposts:       IWallReposts;
  views:         IWallViews;
  is_favorite:   boolean;
  access_key:    string;
  attachments?:  Array<IWallContentAttachment>;
  signer_id?:    number;
}

export interface IWallContentAttachment {
  type:   IAttachmentType;
  photo?: IPhotoAttachment;
  link?:  ILinkAttachment;
}

export interface IWallComment {
  count:            number;
  can_post:         number;
  groups_can_post?: boolean;
}

export interface ICopyHistory {
  id:          number;
  owner_id:    number;
  from_id:     number;
  date:        number;
  post_type:   string;
  text:        string;
  attachments: Array<ICopyHistoryAttachment>;
  post_source: ICopyHistoryPostSource;
}

export interface ICopyHistoryAttachment {
  type:  IAttachmentType;
  photo: IPhotoAttachment;
}

export interface ICopyHistoryPostSource {
  type: string;
}

export interface IWallLikes {
  count:       number;
  user_likes:  number;
  can_like:    number;
  can_publish: number;
}

export interface IWallPostSource {
  type:      string;
  platform?: string;
}

export interface IWallReposts {
  count:         number;
  user_reposted: number;
}

export interface IWallViews {
  count: number;
}

export interface IFwdMessage {
  date:                    number;
  from_id:                 number;
  text:                    string;
  attachments:             Array<any>;
  conversation_message_id: number;
}

export type IChatSendParams = {
  user_id: number;
  random_id: number;
  peer_id: number;
  domain: string;
  chat_id: number;
  user_ids: string;
  message: string;
  guid: any;
  lat: number;
  long: number;
  attachment: string;
  reply_to: number;
  forward_messages: string;
  forward: any;
  sticker_id: number;
  group_id: number;
  keyboard: any;
  payload: any;
  dont_parse_links: 1 | 0;
  disable_mentions: 1 | 0;
}
