import { pipe, keys, reduce, path } from 'ramda';
import moment from 'moment';
import { IChatGroup, IChatItem, IChatProfile, IMessageItem } from '@/store/actions/chat.actions';
import { RecursivePartial } from '@/interfaces';

export interface IObjectWithStringValues {
  [key: string]: string | number | undefined;
}

export function serialize(object: IObjectWithStringValues): string {
  const serializeReduce = reduce(
    (result: string, key: keyof IObjectWithStringValues): string => {
      return `${result}&${key}=${encodeURIComponent(object[key] || '')}`;
    }
    ,
    '' as string,
  );

  return pipe(keys, serializeReduce)(object);
}

export function dateFormatter(date: number): string {
  if (moment().diff(moment.unix(date), 'days') > 0) {
    if (moment().diff(moment.unix(date), 'year') > 0) {
      return moment.unix(date).format('DD MMM YYYY');
    }
    return moment.unix(date).format('DD MMM');
  }
  return moment.unix(date).format('HH:mm');
}

export function getAttachmentReplacer(item: RecursivePartial<IChatItem>): string {
  const attachmentType = path(['last_message', 'attachments', '0', 'type'], item);
  switch (attachmentType) {
    case 'wall': return 'Запись со стены';
    case 'sticker': return 'Стикер';
    case 'photo': return 'Фото';
    case 'doc': return 'Документ';
    case 'gift': return 'Подарок';
    default: {
      const fwdMessage = path(['last_message', 'fwd_messages', '0'], item)
        && 'Пересланные сообщения';
      if (fwdMessage) {
        return 'Пересланные сообщения';
      }
      return 'Вложение';
    }
  }
}

export function getFullName(
  profile: IChatProfile | IChatGroup,
  chat: IChatItem | IMessageItem,
): string {
  const name = path(['name'], profile);
  if (name) {
    return name as string;
  }
  const firstName = path(['first_name'], profile);
  const lastName = path(['last_name'], profile);
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  const title = path(['conversation', 'chat_settings', 'title'], chat);
  if (title) {
    return title as string;
  }
  return 'Неизвестно';
}
