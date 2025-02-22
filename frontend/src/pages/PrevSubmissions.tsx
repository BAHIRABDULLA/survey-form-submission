import  { useEffect, useState } from 'react'
import { fetchAlllSurveys } from '../api/adminApi';
import toast from 'react-hot-toast';
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

const PrevSubmissions = () => {
      const [surveys, setSurveys] = useState<ISurvey[]>([]);
    
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
    <div>
        <SubmissionsList surveys={surveys} />
    </div>
  )
}

export default PrevSubmissions