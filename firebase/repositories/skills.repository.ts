import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Skill } from "@/types/cms";

const COLLECTION = "skills";

export const SkillsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Skill>(COLLECTION, options),
  getById: (id: string) => getDocument<Skill>(COLLECTION, id),
  create: (data: Partial<Skill>, customId?: string) => createDocument<Skill>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Skill>) => updateDocument<Skill>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Skill[]) => void, options?: QueryOptions) => subscribeCollection<Skill>(COLLECTION, options || {}, onUpdate),
};
