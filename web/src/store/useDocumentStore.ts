import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DocumentsType } from '../types/types';
type DocumentStore = {
    documents: DocumentsType[] | [];
    setDocuments: (data: DocumentsType[]) => void;
    addNewDocument: (data: DocumentsType) => void;
    removeDocument: (data: DocumentsType) => void;
}
const useDocumentStore = create<DocumentStore>()(
    persist(
        (set, get) => ({
            documents: [],
            setDocuments: (data: DocumentsType[]) => set({ documents: data }),
            addNewDocument: (data: DocumentsType) => set({ documents: [...get().documents, data] }),
            removeDocument: (data: DocumentsType) => set({ documents: get().documents.filter((doc: DocumentsType) => doc._id !== data._id) }),
        }),
        {
            name: 'documents-data', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);
export default useDocumentStore;