import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { reactNavigationMock } from '@/__mocks__/reactNavigationMock';
import { LoginPageComponent, IProps } from '@/pages/LoginPage';

describe('Login page', () => {
  let wrapper: ShallowWrapper;
  let props: IProps;
  beforeEach(() => {
    props = {
      token: '',
      dispatchSetToken: jest.fn(),
      navigation: reactNavigationMock.navigation,
    };
  });
  describe('rendering', () => {
    it('it should render webview', () => {
      wrapper = shallow(<LoginPageComponent {...props}/>);
      expect(wrapper).not.toBeNull();
      expect(wrapper.find('styled(WebView)')).toHaveLength(1);
    });
    it('it should not render webview if token exists', () => {
      wrapper = shallow(<LoginPageComponent {...props} token="token" />);
      expect(wrapper).not.toBeNull();
      expect(wrapper.find('styled(WebView)')).toHaveLength(0);
    });
  });
  describe('interaction', () => {
    it('should dispatch new token on load start', () => {
      wrapper = shallow(<LoginPageComponent {...props} />);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (wrapper.find('styled(WebView)').prop('onLoadStart') as any)({
        nativeEvent: {
          url: 'https://oauth.vk.com/blank.html#access_token=' +
            'lnjxvnkqbtdlcfskekallrqdrlgxthnoauczducquwhizkva' +
            'zibxplvkencwlnpimocpetkhbmxajtieofnup' +
            '&expires_in=0&user_id=0',
        },
      });
      expect(props.dispatchSetToken).toHaveBeenCalledTimes(1);
      // TODO: Find way to test
      // expect(props.navigation.navigate).toHaveBeenCalledTimes(1); in shallow
      // https://github.com/airbnb/enzyme/issues/2086
    });
  });
});
