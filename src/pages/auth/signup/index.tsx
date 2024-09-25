import { LoadingOutlined } from '@ant-design/icons';
import { message as antdMessage, Spin } from 'antd';
import { message } from 'antd';

import { useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { useSignUp } from '@/hooks/user/mutation';

import Form from '@/components/layout/form';
import { useRouter } from 'next/router';

const signup = () => {
  const router = useRouter();
  const [isloading, setIsLoading] = React.useState(false);

  const [, contextHolder] = message.useMessage();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const userregex: any = '^[a-zA-Z0-9]+$';
  const nameregex: any = '^[a-zA-Z]+$';
  const emailRegex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: any =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
  const AddRegistration: any = useSignUp();

  const validation = Yup.object({
    firstName: Yup.string()
      .required('Please enter your first name')
      .matches(nameregex, 'only alphabets are allowed'),
    lastName: Yup.string()
      .required('Please enter your last name')
      .matches(nameregex, 'only alphabets are allowed'),
    username: Yup.string()
      .required('Please enter your username')
      .matches(userregex, 'only alphanumeric characters are allowed')
      .min(6, 'username must be at least 6 characters'),
    email: Yup.string()
      .required('please enter your email')
      .matches(emailRegex, 'Invalid email address'),
    password: Yup.string()
      .matches(
        passwordRegex,
        'Password must contain at least one uppercase letter, one special character, and one digit',
      )
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: validation,
    // validateOnBlur: false,
    // validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await AddRegistration.mutateAsync({
          body: values,
        })

          .then((res: any) => {
            console.log(res, 'res');
            antdMessage.success('Form submitted successfully');
            if (res?.success) {
              router.push('/auth/login');
            } else {
              antdMessage.error(res.message);
            }
            setIsLoading(false);
          })
          .catch((error: any) => {
            console.log(error, 'error');
            setIsLoading(false);
            antdMessage.error(error.message);
          });
      } catch (error: any) {
        console.log(error, 'error');
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  if (!isMounted) {
    return null;
  }

  return (
    <Form>
      <div className='flex flex-col items-center justify-center h-[100vh]'>
        <div className='mx-10 mt-10'>
          {/* Parent div */}
          <div className='rounded-2xl bg-black bg-opacity-10 py-2  px-3'>
            <div>
              <h1 className='text-[20px] flex ml-3 p-2 text-2xl font-semibold'>
                Registration Form
              </h1>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className='space-x-3'
              method='POST'
            >
              <div className='rounded-md shadow-sm lg:mt-0'>
                <div className='xxxs:flex xxxs:flex-col xxxs:gap-0 w-[100%] gap-6 sm:flex sm:flex-row'>
                  <div>
                    <label className='px-2 text-black 2xl:px-4'>
                      First Name
                    </label>
                    <div className='p-[5px] 2xl:px-4'>
                      <input
                        name='firstName'
                        type='text'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-[100%] block rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className='pl-2 text-[14px] text-red-500'>
                          {formik?.errors?.firstName}
                        </div>
                      ) : (
                        <div className='h-[20px]'></div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className='px-2 text-black 2xl:px-4'>
                      Last Name
                    </label>
                    <div className='p-[5px] 2xl:px-4'>
                      <input
                        name='lastName'
                        type='text'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='block w-[100%] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className='pl-2 text-[14px] text-red-500'>
                          {formik.errors.lastName}
                        </div>
                      ) : (
                        <div className='h-[20px]'></div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className='px-2 text-black 2xl:px-4'>Username</label>
                  <div className='p-[5px] 2xl:px-4'>
                    <input
                      name='username'
                      type='text'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className='w-[100%] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Username'
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className='pl-2 text-[14px] text-red-500'>
                        {formik.errors.username}
                      </div>
                    ) : (
                      <div className='h-[20px]'></div>
                    )}
                  </div>
                </div>

                <div>
                  <label className='px-2 text-black 2xl:px-4'>
                    Email
                    <div className='p-[5px] 2xl:px-4'>
                      <input
                        name='email'
                        type='email'
                        autoComplete='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-[100%] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        placeholder='Email address'
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className='pl-2 text-[14px] text-red-500'>
                          {formik.errors.email}
                        </div>
                      ) : (
                        <div className='h-[20px]'></div>
                      )}
                    </div>
                  </label>
                </div>

                <div>
                  <label className='px-2 text-black 2xl:px-4'>Password</label>
                  <div className='p-[5px] 2xl:px-4'>
                    <input
                      name='password'
                      type='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete='new-password'
                      className='w-[100%] appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className='pl-2 text-[14px] text-red-500'>
                        {formik.errors.password}
                      </div>
                    ) : (
                      <div className='h-[20px]'></div>
                    )}
                  </div>
                </div>

                <div className='xxxs:px-2 md:px-2 2xl:px-4'>
                  <button
                    type='submit'
                    disabled={isloading || !formik.isValid || !formik.dirty}
                    className='mb-4 mt-4 flex w-full justify-center rounded-xl border border-transparent bg-black px-6 py-2 text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  lg:mt-6'
                  >
                    {isloading ? (
                      <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                      'SignUp'
                    )}
                  </button>
                  {contextHolder}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default signup;
