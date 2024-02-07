import { useEffect, memo } from "react";
import { createAxiosInstance } from "../util/api-handler";
import { Box } from "@mui/material";
import DocumentContainer from "./DocumentContainer";
import { DocumentsType } from "../types/types";
import useDocumentStore from "../store/useDocumentStore";
import { toast } from "react-hot-toast";
type Props = {
    accessToken: string | undefined;
}
const Documents = ({ accessToken }: Props) => {
    const documents = useDocumentStore((state) => state.documents);
    const setDocuments = useDocumentStore((state) => state.setDocuments);
    const removeDocument = useDocumentStore((state) => state.removeDocument);
    const deleteDocument = async (document: DocumentsType) => {
        const api = createAxiosInstance(accessToken);
        try {
            await api.delete(`/api/documents/delete/${document.publicId}/${document._id}`);
            removeDocument(document);
        } catch (err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
    const onDelete = async (document: DocumentsType) => {
        toast.promise(deleteDocument(document), {
            loading: 'Deleting document..',
            success: 'Document deleted successfully',
            error: 'Failed to delete document'
        });
    }
    useEffect(() => {
        const fetchDocuments = async () => {
            const api = createAxiosInstance(accessToken);
            try {
                const response = await api.get('/api/documents/user');
                console.log(response);
                setDocuments(response.data.data);
            } catch (err: any) {
                throw new Error(err);
            }
        }
        fetchDocuments();
    }, [accessToken]);

    return (
        <Box display="flex" flexWrap="wrap" gap={2} paddingBottom ={2}>
            {documents.map((document) => (
                <DocumentContainer
                    key={document._id}
                    document={document}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    )
};
export default memo(Documents);