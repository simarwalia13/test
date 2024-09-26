import Link from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';
import windmillAnimationData from '../../public/json/windmill.json';

const Home: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: windmillAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <header className='w-full bg-white shadow'>
        <div className='mx-auto px-6 py-3 flex justify-between items-center'>
          <h1 className='sm:text-3xl xxxs:text-sm font-bold opacity-50 text-gray-800'>
            Testcase website
          </h1>
          <div className='flex justify-between items-center'>
            <Link href='/auth/login'>
              <div className='text-gray-800 hover:text-gray-600 mx-4'>
                Login
              </div>
            </Link>
            <Link href='/auth/signup'>
              <div className='text-gray-800 hover:text-gray-600 mx-4'>
                Signup
              </div>
            </Link>
          </div>
        </div>
      </header>
      <div className='flex-grow text-center text-gray-600 '>
        <div className='md:text-8xl xxxs:text-4xl mt-7 mb-4 opacity-30'>
          This is test case
        </div>
        <div className='w-full max-w-md mx-auto'>
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <footer className='w-full bg-white shadow py-4 '>
        <div className='mx-auto px-6 text-center text-gray-600'>
          &copy; 2023 testcase Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
