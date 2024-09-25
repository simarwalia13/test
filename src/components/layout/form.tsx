import React from 'react';

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <form className='bg-black bg-opacity-5 backdrop-blur-sm rounded-xl p-4'>
      <div className=''>{children}</div>
    </form>
  );
};

export default Form;
