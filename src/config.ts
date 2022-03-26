let process: any;

const p = process?.env ? process.env : import.meta.env;

export const dgraph_config = p.VITE_DGRAPH_ENDPOINT;
export const firebaseConfig = {
  apiKey: p.VITE_FIREBASE_APIKEY,
  authDomain: p.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: p.VITE_FIREBASE_PROJECT_ID,
  storageBucket: p.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: p.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: p.VITE_FIREBASE_APP_ID,
};
