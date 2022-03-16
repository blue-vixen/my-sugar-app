import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/compat/firestore';
import { collection, addDoc, query, where } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAk8-ArbjhKS9H143b5g3RdwilNmT9iDwY",
    authDomain: "my-sugar-app.firebaseapp.com",
    projectId: "my-sugar-app",
    storageBucket: "my-sugar-app.appspot.com",
    messagingSenderId: "644195398032",
    appId: "1:644195398032:web:0d94d4c3b622e8583e0315"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const addRecord = async (recordToAdd) => {
    const docRef = await addDoc(collection(firestore, "records"), { ...recordToAdd })
    recordToAdd.id = docRef.id
    return { ...recordToAdd }
}

export const getRecords = async () => {
    const recordsRef = firestore.collection('records')
    const res =
        recordsRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot)
            console.log(collectionsMap)
            return collectionsMap
        })
}

export const convertCollectionSnapshotToMap = (collection) => {
    const transformedCollection = collection.docs.map(doc => {
        const { level, type, userId, measuredAt } = doc.data();
        return {
            id: doc.id,
            level: +level,
            type,
            userId,
            measuredAt
        }
    })
    return transformedCollection
}

export default firebase;




//Code for adding the local records as a batch:

// export const addRecordsBatch = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey);
//     const batch = firestore.batch();
//     objectsToAdd.forEach(obj => {
//         obj.userId = 'm9LX6uP8dKN9P4pKQnReNDeBAH43'
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj);
//     })
//     return await batch.commit()
// }

// addRecordsBatch('records', gDefaultRecords)

