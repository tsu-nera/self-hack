import { connect } from 'react-redux';
import { isLoaded, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const mapStateToProps = (state: any, props: any) => {
  const users = state.firestore.ordered.players;
  const profiles = state.firestore.ordered.profiles;
  const myId = state.firebase.profile.shortId;

  const marged =
    isLoaded(users) && isLoaded(profiles)
      ? users
          .filter((user: any) => !user.freezed)
          .map((user: any) => {
            const profile = profiles.filter(
              (profile: any) => profile.id === user.shortId
            );

            const totalScore =
              profile && profile.length === 1
                ? (profile as any[])[0].totalScore
                : 0;

            return {
              ...user,
              totalScore
            };
          })
      : [];

  return {
    users: marged,
    myId
  };
};

const queries = (props: any) => {
  return [
    {
      collection: 'users',
      storeAs: 'players'
    },
    {
      collection: 'profiles'
    }
  ];
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
