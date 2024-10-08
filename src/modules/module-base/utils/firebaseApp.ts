/**
 *
 * @author dongntd267@gmail.com on 01/12/2022.
 *
 */

/** libs */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBYZKhAWUgxDLqNZFMONEBCc05-7YQVt6Q',
    authDomain: 'imeeting-f3337.firebaseapp.com',
    databaseURL: 'https://imeeting-f3337-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'imeeting-f3337',
    storageBucket: 'imeeting-f3337.appspot.com',
    messagingSenderId: '907116964832',
    appId: '1:907116964832:web:932baede6c041e24e3d985',
    measurementId: 'G-YTD0GEHL7R',
} as const;

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const authentication = getAuth(firebaseApp);
