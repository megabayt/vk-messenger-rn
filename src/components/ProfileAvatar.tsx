import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Thumbnail, View } from 'native-base';

interface IProps {
  uri: string;
}

export function ProfileAvatar({ uri, ...props }: IProps): React.ReactElement {
  const source = useMemo(() => ({
    uri,
  }), [uri]);
  return (
    <View {...props}>
      <LargeAvatar
        circular
        source={source}
      />
    </View>
  );
}

const LargeAvatar = styled(Thumbnail)`
  width: 48;
  height: 48;
`;
