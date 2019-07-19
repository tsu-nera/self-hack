import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import ogpReducer from './ogpReducer';
import challengeReducer from './challengeReducer';

const rootReducer = (history: any) =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    ogp: ogpReducer,
    router: connectRouter(history),
    challenge: challengeReducer
  });

export default rootReducer;
