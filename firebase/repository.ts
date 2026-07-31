import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  QueryConstraint,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firestore";
import { PaginatedResult } from "@/types/cms";

const requireDb = () => {
  if (!db) throw new Error("Firestore is not initialized");
  return db;
};

import { 
  orderBy,
  limit,
  startAfter,
  where
} from "firebase/firestore";

export interface QueryOptions {
  constraints?: QueryConstraint[];
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  limitCount?: number;
  startAfterDoc?: DocumentData;
  filterField?: string;
  filterValue?: any;
  filterOperator?: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
}

/**
 * Generic function to fetch a collection with advanced query options.
 */
export async function getCollection<T>(
  collectionName: string, 
  options: QueryOptions = {}
): Promise<{ data: T[], lastDoc: DocumentData | null }> {
  try {
    let qConstraints: QueryConstraint[] = options.constraints ? [...options.constraints] : [];
    
    // Apply basic filter
    if (options.filterField && options.filterValue !== undefined && options.filterOperator) {
      qConstraints.push(where(options.filterField, options.filterOperator, options.filterValue));
    }
    
    // Apply sorting
    if (options.sortField) {
      qConstraints.push(orderBy(options.sortField, options.sortDirection || 'desc'));
    }
    
    // Apply pagination start
    if (options.startAfterDoc) {
      qConstraints.push(startAfter(options.startAfterDoc));
    }
    
    // Apply limit
    if (options.limitCount) {
      qConstraints.push(limit(options.limitCount));
    }

    const q = query(collection(requireDb(), collectionName), ...qConstraints);
    const querySnapshot = await getDocs(q);
    
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    const lastDoc = querySnapshot.docs.length > 0 
      ? querySnapshot.docs[querySnapshot.docs.length - 1] 
      : null;

    return { data, lastDoc };
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Subscribes to a collection for real-time updates.
 */
export function subscribeCollection<T>(
  collectionName: string, 
  options: QueryOptions = {},
  onUpdate: (data: T[]) => void,
  onError?: (error: Error) => void
): () => void {
  let qConstraints: QueryConstraint[] = options.constraints ? [...options.constraints] : [];
  
  if (options.filterField && options.filterValue !== undefined && options.filterOperator) {
    qConstraints.push(where(options.filterField, options.filterOperator, options.filterValue));
  }
  
  if (options.sortField) {
    qConstraints.push(orderBy(options.sortField, options.sortDirection || 'desc'));
  }
  
  if (options.limitCount) {
    qConstraints.push(limit(options.limitCount));
  }

  const q = query(collection(requireDb(), collectionName), ...qConstraints);
  
  return onSnapshot(
    q, 
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
      onUpdate(data);
    },
    (error) => {
      console.error(`Error subscribing to collection ${collectionName}:`, error);
      if (onError) onError(error);
    }
  );
}

/**
 * Fetches a single document by ID.
 */
export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  try {
    const docRef = doc(requireDb(), collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document ${collectionName}/${id}:`, error);
    throw error;
  }
}

/**
 * Creates a new document with an auto-generated ID or a specified ID.
 * Automatically adds createdAt and updatedAt timestamps.
 */
export async function createDocument<T>(
  collectionName: string, 
  data: Partial<T>, 
  customId?: string
): Promise<string> {
  try {
    const docRef = customId ? doc(requireDb(), collectionName, customId) : doc(collection(requireDb(), collectionName));
    
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(docRef, payload);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Updates an existing document.
 * Automatically updates the updatedAt timestamp.
 */
export async function updateDocument<T>(
  collectionName: string, 
  id: string, 
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(requireDb(), collectionName, id);
    
    const payload = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, payload);
  } catch (error) {
    console.error(`Error updating document ${collectionName}/${id}:`, error);
    throw error;
  }
}

/**
 * Deletes a document by ID.
 */
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    const docRef = doc(requireDb(), collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${collectionName}/${id}:`, error);
    throw error;
  }
}
