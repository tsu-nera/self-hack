import * as React from 'react';
import DashBoardPaper from 'web/components/molecules/DashBoardPaper';
import Progress from 'web/components/atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    pinned,
    loading,
    error,
    fetchChallenges,
    fetchCategories,
    fetchPinnedChallenges
  } = props;

  React.useEffect(() => {
    fetchChallenges(4);
    fetchCategories(4);
    fetchPinnedChallenges();
  }, [fetchCategories, fetchChallenges, fetchPinnedChallenges]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {pinned && (
        <DashBoardPaper
          title="運営からのおすすめ"
          items={pinned}
          type="challenge"
        />
      )}
      {categories && (
        <DashBoardPaper
          title="人気のカテゴリ"
          items={categories}
          type="category"
        />
      )}
      {challenges && (
        <DashBoardPaper
          title="人気のチャレンジ"
          items={challenges}
          type="challenge"
        />
      )}
      <DiscordWidget />
    </React.Fragment>
  );
};

export default DashBoard;