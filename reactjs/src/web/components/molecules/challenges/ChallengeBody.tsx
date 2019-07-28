import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChallengeUserDashBoard from '~/web/containers/ChallengeUserDashBoardContainer';
import ChallengeTopics from './ChallengeTopics';
import ChallengeTimeline from './ChallengeTimeline';
import Topic from '~/web/containers/TopicContainer';

import ChallengeLeaderBoard from '~/web/containers/ChallengeLeaderBoardContainer';
import TopicForm from '~/web/containers/TopicFormContainer';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeOverview from './ChallengeOverview';
import ChallengeUserSettings from '~/web/containers/ChallengeUserSettingsContainer';

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <Switch>
      <Route
        path="/c/:id/overview"
        render={() => (
          <ChallengeOverview
            text={challenge.overview}
            youtubeId={challenge.youtubeId}
            openedAt={challenge.openedAt.toDate()}
            closedAt={challenge.closedAt.toDate()}
          />
        )}
      />
      <Route
        path="/c/:id/timeline"
        render={() => <ChallengeTimeline channelId={challenge.channelId} />}
      />
      <Route
        path="/c/:collectionId/t/:topicId/edit"
        render={props => <TopicForm collection="challenges" {...props} />}
      />
      <Route
        path="/c/:collectionId/t/new"
        render={props => <TopicForm collection="challenges" {...props} />}
      />
      <Route
        path="/c/:collectionId/t/:topicId"
        render={props => <Topic collection="challenges" {...props} />}
      />
      <Route path="/c/:id/topics" component={ChallengeTopics} />
      <Route
        path="/c/:id/rules"
        render={() => <MarkdownView text={challenge.rules} />}
      />
      <Route
        path="/c/:id/leaderboard"
        render={props => (
          <ChallengeLeaderBoard challengeId={challenge.id} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId/settings"
        render={props => (
          <ChallengeUserSettings challengeId={challenge.id} {...props} />
        )}
      />
      <Route
        path="/c/:id/u/:userShortId"
        render={(props: any) => (
          <ChallengeUserDashBoard challenge={challenge} {...props} />
        )}
      />
    </Switch>
  );
};

export default ChallengeBody;