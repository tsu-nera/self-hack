import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';

export const fetchRequest = (type: string) => () => ({ type });
export const fetchSuccess = (type: string) => (payload: any) => ({
  type,
  payload
});
export const fetchError = (type: string) => (error: any) => ({ type, error });

export const fetchTarget = (
  resourceId: string,
  requestAction: any,
  successAction: any,
  errorAction: any
) => (dispatch: Dispatch) => {
  dispatch(requestAction());
  firebase
    .firestore()
    .doc(resourceId)
    .get()
    .then((doc: any) => doc.data())
    .then((data: any) => dispatch(successAction(data)))
    .catch((error: any) => dispatch(errorAction(error)));
};
