import {createSelector} from 'reselect';
import {concat, converge, path, pipe, reduce} from 'ramda';
import moment from 'moment';
import {IMessage} from 'react-native-gifted-chat';
import {
  IAttachmentType,
  IChatGroup,
  IChatItem,
  IChatMergedProfiles,
  IChatMessagesResponse,
  IChatProfile,
  IChatsResponse,
  IItemAttachment,
  IMessageItem,
} from '@/store/actions/chat.actions';
import {IStateUnion} from '@/store/reducers';
import {ICommonOkResponse} from '@/utils/apisauce';
import {getFullName} from '@/utils/helpers';

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
    const itemsReducer = reduce(
      (acc: Array<IMessage>, item: IMessageItem): Array<IMessage> => {
        const fromId = item.from_id || -1;
        const profile = profiles[fromId] || {};
        const attachments = item.attachments || [];
        let message: IMessage = {
          _id: item.id,
          text: item.text,
          createdAt: moment.unix(item.date).toDate(),
          user: {
            _id: fromId,
            name: getFullName(profile, item),
            avatar: profile.photo_50,
          },
        };

        function attachmentsMapper(attachment: IItemAttachment): IMessage {
          switch (attachment.type) {
            case IAttachmentType.Photo:
              const photoSizes: Array<{ url: string }> = path(['photo', 'sizes'], attachment) || [];
              return { ...message, image: photoSizes[photoSizes.length - 1].url };
            case IAttachmentType.Sticker:
              const sticker: Array<{ url: string }> = path(['sticker', 'images'], attachment) || [];
              return { ...message, image: sticker[sticker.length - 1].url };
            case IAttachmentType.Link:
              return { ...message, text: path(['link', 'url'], attachment) || '' };
            case IAttachmentType.Audio:
              const artist: string = path(['audio', 'artist'], attachment) || '';
              const title: string = path(['audio', 'title'], attachment) || '';
              return {
                ...message,
                text: `${artist} - ${title}`,
                audio: path(['audio', 'url'], attachment) || '',
              };
            case IAttachmentType.Video:
              const previews: Array<{ url: string }> = path(['video', 'image'], attachment) || [];
              const videoOwnerId: string = path(['video', 'owner_id'], attachment) || '';
              const videoId: string = path(['video', 'id'], attachment) || '';
              return {
                ...message,
                text: `https://vk.com/video${videoOwnerId}_${videoId}`,
                audio: previews[previews.length - 1].url,
              };
            case IAttachmentType.Wall:
              const wallOwnerId: string = path(['wall', 'from_id'], attachment) || '';
              const wallId: string = path(['wall', 'id'], attachment) || '';
              return {
                ...message,
                text: `https://vk.com/wall${wallOwnerId}_${wallId}`,
              };
          }
          return message;
        }

        if (attachments.length) {
          return [
            ...acc,
            ...attachments.map(attachmentsMapper),
          ];
        }

        return [
          ...acc,
          message,
        ];
      },
      [] as Array<IMessage>,
    );
    // TODO: Разобраться, почему тс ворчит по поводу количества аргументов,
    //  несмотря на то, что все работает
    // @ts-ignore
    return data ? pipe(getItems, itemsReducer)(data) : [];
  };

export const getChatMessagesTransformedSelector = createSelector(
  [getChatMessagesSelector, getChatProfilesSelector],
  getChatMessagesTransformedCombiner,
);

