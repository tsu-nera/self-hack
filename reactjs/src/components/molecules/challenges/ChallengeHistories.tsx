import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { firestore } from 'firebase';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

const formatDate = (date: string): string => {
  return moment(date).format('YYYY年MM月DD日 HH:mm');
};

interface Props {
  timestamp: firestore.Timestamp;
}

const History = (props: Props) => {
  const { timestamp } = props;

  return (
    <ListItem button>
      <ListItemText primary={formatDate(timestamp.toDate().toISOString())} />
    </ListItem>
  );
};

const ChallengeHistories = (props: any) => {
  const { histories } = props;

  return (
    <React.Fragment>
      <Typography component="h3" variant="h5" color="inherit">
        過去の記録
      </Typography>
      <List>
        {histories
          .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
          .map((history: any) => {
            return <History key={history.id} timestamp={history.timestamp} />;
          })}
      </List>
    </React.Fragment>
  );
};

export default ChallengeHistories;