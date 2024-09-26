import React from 'react';
// import PondAnimation from '../PondAnimation';

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <div className='relative'>
      <form className='  rounded-xl p-4 relative z-10'>
        <div className=''>{children}</div>
      </form>
      {/* <PondAnimation /> */}
    </div>
  );
};

export default Form;
