import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Achievement } from "@/types/cms";

const COLLECTION = "achievements";

export const AchievementsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Achievement>(COLLECTION, options),
  getById: (id: string) => getDocument<Achievement>(COLLECTION, id),
  create: (data: Partial<Achievement>, customId?: string) => createDocument<Achievement>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Achievement>) => updateDocument<Achievement>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Achievement[]) => void, options?: QueryOptions) => subscribeCollection<Achievement>(COLLECTION, options || {}, onUpdate),
};
