import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'lazysizes';

const Home = lazy(() => import('./pages/Home.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Courses = lazy(() => import('./pages/Courses.jsx'))
const Learning = lazy(() => import('./pages/Learning.jsx'))
const LearningPage = lazy(() => import('./pages/LearningPage.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Rank = lazy(() => import('./pages/Rank.jsx'))
const Misson = lazy(() => import('./pages/Misson.jsx'))
const Alphabet = lazy(() => import('./pages/Alphabet.jsx'))
const Character = lazy(() => import('./pages/Character.jsx'))
const Milestone = lazy(() => import('./pages/Milestone.jsx'))
const Lesson = lazy(() => import('./pages/Lesson.jsx') ) 
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'))
const PrivateRoute  = lazy(() => import('./components/PrivateRoute.jsx'))
const Loading = lazy(() => import('./components/Loading.jsx'))

import UserInfoProvide from './stores/user.store.jsx'
import LoadingContextProvider from './stores/loading.store.jsx';
function App() {
  return (
    <>
    <Router>
    <Suspense fallback={<h1>Loading...</h1>}>
      <LoadingContextProvider>
      <Loading />
      <UserInfoProvide >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element= {<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path="/courses" element={<PrivateRoute element={<Courses />} />} />
        <Route path="/learning" element={<PrivateRoute element={<LearningPage />} />}>
          <Route path="/learning" element={<PrivateRoute element={<Learning />} />} />
          <Route path="milestones" element={<PrivateRoute element={<Milestone />} />} />
        </Route>
        <Route path="/rank" element={<PrivateRoute element={<Rank />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/missons" element={<PrivateRoute element={<Misson />} />} />
        <Route path="/alphabet" element={<PrivateRoute element={<Alphabet />} />} />
        <Route path="/character" element={<PrivateRoute element={<Character />} />} />
        <Route path="/lesson" element={<PrivateRoute element={<Lesson />} />} />
          
        <Route path='*' />
      </Routes>
      </UserInfoProvide>
      </LoadingContextProvider>
      </Suspense>
    </Router>
    </>
  )
}

export default App
