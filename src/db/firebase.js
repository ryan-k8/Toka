const firebaseConfig = {
  apiKey: "AIzaSyBEDhLbbSTYntaqYf35JG1ZQkD-nlDvQeE",
  authDomain: "toka-98638.firebaseapp.com",
  projectId: "toka-98638",
  storageBucket: "toka-98638.appspot.com",
  messagingSenderId: "539810226124",
  appId: "1:539810226124:web:b51a3342b32c36cac18769",
};

class FirebaseHelper {
  static app = firebase.initializeApp(firebaseConfig);

  static db = firebase.firestore(this.app);

  static provider = new firebase.auth.GoogleAuthProvider();

  static authSignIn() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then((res) => {
          const user = res.user;
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
  static authSignOut() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve("FirebaseAuth : Logged out successfully "))
        .catch((err) => reject(err));
    });
  }

  static getUserList(userEmail) {
    return new Promise((resolve, reject) => {
      const docRef = this.db.collection("users").doc(userEmail);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve({
              exists: true,
              ...doc.data(),
            });
          } else {
            resolve({
              exists: false,
              list: [],
            });
          }
        })
        .catch((err) => reject(`Firestore Error : ${err}`));
    });
  }

  static setUserList(userEmail, data) {
    return new Promise((resolve, reject) => {
      const userRef = this.db.collection("users").doc(userEmail);

      userRef
        .set(data)
        .then(() => resolve("done!"))
        .catch((err) => reject(err));
    });
  }
}

export default FirebaseHelper;
