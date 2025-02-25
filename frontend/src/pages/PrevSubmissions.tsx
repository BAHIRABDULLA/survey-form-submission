import SubmissionsList from '../components/SubmissionsList';
import BasicPagination from '../components/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { ISurvey } from '../interfaces/ISurvey';
import { useEffect, useState } from 'react'
import { fetchAllSurveys } from '../api/surveyApi';
import { Box, TextField } from '@mui/material';



const PrevSubmissions = () => {


  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [debounceSearch, setDebounceSearch] = useState(searchQuery)

  let itemsPerPage = 5


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchQuery)
    }, 500);
    return () => clearTimeout(timer)
  }, [searchQuery])
  const filterItems = {
    search: debounceSearch,
    currentPage: currentPage,
    itemsPerPage
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const getSurveySubmissions = async () => {
    try {
      const response = await fetchAllSurveys(filterItems);
      if (response && response?.status >= 400) {
        toast.error('No surveys found');
        setSurveys([]);
      } else {
        setSurveys(response?.data.filteredResponse.surveys || []);
        setTotalPages(response?.data.filteredResponse.totalPages)
      }
    } catch (error) {
      console.error('Error fetching survey submissions:', error);
      setSurveys([])
      toast.error('Error fetching data');
    } finally {
      setLoading(false)
    }
  };
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getSurveySubmissions();
  }, [debounceSearch, currentPage]);

  if (loading) {
    return <Loading />
  }
  return (
    <div className='h-screen  '>
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '300px' }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                value={searchQuery}
                onChange={handleSearch}
                label="Search here"
                variant="standard"
                fullWidth
              />
            </Box>
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
  )
}

export default PrevSubmissions