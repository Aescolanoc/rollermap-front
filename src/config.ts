let process: any;

const p = process?.env ? process.env : import.meta.env;

export const firebaseConfig = {
  apiKey: p.VITE_FIREBASE_APIKEY,
  authDomain: p.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: p.VITE_FIREBASE_PROJECT_ID,
  storageBucket: p.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: p.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: p.VITE_FIREBASE_APP_ID,
};

export const mapBoxConfig = {
  token: p.VITE_MAPBOX_TOKEN,
};

export const guestUser = {
  user: p.VITE_TEST_USER,
  password: p.VITE_TEST_USER_PASS,
  id: p.VITE_TEST_USER_ID,
};
