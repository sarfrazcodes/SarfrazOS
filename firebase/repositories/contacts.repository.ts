import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Contact } from "@/types/cms";

const COLLECTION = "contacts";

export const ContactsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Contact>(COLLECTION, options),
  getById: (id: string) => getDocument<Contact>(COLLECTION, id),
  create: (data: Partial<Contact>, customId?: string) => createDocument<Contact>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Contact>) => updateDocument<Contact>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Contact[]) => void, options?: QueryOptions) => subscribeCollection<Contact>(COLLECTION, options || {}, onUpdate),
};
