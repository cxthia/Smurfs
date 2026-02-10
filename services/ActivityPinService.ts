// ActivityPinService.ts
// Service to handle activity pins in Firestore
// Provides functions to create, join, and fetch pins

import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export type ActivityPin = {
  title: string;
  time: string;
  location: { latitude: number; longitude: number };
  visibility: 'public' | 'friends' | 'solo';
  emotion: string;
  joined: string[];
  createdAt: Date;
};

/**
 * Creates a new activity pin in Firestore.
 * @param pin Activity pin data (without joined/createdAt)
 */
export async function createPin(pin: Omit<ActivityPin, 'joined' | 'createdAt'>) {
  const newPin = {
    ...pin,
    joined: [],
    createdAt: new Date(),
  };
  return await addDoc(collection(db, 'activityPins'), newPin);
}

/**
 * Adds a user to the joined list for an activity pin.
 * @param pinId Firestore document ID for the pin
 * @param userId User ID to join
 */
export async function joinPin(pinId: string, userId: string) {
  const pinRef = doc(db, 'activityPins', pinId);
  // For demo, just push userId to joined array
  await updateDoc(pinRef, {
    joined: userId,
  });
}

/**
 * Fetches all activity pins from Firestore.
 */
export async function fetchPins(): Promise<(ActivityPin & { id: string })[]> {
  const snapshot = await getDocs(collection(db, 'activityPins'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
