import { IApisauceService, okResponse } from '@/utils/apisauce';

export const apisauceMock: IApisauceService = {
  setToken: jest.fn(),
  getConversations: jest.fn(async () => ({
    ...okResponse,
    data: {
      response: {
        count: 0,
        groups: [],
        items: [],
        profiles: [],
      },
    },
  })),
  getHistory: jest.fn(async () => ({
    ...okResponse,
    data: {
      response: {
        count: 0,
        items: [],
        conversations: [],
        profiles: [],
        groups: [],
      },
    },
  })),
  getUsers: jest.fn(),
  sendMessage: jest.fn(),
};
