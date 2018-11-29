import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  getMatches = () =>
    this.db
      .collection('matches')
      .get()
      .then(querySnapshot => querySnapshot.docs.map(documentSnapshot => documentSnapshot.data()));
  // {
  // querySnapshot.forEach(doc => {
  //   console.log(doc);
  //   console.log(doc.data());
  // });
  // });
}

export default Firebase;
