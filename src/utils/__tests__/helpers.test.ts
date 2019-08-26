import moment from 'moment';
import { lensPath, set } from 'ramda';

import { dateFormatter, getAttachmentReplacer, serialize } from '../helpers';
import { RecursivePartial } from '@/interfaces';
import { IChatItem } from '@/store/actions/chat.actions';

test('serialize', () => {
  expect(serialize({ a: 1, b: 2 })).toBe('&a=1&b=2');
});

test('dateFormatter', () => {
  let date = moment();

  expect(dateFormatter(date.unix())).toBe(date.format('HH:mm'));

  date = moment().subtract(2, 'd');

  expect(dateFormatter(date.unix())).toBe(date.format('DD MMM'));

  date = moment().subtract(2, 'y');

  expect(dateFormatter(date.unix())).toBe(date.format('DD MMM YYYY'));
});

test('getAttachmentReplacer', () => {
  let item: RecursivePartial<IChatItem> = {
    last_message: {
      attachments: [{
        type: 'wall',
      }],
    },
  };
  expect(getAttachmentReplacer(item)).toBe('Запись со стены');
  item = set(lensPath(['last_message', 'attachments', 0, 'type']), 'sticker', item);
  expect(getAttachmentReplacer(item)).toBe('Стикер');
  item = set(lensPath(['last_message', 'attachments', 0, 'type']), 'photo', item);
  expect(getAttachmentReplacer(item)).toBe('Фото');
  item = set(lensPath(['last_message', 'attachments', 0, 'type']), 'doc', item);
  expect(getAttachmentReplacer(item)).toBe('Документ');
  item = set(lensPath(['last_message', 'attachments', 0, 'type']), 'wtf', item);
  expect(getAttachmentReplacer(item)).toBe('Вложение');
  item = set(lensPath(['last_message', 'attachments']), [], item);
  item = set(lensPath(['last_message', 'fwd_messages', 0]), {}, item);
  expect(getAttachmentReplacer(item)).toBe('Пересланные сообщения');
});
