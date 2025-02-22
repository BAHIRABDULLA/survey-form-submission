import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'


interface ISurvey {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    nationality: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    message: string;
    submittedAt: Date;
  }
  interface SubmissionsListProps {
    surveys:ISurvey[]
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };
  
const SubmissionsList:React.FC<SubmissionsListProps> = ({surveys}) => {

      
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
            <TableContainer component={Paper} className="w-full max-w-4xl shadow-lg">
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
                                    {/* <Button variant="contained" color="primary" > */}
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" className="mb-4 font-bold text-center">
                        Survey Details
                    </Typography>
                    {selectedSurvey && (
                        <Box>
                            <Typography><strong>Name:</strong> {selectedSurvey.name}</Typography>
                            <Typography><strong>Email:</strong> {selectedSurvey.email}</Typography>
                            <Typography><strong>Phone:</strong> {selectedSurvey.phoneNumber}</Typography>
                            <Typography><strong>Nationality:</strong> {selectedSurvey.nationality}</Typography>
                            <Typography><strong>Gender:</strong> {selectedSurvey.gender}</Typography>
                            <Typography><strong>Address:</strong> {selectedSurvey.address}</Typography>
                            <Typography><strong>Message:</strong> {selectedSurvey.message}</Typography>
                            <Typography><strong>Submitted Date:</strong> {new Date(selectedSurvey.submittedAt).toLocaleString()}</Typography>
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