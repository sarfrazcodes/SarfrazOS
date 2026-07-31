import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Education } from "@/types/cms";

const COLLECTION = "education";

export const EducationRepository = {
  getAll: (options?: QueryOptions) => getCollection<Education>(COLLECTION, options),
  getById: (id: string) => getDocument<Education>(COLLECTION, id),
  create: (data: Partial<Education>, customId?: string) => createDocument<Education>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Education>) => updateDocument<Education>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Education[]) => void, options?: QueryOptions) => subscribeCollection<Education>(COLLECTION, options || {}, onUpdate),
};
