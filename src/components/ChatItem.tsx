import React, { useCallback, useMemo } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Avatar, Badge, ListItem } from 'material-bread';
import { Image, Text, View } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';

import styled from 'styled-components';
import { IChatItem, IChatMergedProfiles, IChatProfile } from '@/store/actions/chat.actions';
import { IStateUnion } from '@/store/reducers';
import { getChatProfilesSelector } from '@/store/selectors/chat.selectors';
import { ITestProps } from '@/utils/tests';
import { dateFormatter, getAttachmentReplacer } from '@/utils/helpers';

export interface IProps extends ITestProps {
  chat: IChatItem;
  profiles: IChatMergedProfiles;
}

export const ChatItemComponent: React.FC<IProps> = ({
  profiles,
  chat,
}: IProps): React.ReactElement => {
  const avatars = useMemo(() => {
    const activeIds: ReadonlyArray<number> =
      path(['conversation', 'chat_settings', 'active_ids'], chat) || [];
    if (activeIds.length) {
      return activeIds.map(activeId => path([activeId, 'photo_50'], profiles) as string);
    }
    return [];
  }, [chat, profiles]);
  const lastMessage = useMemo(() => {
    return {
      date: dateFormatter(Number(path(['last_message', 'date'], chat))) as string,
      text: (path(['last_message', 'text'], chat)
        || getAttachmentReplacer(chat)) as string,
    };
  }, [chat]);
  const unreadCount = useMemo(() => {
    return (path(['conversation', 'unread_count'], chat) || 0) as number;
  }, [chat]);
  const peerId = useMemo(() => {
    return (path(['conversation', 'peer', 'id'], chat) || -1) as number;
  }, [chat]);
  const profile = useMemo(() => {
    return (path([peerId], profiles) || {}) as IChatProfile;
  }, [peerId, profiles]);
  const fullName = useMemo(() => {
    const name = path(['name'], profile);
    if (name) {
      return name as string;
    }
    const firstName = path(['first_name'], profile);
    const lastName = path(['last_name'], profile);
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    const title = path(['conversation', 'chat_settings', 'title'], chat);
    if (title) {
      return title as string;
    }
    return 'Неизвестно';
  }, [profile, chat]);
  const avatar = useMemo(() => {
    return path(['photo_50'], profile) as string;
  }, [profile]);

  const renderAvatar = useCallback(() => {
    if (avatar) {
      return (
        <Aside>
          <Avatar
            testID="avatar"
            type="image"
            size={48}
            image={<Image source={{ uri: avatar }} />}
          />
        </Aside>
      );
    }
    const rows = [
      [avatars[0], avatars[1]],
      [avatars[2], avatars[3]],
    ];
    return (
      <Aside>
        {
          rows.map((row, i) => (
            <Row key={i}>
              {row.map(uri => uri && (
                <AvatarCol key={uri}>
                  <Avatar
                    testID="avatar"
                    type="image"
                    size={20}
                    image={<Image source={{ uri }} />}
                  />
                </AvatarCol>
              ))}
            </Row>
          ))}
      </Aside>
    );
  }, [avatar, avatars]);

  const renderRight = useCallback(() => {
    return (
      <Aside>
        {unreadCount ? (
          <Row>
            <Col>
              <AlignerEnd>
                <Badge
                  testID="unread"
                  size={20}
                  content={unreadCount}
                  maxValue={99}
                />
              </AlignerEnd>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            <AlignerEnd>
              <Text>{lastMessage.date}</Text>
            </AlignerEnd>
          </Col>
        </Row>
      </Aside>
    );
  }, [unreadCount, lastMessage]);

  return (
    <ListItem
      testID="list-item"
      text={fullName}
      secondaryText={lastMessage.text}
      media={renderAvatar()}
      actionItem={renderRight()}
    />
  );
};

export const ChatItemContainer = connect(
  (state: IStateUnion) => ({
    profiles: getChatProfilesSelector(state),
  }),
  {},
)(ChatItemComponent);

const Aside = styled(Grid)`
  flex: 0;
  flex-shrink: 0;
  flex-basis: 48;
  width: 48;
`;
const AvatarCol = styled(Col)`
  margin-horizontal: 2;
  margin-vertical: 2;
`;
const AlignerEnd = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
`;
