import {
  chatMessagesAppendErrorSet,
  chatMessagesAppendFetch, chatMessagesAppendSet, chatMessagesErrorSet,
  chatMessagesFetch, chatMessagesSet,
  chatsAppendErrorSet,
  chatsAppendFetch,
  chatsAppendSet,
  chatsErrorSet,
  chatsFetch,
  chatsSet,
} from '@/store/actions/chat.actions';
import { chatReducer, initialChatState } from '@/store/reducers/chat.reducer';
import { conversations } from '@/__mocks__/responses/getConversations';
import { messages } from '@/__mocks__/responses/getHistory';

describe('chat reducer', () => {
  it('should have initialState', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = (chatReducer as any)(undefined, { type: '' });
    expect(state).toEqual(initialChatState);
  });
  it('should set fetch flag', () => {
    let state = chatReducer(initialChatState, chatsFetch());
    expect(state.chats.fetching).toBe(true);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toBe(null);

    state = chatReducer(initialChatState, chatsAppendFetch());
    expect(state.chats.fetching).toBe(true);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toBe(null);

    state = chatReducer(initialChatState, chatMessagesFetch());
    expect(state.messages.fetching).toBe(true);
    expect(state.messages.error).toBe(null);
    expect(state.messages.data).toBe(null);

    state = chatReducer(initialChatState, chatMessagesAppendFetch());
    expect(state.messages.fetching).toBe(true);
    expect(state.messages.error).toBe(null);
    expect(state.messages.data).toBe(null);
  });
  it('should set returned data', () => {
    let state = chatReducer(initialChatState, chatsSet(conversations));
    expect(state.chats.fetching).toBe(false);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toEqual(conversations);

    state = chatReducer(initialChatState, chatMessagesSet(messages));
    expect(state.messages.fetching).toBe(false);
    expect(state.messages.error).toBe(null);
    expect(state.messages.data).toEqual(messages);
  });
  it('should append returned data', () => {
    let state = chatReducer(initialChatState, chatsSet(conversations));
    state = chatReducer(state, chatsAppendSet(conversations));
    expect(state.chats.fetching).toBe(false);
    expect(state.chats.error).toBe(null);
    expect(state.chats.data).toEqual({
      response: {
        ...conversations.response,
        items: [
          // @ts-ignore
          ...conversations.response.items,
          ...conversations.response.items,
        ],
        profiles: [
          // @ts-ignore
          ...conversations.response.profiles,
          ...conversations.response.profiles,
        ],
        groups: [
          // @ts-ignore
          ...conversations.response.groups,
          ...conversations.response.groups,
        ],
      },
    });

    state = chatReducer(initialChatState, chatMessagesSet(messages));
    state = chatReducer(state, chatMessagesAppendSet(messages));
    expect(state.messages.fetching).toBe(false);
    expect(state.messages.error).toBe(null);
    expect(state.messages.data).toEqual({
      response: {
        ...messages.response,
        items: [
          // @ts-ignore
          ...messages.response.items,
          ...messages.response.items,
        ],
        conversations: [
          // @ts-ignore
          ...messages.response.conversations,
          ...messages.response.conversations,
        ],
        profiles: [
          // @ts-ignore
          ...messages.response.profiles,
          ...messages.response.profiles,
        ],
        groups: [
          // @ts-ignore
          ...messages.response.groups,
          ...messages.response.groups,
        ],
      },
    });
  });
  it('should set returned error', () => {
    const errorData = {
      error: {
        errorCode: 1,
        errorMsg: '',
        requestParams: [],
      },
    };
    let state = chatReducer(initialChatState, chatsErrorSet(errorData));
    expect(state.chats.fetching).toBe(false);
    expect(state.chats.error).toEqual(errorData);

    state = chatReducer(initialChatState, chatsAppendErrorSet(errorData));
    expect(state.chats.fetching).toBe(false);
    expect(state.chats.error).toEqual(errorData);

    state = chatReducer(initialChatState, chatMessagesErrorSet(errorData));
    expect(state.messages.fetching).toBe(false);
    expect(state.messages.error).toEqual(errorData);

    state = chatReducer(initialChatState, chatMessagesAppendErrorSet(errorData));
    expect(state.messages.fetching).toBe(false);
    expect(state.messages.error).toEqual(errorData);
  });
});
