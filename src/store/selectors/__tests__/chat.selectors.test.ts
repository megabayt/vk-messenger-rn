import {
  getChatProfilesCombiner,
  getChatChatsCountSelector,
  getChatChatsSelector,
  getChatConversationsSelector,
} from '../chat.selectors';

import { conversations } from '@/__mocks__/responses/getConversations';
import { IStateUnion } from '@/store/reducers';
import { RecursivePartial } from '@/interfaces';

describe('chat selectors', () => {
  const state: RecursivePartial<IStateUnion> = {
    chat: {
      chats: {
        fetching: false,
        error: null,
        data: conversations,
      },
    },
  };
  it('should get Chats', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chats = getChatChatsSelector(state as any);
    // @ts-ignore
    expect(chats).toEqual(state.chat.chats.data);
  });
  it('should get ChatsCount', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chats = getChatChatsCountSelector(state as any);
    // @ts-ignore
    expect(chats).toEqual(state.chat.chats.data.response.count);
  });
  it('should get conversations', () => {
    const conv = getChatConversationsSelector(state as any);
    // @ts-ignore
    expect(conv).toEqual(state.chat.chats.data.response.items);
  });
  it('should generate array of profiles', () => {
    const profiles = getChatProfilesCombiner(conversations);
    /* eslint-disable quote-props */
    expect(profiles).toEqual( {
      '1': { id: 1,
        first_name: 'Иван',
        last_name: 'Иванов',
        is_closed: false,
        can_access_closed: true,
        sex: 2,
        screen_name: 'ivan',
        photo_50: 'https://unsplash.it/500/500?random',
        photo_100: 'https://unsplash.it/500/500?random',
        online: 1 },
      '2':{ id: 2,
        first_name: 'Ивана',
        last_name: 'Иванова',
        is_closed: false,
        can_access_closed: true,
        sex: 1,
        screen_name: 'ivana',
        photo_50: 'https://unsplash.it/500/500?random',
        photo_100: 'https://unsplash.it/500/500?random',
        online: 1 },
      '-1':
        { id: 1,
          name: 'Тестовая компания',
          screen_name: 'testo',
          is_closed: 0,
          type: 'page',
          is_admin: 0,
          is_member: 0,
          is_advertiser: 0,
          photo_50: 'https://unsplash.it/500/500?random',
          photo_100: 'https://unsplash.it/500/500?random',
          photo_200: 'https://unsplash.it/500/500?random1' } });
  });
  /* eslint-enable quote-props */
});
