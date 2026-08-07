import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.length > 0,
);

let app: FirebaseApp | null = null;
export let firestore: Firestore | null = null;

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed, falling back to localStorage.', error);
    firestore = null;
  }
} else {
  console.info(
    'Firebase env vars not set — RSVP and guestbook will use localStorage fallback.',
  );
}

export const RSVP_COLLECTION = 'rsvps';
export const GUESTBOOK_COLLECTION = 'guestbook';
