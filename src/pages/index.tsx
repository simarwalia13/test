import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <header className='w-full bg-white shadow'>
        <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-800'>testcase Website</h1>
          <div>
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

      <footer className='w-full bg-white shadow py-4'>
        <div className='container mx-auto px-6 text-center text-gray-600'>
          &copy; 2023 testcase Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
