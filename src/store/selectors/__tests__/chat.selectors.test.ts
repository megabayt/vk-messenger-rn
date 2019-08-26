import {
  getChatProfilesCombiner,
  getChatsCountSelector,
  getChatsSelector,
  getConversationsCombiner
} from '../chat.selectors';

import { conversations } from '@/__mocks__/responses/getConversations';
import { IStateUnion } from '@/store/reducers';

describe('chat selectors', () => {
  const state: Partial<IStateUnion> = {
    chat: {
      chats: {
        fetching: false,
        error: null,
        data: conversations,
      },
    },
  };
  it('should get Chats', () => {
    const chats = getChatsSelector(state as any);
    // @ts-ignore
    expect(chats).toEqual(state.chat.chats);
  });
  it('should get ChatsCount', () => {
    const chats = getChatsCountSelector(state as any);
    // @ts-ignore
    expect(chats).toEqual(state.chat.chats.data.response.count);
  });
  it('should get conversations', () => {
    const conv = getConversationsCombiner(conversations);
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
