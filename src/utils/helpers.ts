import { pipe, keys, reduce } from 'ramda';

export interface IObjectWithStringValues {
  [key: string]: string | number;
}

export function serialize(object: IObjectWithStringValues): string {
  const serializeReduce = reduce(
    (result: string, key: keyof IObjectWithStringValues): string => {
      return `${result}&${key}=${encodeURIComponent(object[key])}`;
    }
    ,
    '' as string,
  );

  return pipe(keys, serializeReduce)(object);
}
