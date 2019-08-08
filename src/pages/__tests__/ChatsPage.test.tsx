import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ChatsPageComponent } from '@/pages/ChatsPage';
import { IProps } from '@/pages/ChatsPage/ChatsPage';

describe('Chats page', () => {
  let wrapper: ShallowWrapper;
  let props: IProps;
  beforeEach(() => {
    props = {
      profiles: [],
      chats: [],
      chatsFetch: jest.fn(),
    };
  });
  describe('rendering', () => {
    it('it should render webview', () => {
      wrapper = shallow(<ChatsPageComponent {...props}/>);
      expect(wrapper).not.toBeNull();
      expect(wrapper.find('View')).toHaveLength(1);
    });
  });
});
