import { getStorage, FirebaseStorage } from "firebase/storage";
import { app } from "./client";

export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
