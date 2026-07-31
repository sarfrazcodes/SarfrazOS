import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Creator } from "@/types/cms";

const COLLECTION = "creator";

export const CreatorRepository = {
  getAll: (options?: QueryOptions) => getCollection<Creator>(COLLECTION, options),
  getById: (id: string) => getDocument<Creator>(COLLECTION, id),
  create: (data: Partial<Creator>, customId?: string) => createDocument<Creator>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Creator>) => updateDocument<Creator>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Creator[]) => void, options?: QueryOptions) => subscribeCollection<Creator>(COLLECTION, options || {}, onUpdate),
};
