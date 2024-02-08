import { useLocation, useNavigate } from 'react-router-dom';
import {Typography, Button, Box} from '@mui/material';
import { useEffect } from 'react';
const ResultPage = () => {
    
    const location = useLocation();
    const result = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        if (!result) 
            navigate('/');
    }, [result]);
    


    const renderCategoryPerformance = () => {
      return result.categoryWisePerformance.map((category:any) => (
        <div key={category._id}>
          <Typography variant="body1">
            Category: {category.category}
          </Typography>
          <Typography variant="body2">
            Total: {category.totalQuestions}
          </Typography>
          <Typography variant="body2">
            Correct: {category.correct}
          </Typography>
        </div>
      ));
    };

  return (
    <Box  p={4} mb={2}>
      <Box mb={4}>
        <Typography variant="h5" style={{ color: result.overall === 'PASS' ? '#5cb85c' : '#d9534f' }}>
          {result.overall}
        </Typography>
      </Box>
      <Typography variant="body1">
        Total Questions: {result.totalQuestions}
      </Typography>
      <Typography variant="body1">
        Correct Questions: {20}
      </Typography>
      <Typography variant="h6" mt={3}>
        Category Performance:
      </Typography>
      {renderCategoryPerformance()}
      <Typography variant="body1" mt={3}>
        Overall: {result.overall}
      </Typography>
      <Typography variant="body1">
        Is Terminated: {result.isTerminated ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="body1">
        Remarks: {result.remarks}
      </Typography>
      {result.overal === 'PASS' && <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '16px' }}
        onClick={() => {
          // Handle PDF download logic here
          alert('Downloading PDF...');
        }}
      >
        Download as PDF
      </Button>}
    </Box>
  );
};

export default ResultPage;
