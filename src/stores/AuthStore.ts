import {makeAutoObservable} from 'mobx';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {isEmpty, showToast} from '../utils/Helper';

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
            console.log('User signed in anonymously');
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
        reject('error');
      }
    });
  };

  onSignUp = async (username: string, password: string) => {
    if (isEmpty(username) || isEmpty(password)) {
      showToast("username/password can't be empty");
      return true;
    }
    return await new Promise(async (resolve, reject) => {
      try {
        auth()
          .createUserWithEmailAndPassword(username, password)
          .then(async r => {
            console.log('User signed in anonymously');
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
        reject('error');
      }
    });
  };
}
const AuthStore = new authStore();
export default AuthStore;
