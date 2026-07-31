import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Settings } from "@/types/cms";

const COLLECTION = "settings";

export const SettingsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Settings>(COLLECTION, options),
  getById: (id: string) => getDocument<Settings>(COLLECTION, id),
  create: (data: Partial<Settings>, customId?: string) => createDocument<Settings>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Settings>) => updateDocument<Settings>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Settings[]) => void, options?: QueryOptions) => subscribeCollection<Settings>(COLLECTION, options || {}, onUpdate),
};
