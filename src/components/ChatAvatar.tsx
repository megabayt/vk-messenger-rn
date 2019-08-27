import React, { useMemo } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import styled from 'styled-components';
import { Thumbnail } from 'native-base';
import { ProfileAvatar } from '@/components/ProfileAvatar';

interface IProps {
  avatars: Array<string>;
}

export function ChatAvatar({ avatars, ...props }: IProps): React.ReactElement {
  const rows = useMemo(() => [
    [avatars[0], avatars[1]],
    [avatars[2], avatars[3]],
  ], [avatars]);

  if (!avatars[0]) {
    return (
      <ProfileAvatar {...props} uri="https://vk.com/images/deactivated_50.png"/>
    );
  }

  return (
    <Grid {...props}>
      {rows.map((row, i) => (
        <Row key={i}>
          {row.map(uri => uri && (
            <AvatarCol key={uri}>
              <SmallAvatar
                circular
                source={{ uri }}
              />
            </AvatarCol>
          ))}
        </Row>
      ))}
    </Grid>
  );
}

const SmallAvatar = styled(Thumbnail)`
  width: 20;
  height: 20;
`;
const AvatarCol = styled(Col)`
  margin-horizontal: 2;
  margin-vertical: 2;
`;
