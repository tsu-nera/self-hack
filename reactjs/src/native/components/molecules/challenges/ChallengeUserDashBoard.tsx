import React, { useEffect } from 'react';

import { H1, Text, H2 } from 'native-base';

import TwitterButton from '../../atoms/TwitterButton';
import Progress from '~/native/components/atoms/CircularProgress';
import ChallengeHistories from '~/native/components/molecules/challenges/ChallengeHistories';
import ChallengeGrass from './ChallengeGrass';
import ChallengeChart from './ChallengeChart';
import ChallengeStatistics from './ChallengeStatistics';
import ChallengeRecord from './ChallengePostRecord';

import { formatDays } from '~/lib/challenge';

const Space = () => <Text />;

const ChallengeUserDashBoard = (props: any) => {
  const {
    challenge,
    joinDate,
    user,
    error,
    loading,
    fetchUser,
    resourceId
  } = props;

  useEffect(() => {
    fetchUser(resourceId);
  }, [fetchUser, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && user && (
        <React.Fragment>
          <H1 style={{ textAlign: 'center' }}>{user.displayName}さんの記録</H1>
          <Space />
          <ChallengeRecord
            days={formatDays(
              user.showMode === '過去連続日数' ? user.pastDays : user.accDays
            )}
          />
          <Space />
          <ChallengeStatistics
            data={user}
            openedAt={challenge.openedAt}
            closedAt={challenge.closedAt}
          />
          <Space />
          <ChallengeChart histories={user.histories} />
          <Space />
          <ChallengeGrass
            histories={user.histories}
            openedAt={challenge.openedAt}
            closedAt={challenge.closedAt}
          />
          <Space />
          <H2 style={{ textAlign: 'center' }}>参加日: {joinDate}</H2>
          <Space />
          <ChallengeHistories histories={user.histories} />
          <Space />
          <TwitterButton challenge={challenge} userShortId={user.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;