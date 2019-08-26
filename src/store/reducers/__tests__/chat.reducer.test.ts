import { chatsFetch, chatsSet, IChatsResponse } from '@/store/actions/chat.actions';
import { chatReducer, initialChatState } from '@/store/reducers/chat.reducer';
import { ICommonResponse } from '@/utils/apisauce';

describe('chat reducer', () => {
  it('should set fetch flag', () => {
    const state = chatReducer(initialChatState, chatsFetch());
    expect(state.chats.fetching).toBe(true);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toBe(null);
  });

  it('should set returned data', () => {
    const data: ICommonResponse<IChatsResponse> = {
      response: {
        count: 0,
        items: [],
        groups: [],
        profiles: [],
      },
    };
    const state = chatReducer(initialChatState, chatsSet(data));
    expect(state.chats.fetching).toBe(false);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toBe(data);
  });
});
