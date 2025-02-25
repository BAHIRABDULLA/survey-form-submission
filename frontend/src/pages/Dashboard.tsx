import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BasicPagination from '../components/Pagination';
import Loading from '../components/Loading';
import SearchIcon from '@mui/icons-material/Search';
import SubmissionsList from '../components/SubmissionsList';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { fetchAlllSurveys } from '../api/adminApi';
import { ISurvey } from '../interfaces/ISurvey';



const Dashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)

  const [totalPages, setTotalPages] = useState(0)

  let itemsPerPage = 5
  const [debounceSearch, setDebounceSearch] = useState(searchQuery)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchQuery)
    }, 500);
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const filterItems = {
    search: debounceSearch,
    currentPage: currentPage,
    itemsPerPage
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };


  const getSurveySubmissions = async () => {
    try {
      const response = await fetchAlllSurveys(filterItems);

      if (response && response?.status >= 400) {
        toast.error(response.data.message || 'No surveys found');
        setSurveys([]);

      } else {
        setSurveys(response?.data.filteredResponse.surveys || []);
        setTotalPages(response?.data.filteredResponse.totalPages)
      }
    } catch (error) {
      console.error('Error fetching survey submissions:', error);
      setSurveys([]);
      toast.error('Error fetching data');
    } finally {
      setLoading(false)
    }
  };



  useEffect(() => {
    getSurveySubmissions();
  }, [debounceSearch, currentPage]);
  if (loading) {
    return <Loading />
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Survey Submissions</h2>
          <Button
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </div>l
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6 ">
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" value={searchQuery}
              onChange={handleSearch}
              label="Search here" variant="standard" />
          </Box>
        </div>

        {/* Survey List */}
        <div className=" p-6">
          <SubmissionsList surveys={surveys} />
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <BasicPagination
            totalItems={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;