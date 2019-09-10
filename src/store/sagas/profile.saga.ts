import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import {
  IApisauceService,
  ICommonErrorResponse,
  ICommonOkResponse,
  ICommonResponse,
} from '@/utils/apisauce';
import {
  ProfileActionTypes,
  myProfileSet,
  myProfileErrorSet,
  IProfileAction,
  IMyProfileResponse,
  IMyProfileParams,
} from '@/store/actions/profile.actions';

export const myProfileFetchSaga = (function* (api, action) {
  const result: ApiResponse<ICommonResponse<IMyProfileResponse>> =
    yield call(api.getUsers, action.payload as Partial<IMyProfileParams>);
  if (result.status === 200) {
    yield put(myProfileSet(result.data as ICommonOkResponse<IMyProfileResponse>));
  } else {
    yield put(myProfileErrorSet(result.data as ICommonErrorResponse<IMyProfileParams>));
  }
} as (api: IApisauceService, action: IProfileAction) => SagaIterator);

export const watchProfile = (function* (api) {
  yield takeLatest(ProfileActionTypes.MyProfileFetch, myProfileFetchSaga, api);
} as (api: IApisauceService) => SagaIterator);
