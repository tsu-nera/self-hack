import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR
} from '../constants/actionTypes';

export const fetchTopicsRequest = () => ({
  type: FETCH_TOPICS_REQUEST
});

export const fetchTopicsSuccess = (payload: any) => ({
  type: FETCH_TOPICS_SUCCESS,
  payload
});

export const fetchTopicsError = (error: any) => ({
  type: FETCH_TOPICS_ERROR,
  error: error
});

export const fetchTopics = (num: number = 1000, resourceId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchTopicsRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .orderBy('updatedAt', 'desc')
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchTopicsSuccess(data)))
      .catch((error: any) => dispatch(fetchTopicsError(error)));
  };
};
