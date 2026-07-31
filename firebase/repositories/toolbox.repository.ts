import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Toolbox } from "@/types/cms";

const COLLECTION = "toolbox";

export const ToolboxRepository = {
  getAll: (options?: QueryOptions) => getCollection<Toolbox>(COLLECTION, options),
  getById: (id: string) => getDocument<Toolbox>(COLLECTION, id),
  create: (data: Partial<Toolbox>, customId?: string) => createDocument<Toolbox>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Toolbox>) => updateDocument<Toolbox>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Toolbox[]) => void, options?: QueryOptions) => subscribeCollection<Toolbox>(COLLECTION, options || {}, onUpdate),
};
