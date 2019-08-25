import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ChatsPageComponent } from '@/pages/ChatsPage';
import { IProps } from '@/pages/ChatsPage/ChatsPage';
import {
  getConversationsCombiner,
} from '@/store/selectors/chat.selectors';
import { conversations } from '@/__mocks__/responses/getConversations';

describe('Chats page', () => {
  let wrapper: ShallowWrapper;
  const chats = getConversationsCombiner(conversations);
  const props: IProps = {
    fetching: false,
    error: false,
    chats,
    chatsFetch: jest.fn(),
  };
  describe('rendering', () => {
    it('it should render loading', () => {
      wrapper = shallow(<ChatsPageComponent {...props} fetching />);
      const el = wrapper.findWhere(node => node.prop('testID') === 'fetching');
      expect(wrapper).not.toBeNull();
      expect(el).toHaveLength(1);
    });
    it('it should render error', () => {
      wrapper = shallow(<ChatsPageComponent {...props} error />);
      const el = wrapper.findWhere(node => node.prop('testID') === 'error');
      expect(wrapper).not.toBeNull();
      expect(el).toHaveLength(1);
    });
    // TODO: Should be tested via mount
    // it('it should render list of chats', () => {
    //   wrapper = shallow(<ChatsPageComponent {...props}/>);
    //   const el = wrapper.findWhere(node => node.prop('testID') === 'item');
    //   expect(wrapper).not.toBeNull();
    //   expect(el).toHaveLength(chats.length);
    // });
  });
});
