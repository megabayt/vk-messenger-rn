import { createSelector } from 'reselect';
import { pipe, concat, reduce, converge, path } from 'ramda';
import {
  IChatGroup, IChatItem,
  IChatMergedProfiles,
  IChatProfile,
  IChatsResponse,
} from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { ICommonResponse } from '@/utils/apisauce';

const getChats = (state: IStateUnion): ICommonResponse<IChatsResponse> | null =>
  path(['chat', 'chats', 'data'], state) || null;
export const getChatProfiles = createSelector(
  [getChats],
  (data: ICommonResponse<IChatsResponse> | null): IChatMergedProfiles => {
    return {};
    const getProfiles = path(['response', 'profiles']);
    const getGroups = path(['response', 'groups']);
    // get an array of profiles and groups
    const getArray = converge(concat, [getProfiles, getGroups]);
    const getProfilesReduce =
      reduce((result: IChatMergedProfiles, item: IChatProfile | IChatGroup) => {
        if ((item as IChatGroup).type) {
          result[-item.id] = item;
        } else {
          result[item.id] = item;
        }
        return result;
      }, {});

    return (pipe(getArray, getProfilesReduce) as any)(data) || {};
  },
);

export const getConversations = createSelector(
  [getChats],
  (data: ICommonResponse<IChatsResponse> | null): ReadonlyArray<IChatItem> => {
    return path(['response', 'items'], data) || [];
  },
);
