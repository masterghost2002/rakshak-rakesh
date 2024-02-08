import { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import { createAxiosInstance } from "../util/api-handler";
import { ResultType, CategoryWisePerformanceType } from "../types/types";
const convertDate = (date: Date) => {
    const _date = new Date(date);
    const day = _date.getDate();
    const month = _date.toLocaleString('default', { month: 'long' }); // Get full month name
    const year = _date.getFullYear();

    // Construct the string in the format "day month year"
    const dateString = `${day} ${month} ${year}`;
    return dateString;
}
const LicencePage = () => {
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);
    const accessToken = user?.accessToken;
    const userId = user?._id;

    const [results, setResults] = useState<ResultType[]>([]);

    const latestLicence = results.filter((result) => result.overall === 'PASS')[0];

    useEffect(() => {
        const fetchLicence = async () => {
            const api = createAxiosInstance(accessToken);
            try {
                const response = await api.get(`api/assessement/results/${userId}`);
                setResults(response.data.data);
            } catch (err) {
                console.log(err);
                throw new Error('Failed to fetch Licence');
            }
        };
        toast.promise(fetchLicence(), {
            loading: 'Fetching...',
            success: 'Licence Fetched!',
            error: 'Failed to fetch Licence'
        });
    }, [accessToken]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box
                margin='20px'
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography variant="h4">
                        Licence
                    </Typography>
                    <Button variant="contained" sx={{fontSize:'12px'}} onClick={()=>navigate('/guidelines')}>
                        Take Assessment
                    </Button>
                </Box>
                {
                    latestLicence &&
                    <Box>
                        <Typography fontSize='16px'>
                            Download you latest licence
                        </Typography>
                        <Button variant="contained">
                            Download Licence
                        </Button>
                    </Box>
                }
                {
                    !latestLicence &&
                    <Box>
                        <Typography fontSize='16px'>
                            You don't have any licence yet, please take an assessment to get your licence
                        </Typography>
                    </Box>
                }
            </Box>
            <Typography variant="h6" style={{ margin: '20px' }}>

                Previous Assessment Results

            </Typography>
            {results.map((item) => (
                <Box
                    key={item._id}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    width="100%"
                    padding="20px"
                    boxShadow="0 0 10px 0 rgba(0,0,0,0.1)"
                    gap={1}
                    marginBottom="20px"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >

                        <Typography variant="h6" color={item.overall === 'PASS' ? 'green' : 'red'}>Overall: {item.overall}</Typography>
                        <Typography>Total Questions: {item.totalQuestions}</Typography>
                        <Typography>Correct Questions: {item.correct}</Typography>
                        <Typography>Remarks: {item.remarks}</Typography>
                        <Typography>Exam Date: {convertDate(item.createdAt)}</Typography>
                        {
                            item.overall === 'PASS' && <Typography>Valid till: {convertDate(item.validTill)}</Typography>
                        }
                    </Box>

                    <Box
                    >
                        <Typography fontSize='18px' fontWeight='bold'>Category wise performance</Typography>
                        {
                            item.categoryWisePerformance.map((category: CategoryWisePerformanceType) => (

                                <Box
                                    key={category._id}
                                    display="flex"
                                    flexDirection="column"
                                    gap={1}
                                >
                                    <Typography fontSize='16px'>Category: {category.category}</Typography>
                                    <Typography fontSize={'12px'}>Total Questions: {category.totalQuestions}</Typography>
                                    <Typography fontSize={'12px'}>Correct Questions: {category.correct}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            ))}
        </div>
    )
};
export default LicencePage;