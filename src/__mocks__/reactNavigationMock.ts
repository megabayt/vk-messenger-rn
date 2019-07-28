import { NavigationInjectedProps } from 'react-navigation';

export const reactNavigationMock: NavigationInjectedProps = {
  navigation: {
    state: {
      index: 0,
      isTransitioning: false,
      key: '',
      params: {},
      path: '',
      routeName: '',
      routes: [],
    },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    isFirstRouteInParent: () => false,
    reset: jest.fn(),
  },
};
