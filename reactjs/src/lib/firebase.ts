import firebase from 'firebase/app';
import { configDev, configProd } from './config';

import 'firebase/auth';
import 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
  firebase.initializeApp(configDev);
} else {
  firebase.initializeApp(configProd);
}

export default firebase;
