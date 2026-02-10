// RewardService.ts
// Simple points system for check-ins, journaling, activities
// Points can be spent on avatar food, clothes, decorations, houses

import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export type Reward = {
  userId: string;
  points: number;
  spent: string[];
};

const REWARD_COLLECTION = 'rewards';

export async function earnPoints(userId: string, amount: number) {
  // For demo, add points (no economy balancing)
  const rewardRef = doc(db, REWARD_COLLECTION, userId);
  await updateDoc(rewardRef, { points: amount });
}

export async function spendPoints(userId: string, item: string) {
  const rewardRef = doc(db, REWARD_COLLECTION, userId);
  await updateDoc(rewardRef, { spent: item });
}

export async function getPoints(userId: string) {
  const rewardRef = doc(db, REWARD_COLLECTION, userId);
  const snapshot = await getDocs(collection(db, REWARD_COLLECTION));
  const reward = snapshot.docs.find(doc => doc.id === userId)?.data();
  return reward?.points || 0;
}
