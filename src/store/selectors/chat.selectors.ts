import { createSelector } from 'reselect';
import { pipe, concat, reduce, converge, path, map } from 'ramda';
import moment from 'moment';
import { IMessage } from 'react-native-gifted-chat';
import {
  IChatGroup,
  IChatItem,
  IChatMergedProfiles,
  IChatMessagesResponse,
  IChatProfile,
  IChatsResponse, IMessageItem,
} from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { ICommonOkResponse } from '@/utils/apisauce';
import { getFullName } from '@/utils/helpers';

export const getChatChatsSelector =
  (state: IStateUnion): ICommonOkResponse<IChatsResponse> | null =>
    path(['chat', 'chats', 'data'], state) || null;

export const getChatChatsCountSelector = (state: IStateUnion): number =>
  path(['chat', 'chats', 'data', 'response', 'count'], state) || 0;

export const getChatConversationsSelector =
  (state: IStateUnion): ReadonlyArray<IChatItem> =>
    path(['chat', 'chats', 'data', 'response', 'items'], state) || [];

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
  [getChatChatsSelector],
  getChatProfilesCombiner,
);

export const getChatMessagesSelector =
  (state: IStateUnion): ICommonOkResponse<IChatMessagesResponse> | null =>
    path(['chat', 'messages', 'data'], state) || null;

export const getChatMessagesCountSelector = (state: IStateUnion): number =>
  path(['chat', 'messages', 'data', 'response', 'count'], state) || 0;

export const getChatMessagesTransformedCombiner =
  (
    data: ICommonOkResponse<IChatMessagesResponse> | null,
    profiles: IChatMergedProfiles,
  ): Array<IMessage> => {
    const getItems = path(['response', 'items']);
    const itemsMapper = map((item: IMessageItem): IMessage => {
      const fromId = item.from_id || -1;
      const profile = profiles[fromId] || {};

      return {
        _id: item.id,
        text: item.text,
        createdAt: moment.unix(item.date).toDate(),
        user: {
          _id: fromId,
          name: getFullName(profile, item),
          avatar: profile.photo_50,
        },
      };
    });
    // TODO: Разобраться, почему тс ворчит по поводу количества аргументов,
    //  несмотря на то, что все работает
    // @ts-ignore
    return data ? pipe(getItems, itemsMapper)(data) : [];
  };

export const getChatMessagesTransformedSelector = createSelector(
  [getChatMessagesSelector, getChatProfilesSelector],
  getChatMessagesTransformedCombiner,
);
