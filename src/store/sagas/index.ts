import { SagaIterator } from 'redux-saga';
import { IApisauceService } from '@/utils/apisauce';

export function* sagaInit(api: IApisauceService): SagaIterator {
  return api;
}
