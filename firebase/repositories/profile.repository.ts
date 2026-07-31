import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Profile } from "@/types/cms";

const COLLECTION = "profile";

export const ProfileRepository = {
  getAll: (options?: QueryOptions) => getCollection<Profile>(COLLECTION, options),
  getById: (id: string) => getDocument<Profile>(COLLECTION, id),
  create: (data: Partial<Profile>, customId?: string) => createDocument<Profile>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Profile>) => updateDocument<Profile>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Profile[]) => void, options?: QueryOptions) => subscribeCollection<Profile>(COLLECTION, options || {}, onUpdate),
};
