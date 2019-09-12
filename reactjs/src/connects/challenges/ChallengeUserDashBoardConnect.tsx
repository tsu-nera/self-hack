import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchParticipant } from '~/actions/participantAction';
import { formatDate } from '~/lib/moment';

import firebase from '~/lib/firebase';
import { getCategoryId } from '~/lib/challenge';
import { getCategoryDashboardPath } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchParticipant,
      setOgpInfo,
      resetOgpInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;

  const { userShortId } = props.match.params;
  const resourceId = `/challenges/${challenge.id}/participants/${userShortId}`;

  const user = state.participant.target;
  const joinDate = user && formatDate(user.createdAt.toDate());

  const deleteHistoryHandler = (history: any) => () => {
    return firebase
      .firestore()
      .doc(resourceId)
      .update({
        histories: firebase.firestore.FieldValue.arrayRemove(history)
      });
  };

  const categoryId = getCategoryId(challenge.categoryRef);
  const categoryPath = getCategoryDashboardPath(categoryId, userShortId);

  return {
    user,
    loading: state.participant.loading,
    error: state.participant.error,
    deleteHistoryHandler,
    resourceId,
    joinDate,
    categoryPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);