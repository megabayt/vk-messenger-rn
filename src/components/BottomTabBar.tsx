import React, { useCallback } from 'react';
import { Button, Footer, FooterTab, Text } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';

export function BottomTabBar({
  navigation,
}: NavigationInjectedProps) {
  const { index } = navigation.state;

  const goToChats = useCallback(() => {
    navigation.navigate('Chats');
  }, [navigation]);
  const goToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Footer>
      <FooterTab>
        <Button
          active={index === 0}
          onPress={goToChats}
        >
          <Text>Chats</Text>
        </Button>
        <Button
          active={index === 1}
          onPress={goToProfile}
        >
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
