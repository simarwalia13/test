/* eslint-disable @typescript-eslint/no-explicit-any */
import { message as antdMessage } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useLogin } from '@/hooks/user/mutation';

import FormLayout from '@/components/layout/layouts';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const userLogin: any = useLogin();

  const emailRegex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: any =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;

  const validation = Yup.object({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
      .matches(
        passwordRegex,
        'Password must contain at least one uppercase letter, one special character, and one digit',
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        userLogin
          ?.mutateAsync({
            body: values,
          })
          .then(async (res: any) => {
            if (res?.token) {
              localStorage.setItem('authorization', res?.token);
              router.push('/');
            }

            antdMessage.success('Login successfully');
          })
          .catch((err: any) => {
            antdMessage.error(err.response?.data?.message);
          });
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });
  if (!isMounted) {
    return null;
  }

  return (
    <FormLayout>
      <main className='flex justify-center items-center h-screen'>
        <div className=' flex justify-center rounded-xl  w-fit  bg-black bg-opacity-10 py-3 backdrop-blur-sm px-5'>
          <form className='mx-2 p-2 space-x-3 ' method='POST'>
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <h1 className='p-2 text-2xl font-semibold'>LOGIN</h1>
              </div>
              <div className='xxxs:gap-4 flex flex-col gap-4'>
                <div className=''>
                  <label htmlFor='email' className='xxxs:text-[15px] '>
                    Email
                    <div className=''>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='xxs:w-[300px] xxxs:w-[95%] relative block appearance-none rounded-md border px-5 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-indigo-500 md:mt-1   '
                        placeholder='Email'
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-500'>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor='password' className='xxxs:text-[15px]'>
                    Password
                    <div className=''>
                      <input
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='password'
                        className='xxs:w-[300px] xxxs:w-[95%] relative block appearance-none rounded-md border px-5 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-indigo-500 md:mt-1 '
                        placeholder='Password'
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className='text-red-500'>
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </label>
                  <Link href='forgot-password'>
                    <div className=' mt-3 flex cursor-pointer justify-end'>
                      Forgot Password?
                    </div>
                  </Link>
                </div>
                <div className='mt-3 '>
                  <button
                    type='button'
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={userLogin.isLoading}
                    className='xxs:w-full xxxs:w-[95%] group relative flex w-[90%] justify-center rounded-md border border-transparent bg-black px-5 py-2 text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    {userLogin.isLoading ? (
                      <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </FormLayout>
  );
}
