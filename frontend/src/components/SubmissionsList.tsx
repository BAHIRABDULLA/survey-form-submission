import {
    Box, Button, Modal, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from '@mui/material'
import React, { useState } from 'react'
import { ISurvey } from '../interfaces/ISurvey';


interface SubmissionsListProps {
    surveys: ISurvey[]
}


const SubmissionsList: React.FC<SubmissionsListProps> = ({ surveys }) => {


    const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (survey: ISurvey) => {
        setSelectedSurvey(survey);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSurvey(null);
    };
    
    return (
        <>
            <TableContainer component={Paper} className="w-full max-w-4xl mx-auto shadow-lg overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-300">
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Nationality</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {surveys.map((survey) => (
                            <TableRow key={survey._id} className="bg-white">
                                <TableCell>{survey.name}</TableCell>
                                <TableCell>{survey.email}</TableCell>
                                <TableCell>{survey.phoneNumber}</TableCell>
                                <TableCell>{survey.nationality}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(survey)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Modal open={open} onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Center modal
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)', // Centering trick
                        maxWidth: '500px',
                        width: '90%',
                        bgcolor: 'white',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        wordBreak: 'break-word'
                    }}
                >
                    <Typography variant="h6" className="mb-4 font-bold text-center">
                        Survey Details
                    </Typography>
                    {selectedSurvey && (
                        <Box>
                            <Typography ><strong className='text-blue-500'>Name:</strong> {selectedSurvey.name}</Typography>
                            <Typography><strong className='text-blue-500'>Email:</strong> {selectedSurvey.email}</Typography>
                            <Typography><strong className='text-blue-500'>Phone:</strong> {selectedSurvey.phoneNumber}</Typography>
                            <Typography><strong className='text-blue-500'>Nationality:</strong> {selectedSurvey.nationality}</Typography>
                            <Typography><strong className='text-blue-500'>Gender:</strong> {selectedSurvey.gender}</Typography>
                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                <strong className='text-blue-500'>Address:</strong> {selectedSurvey.address}
                            </Typography>
                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                <strong className='text-blue-500'>Message:</strong> {selectedSurvey.message}
                            </Typography>
                            <Typography><strong className='text-blue-500'>Submitted Date:</strong> {new Date(selectedSurvey.submittedAt).toLocaleString()}</Typography>
                        </Box>
                    )}
                    <Button onClick={handleClose} variant="contained" color="primary" className="mt-4 w-full">
                        Close
                    </Button>
                </Box>
            </Modal>


        </>
    )
}

export default SubmissionsList