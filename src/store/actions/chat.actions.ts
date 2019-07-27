import { Action } from 'redux';
import { ICommonResponse } from '@/utils/apisauce';
import { IAttachment } from '@/interfaces';

export enum ChatActionTypes {
  ChatsFetch = 'CHATS_FETCH',
  ChatsSet = 'CHATS_SET',
}

export const chatsFetch = (params?: Partial<IChatsParams>): IChatAction => ({
  type: ChatActionTypes.ChatsFetch,
  payload: params,
});

export const chatsSet = (data: ICommonResponse<IChatsResponse>): IChatAction => ({
  type: ChatActionTypes.ChatsSet,
  payload: data,
});

export interface IChatAction extends Action<ChatActionTypes> {
  payload?:
  Partial<IChatsParams>
  | ICommonResponse<IChatsResponse>;
}

export type IChatsParams = {
  offset: number;
  count: number;
  filter: 'all' | 'unread' | 'important' | 'unanswered';
  extended: number;
  bool: number;
  startMessageId: number;
  fields: string;
  groupId: number;
}

export interface IChatsResponse {
  count: number;
  items: ReadonlyArray<IChatItem>;
  profiles: ReadonlyArray<IChatProfile>;
  groups: ReadonlyArray<IChatGroup>;
}

export interface IChatMergedProfiles {
  keyNumber: IChatProfile | IChatGroup;
}
export interface IChatProfile {
  id: number;
  firstName: string;
  lastName: string;
  isClosed: boolean;
  canAccessClosed: boolean;
  sex: number;
  screenName: string;
  photo50: string;
  photo100: string;
  online: number;
  onlineApp: string;
  onlineMobile: number;

}
export interface IChatGroup {
  id: number;
  name: string;
  screenName: string;
  isClosed: number;
  type: string;
  isAdmin: number;
  isMember: number;
  isAdvertiser: number;
  photo50: string;
  photo100: string;
  photo200: string;
  adminLevel: number;
}
export interface IChatItem {
  conversation: {
    peer: {
      id: number;
      type: 'user' | 'chat' | 'group' | 'email';
      localId: number;
    };
    inRead: number;
    outRead: number;
    lastMessageId: number;
    canWrite: {
      allowed: boolean;
    };
    chatSettings: {
      title: string;
      membersCount: number;
      state: string;
      activeIds: ReadonlyArray<number>;
      acl: {
        canInvite: boolean;
        canChangeInfo: boolean;
        canChangePin: boolean;
        canPromoteUsers: boolean;
        canSeeInviteLink: boolean;
        canChangeInviteLink: boolean;
      };
      isGroupChannel: boolean;
      ownerId: number;
    };
  };
  lastMessage: {
    date: number;
    fromId: number;
    id: number;
    out: number;
    peerId: number;
    text: string;
    conversationMessageId: number;
    fwdMessages: ReadonlyArray<IChatFwdmessage>;
    important: boolean;
    randomId: number;
    attachments: ReadonlyArray<IAttachment>;
    isHidden: boolean;
  };
}

interface IChatFwdmessage {
  date: number;
  from_id: number;
  text: string;
  attachments: ReadonlyArray<IAttachment>;
  conversation_message_id: number;
  peer_id: number;
  id: number;
}
