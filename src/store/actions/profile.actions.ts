import { Action } from 'redux';
import {
  ICommonErrorResponse,
  ICommonOkResponse,
  ICommonResponse,
} from '@/utils/apisauce';

export enum ProfileActionTypes {
  MyProfileFetch = 'MY_PROFILE_FETCH',
  MyProfileErrorSet = 'MY_PROFILE_ERROR_SET',
  MyProfileSet = 'MY_PROFILE_SET',
}

export const myProfileFetch = (params: Partial<IMyProfileParams>): IProfileAction =>
  ({
    type: ProfileActionTypes.MyProfileFetch,
    payload: params,
  });

export const myProfileSet = (data: ICommonOkResponse<IMyProfileResponse>): IProfileAction =>
  ({
    type: ProfileActionTypes.MyProfileSet,
    payload: data,
  });

export const myProfileErrorSet = (data: ICommonErrorResponse<IMyProfileParams>): IProfileAction =>
  ({
    type: ProfileActionTypes.MyProfileErrorSet,
    payload: data,
  });

export interface IProfileAction extends Action<ProfileActionTypes> {
  payload?: Partial<IMyProfileParams>
  | ICommonResponse<IMyProfileResponse, IMyProfileParams>;
}


export type IMyProfileParams = {
  fields: string;
  name_case?: 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'abl';
}

export interface IMyProfileResponse {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
  sex: number;
  nickname: string;
  domain: string;
  screen_name: string;
  bdate: string;
  city: ICity;
  country: ICity;
  timezone: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  photo_max: string;
  photo_200_orig: string;
  photo_400_orig: string;
  photo_max_orig: string;
  photo_id: string;
  has_photo: number;
  has_mobile: number;
  is_friend: number;
  friend_status: number;
  online: number;
  online_app: number;
  online_mobile: number;
  can_post: number;
  can_see_all_posts: number;
  can_see_audio: number;
  can_write_private_message: number;
  can_send_friend_request: number;
  mobile_phone: string;
  home_phone: string;
  skype: string;
  site: string;
  status: string;
  last_seen: ILastseen;
  crop_photo: ICropphoto;
  verified: number;
  can_be_invited_group: boolean;
  followers_count: number;
  blacklisted: number;
  blacklisted_by_me: number;
  is_favorite: number;
  is_hidden_from_feed: number;
  common_count: number;
  occupation: IOccupation;
  career: ReadonlyArray<ICareer>;
  // TODO: Избавиться от any
  // @ts-ignore
  military: ReadonlyArray<any>;
  university: number;
  university_name: string;
  faculty: number;
  faculty_name: string;
  graduation: number;
  education_form: string;
  education_status: string;
  home_town: string;
  relation: number;
  relation_partner: IRelationPartner;
  personal: IPersonal;
  interests: string;
  music: string;
  activities: string;
  movies: string;
  tv: string;
  books: string;
  games: string;
  universities: ReadonlyArray<IUniversity>;
  schools: ReadonlyArray<ISchool>;
  about: string;
  relatives: ReadonlyArray<IRelative>;
  quotes: string;
}

interface IRelative {
  id: number;
  type: string;
}

interface ISchool {
  id: string;
  country: number;
  city: number;
  name: string;
  year_from: number;
  year_to: number;
  year_graduated: number;
  class: string;
}

interface IUniversity {
  id: number;
  country: number;
  city: number;
  name: string;
  faculty: number;
  faculty_name: string;
  chair: number;
  chair_name: string;
  graduation: number;
  education_form: string;
  education_status: string;
}

interface IPersonal {
  langs: ReadonlyArray<string>;
  people_main: number;
  life_main: number;
  smoking: number;
  alcohol: number;
  religion_id: number;
}

interface ICareer {
  group_id?: number;
  country_id: number;
  city_id: number;
  from: number;
  until?: number;
  position: string;
  company?: string;
}

interface IOccupation {
  type: string;
  id: number;
  name: string;
}

interface ICropphoto {
  photo: IPhoto;
  crop: ICrop;
  rect: ICrop;
}

interface ICrop {
  x: number;
  y: number;
  x2: number;
  y2: number;
}

interface IPhoto {
  id: number;
  album_id: number;
  owner_id: number;
  sizes: ReadonlyArray<ISize>;
  text: string;
  date: number;
  lat: number;
  long: number;
  post_id: number;
}

interface ISize {
  type: string;
  url: string;
  width: number;
  height: number;
}

interface ILastseen {
  time: number;
  platform: number;
}

interface IRelationPartner {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
}

interface ICity {
  id: number;
  title: string;
}
