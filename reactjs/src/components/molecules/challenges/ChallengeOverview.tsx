import * as React from 'react';
import MarkdownView from '../../atoms/MarkdownView';
import Youtube from '../../atoms/YoutubeWidget';
import ChallengeSchedule from '../../atoms/challenges/ChallengeSchedule';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId, openedAt, closedAt } = props;

  return (
    <React.Fragment>
      {youtubeId && <Youtube id={youtubeId} />}
      <MarkdownView text={text} />
      <ChallengeSchedule openedAt={openedAt} closedAt={closedAt} />
    </React.Fragment>
  );
};

export default ChallengeOverview;