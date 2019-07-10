import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import { connect } from 'react-redux';

import firebase from '../../lib/firebase';
import Progress from '../atoms/CircularProgress';

import NoStyledLink from '../atoms/NoStyledLink';

const TopicList = (props: any) => {
  const { collection, collectionId, user, limit } = props;

  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection(collection)
      .doc(collectionId)
      .collection('topics')
      .orderBy('updatedAt', 'desc')
      .limit(limit || 1000)
  );

  const collectionShort = collection === 'challenges' ? 'c' : 'cat';

  return (
    <List>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value &&
        value!.docs
          .map((doc: any) => doc.data())
          .map((topic: any) => (
            <ListItem alignItems="flex-start" key={topic.id}>
              <ListItemAvatar>
                <Avatar
                  alt={topic.userName || 'anonymous'}
                  src={
                    topic.userPhotoURL ||
                    `${process.env.PUBLIC_URL}/anonymous.png`
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <NoStyledLink
                    to={`/${collectionShort}/${collectionId}/t/${topic.id}`}
                  >
                    {topic.title}
                  </NoStyledLink>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Posted by {topic.userName || 'anonymous'}
                    </Typography>
                    {'     '}
                    {moment(topic.createdAt.toDate()).fromNow() || ''}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
    </List>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(TopicList);
