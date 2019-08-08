import camelcaseKeys from 'camelcase-keys';

/* eslint-disable @typescript-eslint/camelcase */
export const conversations: any = camelcaseKeys({
  response: {
    count: 307,
    items: [
      {
        conversation: {
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
        last_message: {
          date: 1565255931,
          from_id: 1,
          id: 10,
          out: 0,
          peer_id: 1,
          text: 'Lorem ipsum dolor sit amet.',
          conversation_message_id: 11,
          fwd_messages: [],
          important: false,
          random_id: 0,
          attachments: [],
          is_hidden: false,
        },
      },
      {
        conversation: {
          peer: {
            id: 1000,
            type: 'chat',
            local_id: 121,
          },
          in_read: 1001,
          out_read: 1001,
          last_message_id: 1001,
          can_write: {
            allowed: false,
            reason: 917,
          },
          chat_settings: {
            owner_id: 2,
            title: 'Гугл музыка',
            state: 'kicked',
            acl: {
              can_change_info: false,
              can_change_invite_link: false,
              can_change_pin: false,
              can_invite: false,
              can_promote_users: false,
              can_see_invite_link: false,
              can_moderate: false,
            },
            active_ids: [1, 2],
          },
        },
        last_message: {
          date: 1556648334,
          from_id: 2,
          id: 1001,
          out: 0,
          peer_id: 1000,
          text: '',
          conversation_message_id: 49,
          action: {
            type: 'chat_kick_user',
            member_id: 1,
          },
          fwd_messages: [],
          important: false,
          random_id: 0,
          attachments: [],
          is_hidden: false,
        },
      },
    ],
    profiles: [
      {
        id: 1,
        first_name: 'Иван',
        last_name: 'Иванов',
        is_closed: false,
        can_access_closed: true,
        sex: 2,
        screen_name: 'ivan',
        photo_50: 'https://unsplash.it/500/500?random',
        photo_100: 'https://unsplash.it/500/500?random',
        online: 1,
      },
      {
        id: 2,
        first_name: 'Ивана',
        last_name: 'Иванова',
        is_closed: false,
        can_access_closed: true,
        sex: 1,
        screen_name: 'ivana',
        photo_50: 'https://unsplash.it/500/500?random',
        photo_100: 'https://unsplash.it/500/500?random',
        online: 1,
      },
    ],
    groups: [
      {
        id: 1,
        name: 'Тестовая компания',
        screen_name: 'testo',
        is_closed: 0,
        type: 'page',
        is_admin: 0,
        is_member: 0,
        is_advertiser: 0,
        photo_50: 'https://unsplash.it/500/500?random',
        photo_100: 'https://unsplash.it/500/500?random',
        photo_200: 'https://unsplash.it/500/500?random1',
      },
    ],
  },
}, { deep: true });
