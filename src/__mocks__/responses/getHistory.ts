import { ICommonOkResponse } from '@/utils/apisauce';
import { IChatMessagesResponse } from '@/store/actions/chat.actions';

export const messages: ICommonOkResponse<IChatMessagesResponse> = {
  response: {
    count: 418356,
    items: [
      {
        date: 1566842030,
        from_id: 1,
        id: 10,
        out: 0,
        peer_id: 1,
        text: '',
        conversation_message_id: 100,
        fwd_messages: [],
        important: false,
        random_id: 0,
        attachments: [],
        is_hidden: false,
      },
    ],
    conversations: [
      {
        peer: {
          id: 1,
          type: 'user',
          local_id: 1,
        },
        in_read: 10,
        out_read: 10,
        last_message_id: 10,
        can_write: {
          allowed: true,
        },
      },
    ],
    profiles: [
      {
        id: 1,
        first_name: 'Иванов',
        last_name: 'Иван',
        is_closed: false,
        can_access_closed: true,
        sex: 0,
        screen_name: 'ivanov',
        photo_50: 'https://picsum.photos/id/722/150/200',
        photo_100: 'https://picsum.photos/id/722/150/200',
        online: 1,
      },
    ],
    groups: [],
  },
};
