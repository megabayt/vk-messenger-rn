import React from 'react';
import { identity as noop } from 'ramda';
import { shallow } from 'enzyme';
import { reactNavigationMock } from '@/__mocks__/reactNavigationMock';

import { LoginPageComponent } from '@/pages/LoginPage';

test('it should render correctly', () => {
  const wrapper = shallow(
    <LoginPageComponent
      token=""
      dispatchSetToken={noop}
      navigation={reactNavigationMock.navigation}
    />
  );

  expect(wrapper).not.toBeNull();
});
