import { createSelector } from 'reselect';
import { pipe, concat, reduce, converge, path } from 'ramda';
import {
  IChatGroup,
  IChatItem,
  IChatMergedProfiles,
  IChatProfile,
  IChatsResponse,
} from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { ICommonOkResponse } from '@/utils/apisauce';

export const getChatsSelector = (state: IStateUnion): ICommonOkResponse<IChatsResponse> | null =>
  path(['chat', 'chats', 'data'], state) || null;

export const getChatsCountSelector = (state: IStateUnion): number =>
  path(['chat', 'chats', 'data', 'response', 'count'], state) || 0;

export const getChatProfilesCombiner =
  (data: ICommonOkResponse<IChatsResponse> | null): IChatMergedProfiles => {
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

    // TODO: Разобраться, почему тс ворчит по поводу количества аргументов,
    //  несмотря на то, что все работает
    // @ts-ignore
    return data ? pipe(getArray, getProfilesReduce)(data) : [];
  };

export const getChatProfilesSelector = createSelector(
  [getChatsSelector],
  getChatProfilesCombiner,
);

export const getConversationsCombiner =
  (data: ICommonOkResponse<IChatsResponse> | null): ReadonlyArray<IChatItem> => {
    return path(['response', 'items'], data) || [];
  };

export const getConversationsSelector = createSelector(
  [getChatsSelector],
  getConversationsCombiner,
);
