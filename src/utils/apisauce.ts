import {
  ApiErrorResponse,
  ApiResponse,
  ApisauceInstance,
  create,
  RequestTransform,
} from 'apisauce';
import { config } from '@/constants/api';
import { serialize } from '@/utils/helpers';
import {
  IChatMessagesParams,
  IChatMessagesResponse,
  IChatsParams,
  IChatsResponse,
} from '@/store/actions/chat.actions';

export const createApisauceService = (): IApisauceService => {
  const api: ApisauceInstance = create({
    baseURL: config.BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      connection: 'keep-alive',
    },
    withCredentials: true,
    timeout: config.TIMEOUT,
  });

  api.addRequestTransform((request): void => {
    request.url += `&v=${config.VERSION}`;
  });

  const setToken = setTokenFactory(api);

  return {
    setToken,
    getConversations: (params) =>
      api.get(`/messages.getConversations?extended=1${serialize(params)}`),
    getHistory: (params) =>
      api.get(`/messages.getHistory?extended=1${serialize(params)}`),
  };
};

export const setTokenFactory = (api: ApisauceInstance) => (token: string): void => {
  api.requestTransforms = api.requestTransforms.filter(item => item.name !== 'appendToken');
  const appendToken: RequestTransform = (request): void => {
    request.url += `&access_token=${token}`;
  };
  api.addRequestTransform(appendToken);
};

export type IApisauceService = {
  setToken: (token: string) => void;
  getConversations: (
    params: IChatsParams
  ) => Promise<ApiResponse<ICommonResponse<IChatsResponse, IChatsParams>>>;
  getHistory: (
    params: IChatMessagesParams
  ) => Promise<ApiResponse<ICommonResponse<IChatMessagesResponse, IChatMessagesParams>>>;
};

export interface ICommonOkResponse<T> {
  response: T;
}
export interface ICommonErrorResponse<P> {
  error: {
    errorCode: number;
    errorMsg: string;
    requestParams: ReadonlyArray<P>;
  };
}
export type ICommonResponse<T, P = {}> = ICommonOkResponse<T> | ICommonErrorResponse<P>;

export const okResponse: ApiResponse<{}> = {
  config: {},
  duration: 1000,
  headers: {},
  ok: true,
  originalError: null,
  problem: null,
  status: 200,
};

export const errResponse: ApiErrorResponse<{}> = {
  ...okResponse,
  ok: false,
  problem: 'SERVER_ERROR',
  originalError: {
    code: '',
    config: {},
    message: '',
    name: '',
    request: {},
    stack: '',
  },
};
