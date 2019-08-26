import { connect } from 'react-redux';
import shortId from 'shortid';
import firebase, { uploadPhotoURLAsync } from '~/lib/firebase';
import { getStreamToken } from '~/lib/getstream';

const mapStateToProps = (state: any, props: any) => {
  const signInSuccessWithAuthResult = (
    credentials: firebase.auth.UserCredential
  ) => {
    const { user } = credentials;

    const isTwitter =
      credentials.additionalUserInfo &&
      credentials.additionalUserInfo.providerId === 'twitter.com';

    const userShortId = shortId.generate();

    const data = {
      id: user!.uid,
      shortId: userShortId,
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      twitterUsername: isTwitter
        ? (credentials.additionalUserInfo! as any).username
        : ''
    };

    const streamTokenPromise = getStreamToken(userShortId);

    const dataSecure = {
      id: userShortId,
      email: user!.email,
      accessTokenKey: isTwitter
        ? (credentials.credential! as any).accessToken
        : '',
      accessTokenSecret: isTwitter
        ? (credentials.credential! as any).secret
        : ''
    };

    const userRef = firebase
      .firestore()
      .collection('users')
      // uidにしないと、reduxのprofileとfirestoreのusersが同期しない。
      .doc(user!.uid);

    userRef.get().then(doc => {
      if (!doc.exists) {
        userRef.set(data);
        userRef
          .collection('securities')
          .doc(userShortId)
          .set(dataSecure)
          .then(() => {
            if (data.photoURL && data.photoURL !== '') {
              uploadPhotoURLAsync(
                data.photoURL,
                data.shortId,
                `/users/${data.id}`
              );
            }
          });
      }
    });

    // TODO ばぐってる。 shortIdを二重に生成

    return streamTokenPromise.then((token: any) =>
      userRef
        .collection('securities')
        .doc(userShortId)
        .set({ getStreamToken: token as string }, { merge: true })
    );
  };

  return {
    signInSuccessWithAuthResult,
    ...props
  };
};

export default connect(mapStateToProps);
