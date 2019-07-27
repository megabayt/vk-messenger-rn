export enum VkontakteScopeList {
  notify = 1,
  friends = 2,
  photos = 4,
  audio = 8,
  video = 16,
  offers = 32,
  questions = 64,
  pages = 128,
  link = 256,
  notes = 2048,
  messages = 4096,
  wall = 8192,
  ads = 32768,
  offline = 65536,
  docs = 131072,
  pages2 = 262144,
  notifications = 524288,
  stats = 1048576,
  email = 4194304,
  market = 134217728,
}

const appId = 6647219; // your client_id from https://vk.com/dev
const scope = VkontakteScopeList.friends | VkontakteScopeList.messages | VkontakteScopeList.offline;

export const config = {
  OAUTH_URL: 'https://oauth.vk.com/authorize?'
        + `client_id=${appId}`
        + `&scope=${scope}`
        + '&redirect_uri=https://oauth.vk.com/blank.html'
        + '&display=page'
        + '&response_type=token',
  BASE_URL: 'https://api.vk.com/method/',
  TIMEOUT: 5 * 1000,
  VERSION: 5.92,
  USE_FIXTURES: false,
};
