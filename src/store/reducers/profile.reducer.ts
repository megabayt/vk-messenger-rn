import { Reducer } from 'redux';
import { compose, lensPath, set } from 'ramda';
import {
  IProfileAction,
  IMyProfileResponse,
  ProfileActionTypes,
} from '../actions/profile.actions';
import {
  ICommonErrorResponse,
  ICommonOkResponse,
} from '@/utils/apisauce';

export interface IProfileState {
  readonly myProfile: {
    readonly fetching: boolean;
    readonly error: ICommonErrorResponse<{}> | null;
    readonly data: ICommonOkResponse<IMyProfileResponse> | null;
  };
}
export const initialProfileState: IProfileState = {
  myProfile: {
    fetching: false,
    error: null,
    data: null,
  },
};

export const profileReducer = ((state = initialProfileState, action) => {
  switch (action.type) {
    case ProfileActionTypes.MyProfileFetch:
      return compose(
        set(lensStateMyProfileFetching, true) as (obj: IProfileState) => IProfileState,
        set(lensStateMyProfileError, null) as (obj: IProfileState) => IProfileState,
      )(state);
    case ProfileActionTypes.MyProfileSet:
      return compose(
        set(lensStateMyProfileFetching, false) as (obj: IProfileState) => IProfileState,
        set(lensStateMyProfileData, action.payload) as (obj: IProfileState) => IProfileState,
      )(state);
    case ProfileActionTypes.MyProfileErrorSet:
      return compose(
        set(lensStateMyProfileFetching, false) as (obj: IProfileState) => IProfileState,
        set(lensStateMyProfileError, action.payload) as (obj: IProfileState) => IProfileState,
      )(state);
  }
  return state;
}) as Reducer<IProfileState, IProfileAction>;

const lensStateMyProfileFetching = lensPath(['myProfile', 'fetching']);
const lensStateMyProfileError = lensPath(['myProfile', 'error']);
const lensStateMyProfileData = lensPath(['myProfile', 'data']);
