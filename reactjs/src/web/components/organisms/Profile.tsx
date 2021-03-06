import React, { useEffect } from 'react';

import Paper from '../templates/PaperWrapper';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ProfileHeader from '../molecules/profiles/ProfileHeader';
import ProfileBody from '~/web/containers/ProfileBodyContainer';

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isMyProfile,
    isLogin,
    myUserId,
    fetchBlockingUsers,
    blocked
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchUserWithShortId, myUserId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading &&
        user &&
        (user.freezed ? (
          <Paper>
            <Title text="凍結しました" />
            <p>このユーザは不適切なユーザと判断して運営が凍結しました。</p>
          </Paper>
        ) : blocked ? (
          <Paper>
            <Title text="表示をブロックしました" />
            <p>
              あなたはこのユーザからブロックされているため、プロフィールを閲覧できません。
            </p>
          </Paper>
        ) : (
          <React.Fragment>
            <ProfileHeader
              user={user}
              isLogin={isLogin}
              isMyProfile={isMyProfile}
            />
            <ProfileBody userShortId={userShortId} />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Profile;
