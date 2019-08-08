import { /* getChatProfiles, */ getConversations } from '../chat.selectors';

import conversations from '@/__mocks__/json/getConversations.json';
import { IStateUnion } from '@/store/reducers';

describe('chat selectors', () => {
  const state: IStateUnion = {
    chat: {
      chats: {
        fetching: false,
        error: false,
        data: conversations,
      },
    },
  };
  it('should get chats', () => {
    const chats = getConversations(state);
    // @ts-ignore
    expect(chats).toEqual(state.chat.chats.data.response.items);
  });
  // it('should generate array of profiles', () => {
  //   const profiles = getChatProfiles(state);
  // });
});
