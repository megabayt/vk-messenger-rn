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
  let props: IProps;
  describe('avatars', () => {
    it('should render avatar if single conversation', () => {
      props = {
        chat: getConversationsCombiner(conversations)[0],
        profiles: getChatProfilesCombiner(conversations),
      };
      wrapper = shallow(<ChatItemComponent {...props}/>);
      const listItem = wrapper.findWhere(node => node.prop('testID') === 'list-item');
      wrapper = shallow(listItem.prop('media'));
      const el = wrapper.findWhere(node => node.prop('testID') === 'avatar');
      expect(el).toHaveLength(1);
    });
    it('should render as many avatars as there are chat users, but no more than 4', () => {
      props = {
        chat: getConversationsCombiner(conversations)[1],
        profiles: getChatProfilesCombiner(conversations),
      };
      const activeIds: ReadonlyArray<number> =
        path(['chat', 'conversation', 'chat_settings', 'active_ids'], props) || [];
      wrapper = shallow(<ChatItemComponent {...props}/>);
      const listItem = wrapper.findWhere(node => node.prop('testID') === 'list-item');
      wrapper = shallow(listItem.prop('media'));
      const el = wrapper.findWhere(node => node.prop('testID') === 'avatar');
      expect(el)
        .toHaveLength(activeIds.length > 4 ? 4 : activeIds.length);
    });
  });
  describe('other fields', () => {
    beforeAll(() => {
      props = {
        chat: getConversationsCombiner(conversations)[0],
        profiles: getChatProfilesCombiner(conversations),
      };
      wrapper = shallow(<ChatItemComponent {...props}/>);
    });
    it('should render list item', () => {
      const el = wrapper.findWhere(node => node.prop('testID') === 'list-item');
      expect(el).toHaveLength(1);
      expect(el.prop('text')).toBe('Иван Иванов');
      expect(el.prop('secondaryText')).toBe('Lorem ipsum dolor sit amet.');
    });
    it('should render badge with unread', () => {
      const listItem = wrapper.findWhere(node => node.prop('testID') === 'list-item');
      wrapper = shallow(listItem.prop('actionItem'));
      const el = wrapper.findWhere(node => node.prop('testID') === 'unread');
      expect(el).toHaveLength(1);
      expect(el.prop('content')).toBe(1);
    });
  });
});
