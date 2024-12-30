import { createContext, useState, useEffect, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom"
import Cookies from 'js-cookie'

import { LoadingContext } from "./loading.store.jsx";

import instance from "../utils/axiosRequest.js";

export const UserInfo = createContext({});

const UserInfoProvide = ({ children }) => {
  const { setIsLoading } = useContext(LoadingContext)
  const [profile, setProfile] = useState()
  const [courseOfLearningProcess, setCourseOfLearningProcess] = useState([])
  const [missons, setMissons] = useState([])
  const [lessonsOfSummaryLesson, setLessonOfSummaryLesson] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const token = Cookies.get("token")
  useEffect(() => {
    const getAllData = async () => {
      try {
        const [userResponse, courseResponse, lessonResponse, missionResponse] = await Promise.all([
          instance.get('users/profile'),
          instance.get('learning_process'),
          instance.get('summary_lesson'),
          instance.get('user_missons')
        ])
        setProfile(userResponse.data.data.user)
        setCourseOfLearningProcess(courseResponse.data.data.courses);
        setLessonOfSummaryLesson(lessonResponse.data.data.summaryLesson.lessons);
        setMissons(missionResponse.data.data.missons);
        setIsLoading(false)
        if (courseResponse.data.data.courses.length === 0) {
          navigate('/courses');
        } else {
          navigate('/learning');
        }
      } catch (err) {
        setIsLoading(false)
        if(err.response && err.response.data.message){
          navigate('/login')
        }
      }
    };
    getAllData();
  }, [])
  // Check banned account
  useEffect(() => {
    const getUser = async() =>{
      if(location.pathname === '/login') return
      if(!token) return
      try {
        const result = await instance.get('/users/profile')
        setProfile(result.data.data.user)
      } catch (error) {
        if(error.response && error.response.data.message){
          setProfile(undefined)
          navigate('/login')
        }
      }
    }
    const interval = setInterval(getUser, 60 * 1000)
    return () => clearInterval(interval)
  }, [location])
  return (
    <UserInfo.Provider value={{ profile, setProfile, courseOfLearningProcess, setCourseOfLearningProcess, missons, setMissons, lessonsOfSummaryLesson, setLessonOfSummaryLesson}}>
      {children}
    </UserInfo.Provider>
  );
};

export default UserInfoProvide;