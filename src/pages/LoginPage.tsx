import React, { useCallback, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native';
import { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { config } from '@/constants/api';
import { IStateUnion } from '@/store/reducers';
import { setToken } from '@/store/actions/auth.actions';

export interface IProps extends NavigationInjectedProps {
  token: string;
  dispatchSetToken: (token: string) => void;
}

export const LoginPageComponent = ({
  token,
  dispatchSetToken,
  navigation,
}: IProps): React.ReactElement => {
  useEffect(() => {
    if (token !== '') {
      navigation.navigate('MainSwitch');
    }
  }, [token, navigation]);

  const loadStartHandler = useCallback((event: WebViewNavigationEvent) => {
    const { url } = event.nativeEvent;
    if (url.indexOf('#') !== -1) {
      const afterHash = url.split('#')[1];
      const regexpMatch = afterHash.match(/access_token=(.*?)&/);
      if (regexpMatch && regexpMatch[1]) {
        const newToken = regexpMatch[1];
        dispatchSetToken(newToken);
      }
    }
  }, [dispatchSetToken]);
  return (
    <StyledSafeAreaView>
      {!token && (
        <StyledWebView
          source={webViewSrc}
          onLoadStart={loadStartHandler}
        />
      )}
    </StyledSafeAreaView>
  );
};
export const LoginPageContainer = connect(
  (state: IStateUnion) => ({
    token: state.auth.token,
  }),
  {
    dispatchSetToken: setToken,
  }
)(withNavigation(LoginPageComponent));

const webViewSrc = { uri: config.OAUTH_URL };

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
StyledSafeAreaView.displayName = 'styled(SafeAreaView)';

const StyledWebView = styled(WebView)`
  flex: 1;
`;
StyledWebView.displayName = 'styled(WebView)';
