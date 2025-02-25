import React from 'react'
import Header from '../components/Header'
import SurveyForm from './SurveyForm'
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import PrevSubmissions from '../pages/PrevSubmissions';
import { Box } from '@mui/material'


const Home = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  return (
    <div className='bg-gray-100'>
      <div className='pt-5'>

        <Header />
      </div>
      {/* <SurveyForm/> */}
      <div className=''>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Take Survey" value="1" />
              <Tab label="Previous Submissions" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><SurveyForm /></TabPanel>
          <TabPanel value="2"><PrevSubmissions /></TabPanel>
        </TabContext>
      </div>
    </div>
  )
}

export default Home