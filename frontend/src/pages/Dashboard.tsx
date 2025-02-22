import React, { useEffect, useState } from 'react';
import {
 TextField,
  // Modal, Typography, Box, Button
} from "@mui/material";
import toast from 'react-hot-toast';
// import Loading from "../components/Loading";
import BasicPagination from '../components/Pagination';
import { fetchAlllSurveys } from '../api/adminApi';
import SubmissionsList from '../components/SubmissionsList';



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

const Dashboard = () => {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  console.log(surveys,'surveys');
  
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itermsPerPage = 5
  // const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);
  // const [open, setOpen] = useState(false);

  // const handleOpen = (survey: ISurvey) => {
  //   setSelectedSurvey(survey);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedSurvey(null);
  // };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const filteredSurveys = surveys.filter((survey) =>
    survey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    survey.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    survey.phoneNumber.toString().includes(searchQuery) ||
    survey.nationality.toLowerCase().includes(searchQuery.toLowerCase())

  )

  const indexOfLastItem = currentPage * itermsPerPage
  console.log(indexOfLastItem, 'index of last item ');
  const indexOfFirstItem = indexOfLastItem - itermsPerPage
  const currentSurveys = filteredSurveys.slice(indexOfFirstItem, indexOfLastItem)

  const getSurveySubmissions = async () => {
    try {
      const response = await fetchAlllSurveys();
      if (response && response?.status >= 400) {
        toast.error('No surveys found');
        setSurveys([]);
      } else {
        setSurveys(response?.data.response || []);
      }
    } catch (error) {
      console.error('Error fetching survey submissions:', error);
      setSurveys([])
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    getSurveySubmissions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Survey Submissions</h2>
      <TextField label="Search here" value={searchQuery} onChange={handleSearch} className="mb-4 w-full max-w-md" />

      {/* <TableContainer component={Paper} className="w-full max-w-4xl shadow-lg">
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
            {currentSurveys .map((survey) => (
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
      </TableContainer> */}
      <SubmissionsList surveys={currentSurveys} />

      {/* <Modal open={open} onClose={handleClose}>
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
      </Modal> */}

      <BasicPagination
        totalItems={filteredSurveys.length}
        itemsPerPage={itermsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
