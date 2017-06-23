import * as firebase from 'firebase';
import global from '../secrets';

const firebaseConfig = {
  apiKey: global.apiKey,
  authDomain: global.authDomain,
  databaseURL: global.databaseURL,
  storageBucket: global.storageBucket
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;