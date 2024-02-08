import { useLocation } from "react-router-dom";
const ResultPage = ()=>{
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Result Page</h1>
        </div>
    )
};
export default ResultPage;