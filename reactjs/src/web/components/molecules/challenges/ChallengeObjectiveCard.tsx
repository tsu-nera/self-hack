import * as React from 'react';
import styled from 'styled-components';
import Card, { CardProps } from '@material-ui/core/Card';
import {
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import UserAvatar from '../../atoms/UserAvatar';

const StyledText = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
  font-size: 24px;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  padding: 30px 25px 15px 15px;
` as React.ComponentType<CardProps>;

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 480px;
  }
  width: 320px;
`;

export const ChallengeObjectiveWhatCard = (props: any) => {
  const { text } = props;
  return (
    <Wrapper>
      <StyledCard>
        <CardContent>
          <StyledText>{text}</StyledText>
        </CardContent>
      </StyledCard>
    </Wrapper>
  );
};

export const ChallengeObjectiveWhyCard = (props: any) => {
  const { text } = props;

  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar />
        </ListItemAvatar>
        <ListItemText
          primary="なぜやるのか?"
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};
