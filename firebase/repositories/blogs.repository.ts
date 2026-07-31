import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Blog } from "@/types/cms";

const COLLECTION = "blogs";

export const BlogsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Blog>(COLLECTION, options),
  getById: (id: string) => getDocument<Blog>(COLLECTION, id),
  create: (data: Partial<Blog>, customId?: string) => createDocument<Blog>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Blog>) => updateDocument<Blog>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Blog[]) => void, options?: QueryOptions) => subscribeCollection<Blog>(COLLECTION, options || {}, onUpdate),
};
