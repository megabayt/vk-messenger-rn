import { path } from 'ramda';
import { IStateUnion } from '@/store/reducers';
import { IMyProfile } from '@/store/actions/profile.actions';

export const getMyProfileSelector = (state: IStateUnion): IMyProfile | null =>
  path(['profile', 'myProfile', 'data', 'response', 0], state) || null;
