// Anonymous authentication service for Firebase
// Provides a function to sign in anonymously and listen for auth state changes

import { auth } from './firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

export const signInAnon = async (): Promise<User | null> => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    return null;
  }
};

export const listenAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
