import { useEffect, useState, memo } from "react";
import { createAxiosInstance } from "../util/api-handler";
type Props = {
    accessToken:string | undefined;
}
const Documents = ({accessToken}:Props)=>{
    const [documents, setDocuments] = useState([]);
    useEffect(()=>{
        const fetchDocuments = async ()=>{
            const api = createAxiosInstance(accessToken);
            try{
                const response = await api.get('/api/documents/user');
                console.log(response);
                setDocuments(response.data.data);
            }catch(err:any){
                throw new Error(err);
            }
        }
        fetchDocuments();
    }, [accessToken]);
    return (
        <div>

        </div>
    )
};
export default memo(Documents);