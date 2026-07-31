import { getFirestore, Firestore } from "firebase/firestore";
import { app } from "./client";

export const db: Firestore | null = app ? getFirestore(app) : null;
