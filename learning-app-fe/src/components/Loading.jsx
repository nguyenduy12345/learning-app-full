import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../stores/loading.store.jsx';
const Loading = () => {
  const [progress, setProgress] = useState(0)
  const {isLoading} = useContext(LoadingContext)
  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
        }
        return Math.min(oldProgress + 3, 100);
      });
    }, 50);
    return () => clearInterval(interval); 
  }, [isLoading]);
  return (
    isLoading && <div className="fixed z-40 w-full flex flex-col items-center justify-center h-screen bg-white">
      <div className='flex w-[23rem] pr-[4rem] mx-auto justify-start'>
        <img style={{transform: 'scaleX(-1)', marginLeft: progress + '%'}} src="/images/anh-dong.gif" className='h-[5rem]' />
      </div>
      <div className="w-80 h-4 mb-4 bg-gray-300 rounded-full">
        <div
          className="h-full bg-[#61d34d] rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xl font-semibold animate-pulse">{progress}%</p>
    </div>
  );
};

export default Loading;