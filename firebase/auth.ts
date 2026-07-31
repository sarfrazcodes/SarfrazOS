import { getAuth, Auth } from "firebase/auth";
import { app } from "./client";

export const auth: Auth | null = app ? getAuth(app) : null;
