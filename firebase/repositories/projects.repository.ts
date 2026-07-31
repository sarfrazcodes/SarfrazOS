import { getCollection, getDocument, createDocument, updateDocument, deleteDocument, subscribeCollection, QueryOptions } from "../repository";
import { Project } from "@/types/cms";

const COLLECTION = "projects";

export const ProjectsRepository = {
  getAll: (options?: QueryOptions) => getCollection<Project>(COLLECTION, options),
  getById: (id: string) => getDocument<Project>(COLLECTION, id),
  create: (data: Partial<Project>, customId?: string) => createDocument<Project>(COLLECTION, data, customId),
  update: (id: string, data: Partial<Project>) => updateDocument<Project>(COLLECTION, id, data),
  delete: (id: string) => deleteDocument(COLLECTION, id),
  subscribe: (onUpdate: (data: Project[]) => void, options?: QueryOptions) => subscribeCollection<Project>(COLLECTION, options || {}, onUpdate),
};
