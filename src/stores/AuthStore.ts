import {makeAutoObservable} from 'mobx';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {showToast} from '../utils/Helper';

class authStore {
  constructor() {
    makeAutoObservable(this);
  }
  isLoggedin = false;
  user: FirebaseAuthTypes.UserCredential =
    {} as FirebaseAuthTypes.UserCredential;

  resetFiels() {
    this.user = {} as FirebaseAuthTypes.UserCredential;
  }

  onSignIn = async (username: string, password: string) => {
    return await new Promise(async (resolve, reject) => {
      try {
        auth()
          .signInWithEmailAndPassword(username, password)
          .then(async r => {
            console.log(
              'User signed in anonymously',
              //   JSON.stringify(r, null, 3),
            );
            showToast('Successful sign-in');

            resolve('success');
            this.user = r;
          })
          .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }
            showToast(error.code);
            reject('error');
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  onSignUp = (username: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(r => {
        console.log('User signed in anonymously', r);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };
}
const AuthStore = new authStore();
export default AuthStore;
