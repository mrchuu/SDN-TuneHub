import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PerformRequest from "../utilities/PerformRequest.js";

const ReportDialog = ({ open, onClose, onSubmit }) => {
    const [selectedReason, setSelectedReason] = useState([]);
    const { OriginalRequest } = PerformRequest();
    const [questions, setQuestions] = useState([]);

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setSelectedReason(prev =>
            prev.includes(value) ? prev.filter(reason => reason !== value) : [...prev, value]);
    };

    const handleSubmit = () => {
        onSubmit(selectedReason);
        setSelectedReason([]); 
        onClose();
    };

    const fetchQuestions = async () => {
        try {
            const data = await OriginalRequest("reportquestion/getReportQuestion", "GET");
            setQuestions(data.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchQuestions();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "bg-light60 dark:bg-dark60 text-lightText dark:text-darkTextSecondary dark:border-2 border-dark30 "
            }}
        >
            <DialogTitle>Report Comment</DialogTitle>
            <DialogContent sx={{ height: '350px', width: '350px' }}>
                <RadioGroup value={selectedReason} onChange={handleReasonChange}>
                    {questions.map((question, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={selectedReason.includes(question.question)}
                                    onChange={handleReasonChange}
                                    value={question.question}
                                />
                            }
                            label={question.question}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Back</Button>
                {selectedReason.length > 0 && (
                    <Button onClick={handleSubmit}>Submit</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ReportDialog;
