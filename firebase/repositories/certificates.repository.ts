import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Certificate } from "@/types/cms";

const COLLECTION = "certificates";

export const CertificatesRepository = {
  getAll: (options?: QueryOptions) => getCollection<Certificate>(COLLECTION, options),
  getById: (id: string) => getDocument<Certificate>(COLLECTION, id),
  create: (data: Partial<Certificate>, customId?: string) => createDocument<Certificate>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Certificate>) => updateDocument<Certificate>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Certificate[]) => void, options?: QueryOptions) => subscribeCollection<Certificate>(COLLECTION, options || {}, onUpdate),
};
