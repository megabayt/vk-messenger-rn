import React from 'react';
import { path } from 'ramda';
import { shallow, ShallowWrapper } from 'enzyme';
import { IProps, ChatItemComponent } from '@/components/ChatItem';
import { conversations } from '@/__mocks__/responses/getConversations';
import {
  getChatProfilesCombiner,
  getConversationsCombiner,
} from '@/store/selectors/chat.selectors';

describe('ChatItem component', () => {
  let wrapper: ShallowWrapper;
  let props: IProps = {
    chatItem: getConversationsCombiner(conversations)[0],
    chatProfiles: getChatProfilesCombiner(conversations),
  };
  describe('avatars', () => {
    it('should render avatar if single conversation', () => {
      wrapper = shallow(<ChatItemComponent {...props}/>);
      expect(wrapper.find('Image')).toHaveLength(1);
    });
    it('should render as many avatars as there are chat users, but no more than 4', () => {
      props = {
        chatItem: getConversationsCombiner(conversations)[1],
        chatProfiles: getChatProfilesCombiner(conversations),
      };
      const activeIds: ReadonlyArray<number> =
        path(['chatItem', 'conversation', 'chat_settings', 'active_ids'], props) || [];
      wrapper = shallow(<ChatItemComponent {...props}/>);
      expect(wrapper.find('Image'))
        .toHaveLength(activeIds.length > 4 ? 4 : activeIds.length);
    });
  });
  describe('other fields', () => {
    beforeAll(() => {
      wrapper = shallow(<ChatItemComponent {...props}/>);
    });
    it('should render fullname', () => {
      const el = wrapper.findWhere(node => node.prop('testID') === 'fullname');
      expect(el).toHaveLength(1);
      expect(el.children().text()).toBe('asd');
    });
    it('should render last message text and date', () => {
      const el = wrapper.findWhere(node => node.prop('testID') === 'date');
      expect(el).toHaveLength(1);
      expect(el.children().text()).toBe('11.11.2000');
    });
    it('should render badge with unread ', () => {
      const el = wrapper.findWhere(node => node.prop('testID') === 'unread');
      expect(el).toHaveLength(1);
      expect(el.children().text()).toBe('1');
    });
  });
});
