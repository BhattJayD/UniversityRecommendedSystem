import {action, makeAutoObservable, runInAction} from 'mobx';

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
type prefType = {
  country_ids: string[];
  degree_type: string;
  field_of_study_id: string[];
  heighest_education_level_id: string;
  heighest_education_level_percentage: string;
  limit: number;
  offSet: number;
  page_uni: number;
  search_program_tag: boolean;
  university_type: string;
};
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
  extraExamDetails: Record<string, string> = {};

  storedPref: prefType = {
    country_ids: [], // Assuming empty array for default
    degree_type: '', // Assuming empty string for default
    field_of_study_id: [], // Assuming empty array for default
    heighest_education_level_id: '', // Assuming empty string for default
    heighest_education_level_percentage: '', // Assuming empty string for default
    limit: 0, // Assuming zero for default
    offSet: 0, // Assuming zero for default
    page_uni: 0, // Assuming zero for default
    search_program_tag: false, // Assuming false for default
    university_type: '', // Assuming empty string for default
  };

  colegeData = [];
  trendingCollegeData = [];

  failSafeData = [];

  resetFiels() {
    this.user = {} as FirebaseAuthTypes.UserCredential;
    this.userCount = 0;
  }

  resetPref = () => {
    this.selectedCountry = [];
    this.selectedDegree = '';
    this.DegreePercentage = {};
    this.selectedField = '';
    this.extraExamDetails = {};

    this.storedPref = {
      country_ids: [], // Assuming empty array for default
      degree_type: '', // Assuming empty string for default
      field_of_study_id: [], // Assuming empty array for default
      heighest_education_level_id: '', // Assuming empty string for default
      heighest_education_level_percentage: '', // Assuming empty string for default
      limit: 0, // Assuming zero for default
      offSet: 0, // Assuming zero for default
      page_uni: 0, // Assuming zero for default
      search_program_tag: false, // Assuming false for default
      university_type: '', // Assuming empty string for default
    };

    this.colegeData = [];
    this.trendingCollegeData = [];

    this.failSafeData = [];
  };

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
            } else if (isEmpty(isExist)) {
              resolve('setup');
            } else if (isEmpty(isPrefExist)) {
              resolve('UserPref');
            } else {
              resolve('Home');
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
            // await storeToAsyncStorage(StorageConstants.Username, username);
            // await storeToAsyncStorage(StorageConstants.Password, password);

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
                } else if (isEmpty(isExist)) {
                  resolve('PersonalPref');
                } else if (isEmpty(isPrefExist)) {
                  resolve('UserPref');
                } else {
                  resolve('Home');
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

  saveUserPrefToFireStore = async (
    userId: string = this.user.user.uid ?? '',
    userPref: any,
  ) => {
    const userData = await this.checkUserExistOrNot();
    // let a = userData;
    // @ts-ignore
    userData['userPref'] = userPref;

    await firestore()
      .collection('Users')
      .doc(userId)
      .set({...userData})
      .then(r => {
        console.log('User added!', r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  setFailSafe = async (data: any) => {
    // const userData = await this.checkUserExistOrNot();
    // let a = userData;
    // @ts-ignore

    await firestore()
      .collection('FailSafe')
      .doc('1')
      .set(data)
      .then(r => {
        console.log('data added!', r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  getFailSafeData = async () => {
    try {
      const snapshot = await firestore().collection('FailSafe').get();
      if (snapshot.docs?.length > 0) {
        runInAction(() => {
          this.failSafeData = snapshot.docs?.[0].data();
        });
        return snapshot.docs?.[0].data();
      }
      console.log('snapshot', snapshot.docs?.[0]);
      runInAction(() => {
        this.failSafeData = snapshot.docs;
      });
      return snapshot.docs;
    } catch (error) {
      console.log(error);
    }
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
      console.log('snapshot', snapshot.size, uid);

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

  removeUserPref = async (userId: string = this.user.user.uid ?? '') => {
    const userData = await this.checkUserExistOrNot();
    // let a = userData;
    // @ts-ignore
    delete userData['userPref'];

    await firestore()
      .collection('Users')
      .doc(userId)
      .set({...userData})
      .then(r => {
        console.log('User added!', r);
      })
      .catch(e => {
        console.log(e);
      });
  };
}
const AuthStore = new authStore();
export default AuthStore;
