import { IApisauceService, okResponse } from '@/utils/apisauce';

export const apisauceMock: IApisauceService = {
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
};
