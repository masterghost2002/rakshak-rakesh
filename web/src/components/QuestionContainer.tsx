import { Paper, Typography, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import {memo} from 'react';
type props = {
    questionNumber:number;
    questionId:string;
    question:string;
    options:string[];
    selectedOption:string;
    handleOptionChange:(questionId:string, selectedOption:number)=>void;
}
const QuestionContainer = ({questionId, questionNumber, question, options, selectedOption, handleOptionChange }:props) => {
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        handleOptionChange(questionId, parseInt(e.target.value));
    }
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6">Question {questionNumber}</Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>{question}</Typography>
      <RadioGroup value={selectedOption} onChange={handleOnChange} style={{ marginTop: '10px' }}>
        {options && options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={index.toString()}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </Paper>
  );
};

export default memo(QuestionContainer);
