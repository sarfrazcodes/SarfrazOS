import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { app } from "./client";

let analytics: Analytics | null = null;

// Only initialize Analytics on the client-side to prevent SSR hydration errors
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported && app) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => console.error("Firebase Analytics failed to initialize", err));
}

export { analytics };
