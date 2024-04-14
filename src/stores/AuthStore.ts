import {action, makeAutoObservable} from 'mobx';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  getFromAsyncStorage,
  isEmpty,
  showToast,
  storeToAsyncStorage,
} from '../utils/Helper';
import {StorageConstants} from '../utils/StorageConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';

class authStore {
  constructor() {
    makeAutoObservable(this);
  }
  isLoggedin = false;
  user: FirebaseAuthTypes.UserCredential =
    {} as FirebaseAuthTypes.UserCredential;
  userCount: number = 0;

  selectedCountry: number[] = [];
  selectedDegree: string = '';
  DegreePercentage: Record<string, string> = {};
  selectedField: string = '';

  resetFiels() {
    this.user = {} as FirebaseAuthTypes.UserCredential;
    this.userCount = 0;
  }

  onSignIn = async (username: string, password: string) => {
    return await new Promise(async (resolve, reject) => {
      if (isEmpty(username) || isEmpty(password)) {
        showToast("username/password can't be empty");
        return true;
      }
      try {
        auth()
          .signInWithEmailAndPassword(username, password)
          .then(async r => {
            console.log(
              'User signed in anonymously',
              // JSON.stringify(r, null, 2),
            );
            showToast('Successful sign-in');
            await storeToAsyncStorage(StorageConstants.Username, username);
            await storeToAsyncStorage(StorageConstants.Password, password);
            this.user = r;
            // await this.saveUserInfoToFireStore(
            //   this.user.user.uid,
            //   12,
            //   'M',
            //   username,
            // );
            const isExist = await this.checkUserExistOrNot(this.user.user.uid);
            const isPrefExist = await this.checkUserPrefExistOrNot();

            console.log(isExist);
            if (!isEmpty(isExist) && !isEmpty(isPrefExist)) {
              resolve('success');
            } else if (isEmpty(isPrefExist)) {
              resolve('UserPref');
            } else {
              resolve('setup');
            }
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
            // showToast('Successful sign-in');
            await storeToAsyncStorage(StorageConstants.Username, username);
            await storeToAsyncStorage(StorageConstants.Password, password);

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

  checkForAuth = async () => {
    return await new Promise(async (resolve, reject) => {
      try {
        let username: string | null | undefined = null;
        let password: string | null | undefined = null;
        username = await getFromAsyncStorage(StorageConstants.Username);
        password = await getFromAsyncStorage(StorageConstants.Password);
        if (isEmpty(username) && isEmpty(password)) {
          resolve('Appinfo');
        } else {
          // Ensure username and password are not null or undefined
          if (username && password) {
            await this.onSignIn(username, password)
              .then(async r => {
                console.log(r);

                const isExist = await this.checkUserExistOrNot(
                  this.user.user.uid,
                );

                const isPrefExist = await this.checkUserPrefExistOrNot();
                console.log(isExist);
                if (!isEmpty(isExist) && !isEmpty(isPrefExist)) {
                  resolve('Home');
                } else if (isEmpty(isPrefExist)) {
                  resolve('UserPref');
                } else {
                  resolve('PersonalPref');
                }
              })
              .catch(r => {
                console.log(r);
                resolve('Appinfo');
              });
          } else {
            resolve('Appinfo');
          }
        }
      } catch (error) {
        console.log(error, 'checkForAuth');
        reject('error');
      }
    });
  };
  logout = async () => {
    try {
      auth()
        .signOut()
        .then(() => {
          AsyncStorage.clear();
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  saveUserInfoToFireStore = async (
    userId: string = this.user.user.uid ?? '',
    age: string = '0',
    gender: string = '',
    email: string = this.user?.user?.email ?? '',
    name: string,
    countryCode: string,
    number: string,
    eduLevel: string,
  ) => {
    await firestore()
      .collection('Users')
      .doc(userId)
      .set({
        id: userId,
        age,
        gender,
        email,
        name,
        countryCode,
        number,
        eduLevel,
      })
      .then(r => {
        console.log('User added!', r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  checkUserExistOrNot = async (uid: string = this.user.user.uid) => {
    try {
      const snapshot = await firestore()
        .collection('Users')
        .where('id', '==', uid)
        .get();
      if (snapshot.docs?.length > 0) {
        return snapshot.docs?.[0].data();
      }
      console.log(snapshot.docs, 'snapshot');

      return snapshot.docs;
    } catch (error) {
      console.log(error);
    }
  };

  checkUserPrefExistOrNot = async (uid: string = this.user.user.uid) => {
    try {
      const snapshot = await firestore()
        .collection('Users')
        .where('id', '==', uid)
        .get();
      if (snapshot.docs?.length > 0) {
        const data = snapshot.docs?.[0].data();
        return data.userPref;
      }
      console.log(snapshot.docs, 'snapshot');

      return snapshot.docs;
    } catch (error) {
      console.log(error);
    }
  };

  getTotalUsers = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(
        action(documentSnapshot => {
          this.userCount = documentSnapshot?.size;
        }),
      )
      .catch(
        action((e: any) => {
          console.log(e, 'ee');
          this.userCount = 0;
        }),
      );
  };
}
const AuthStore = new authStore();
export default AuthStore;
