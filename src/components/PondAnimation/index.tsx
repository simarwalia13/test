import React from 'react';
import Lottie from 'react-lottie';
import pondAnimationData from '../../../public/json/pond.json';

const PondAnimation = () => {
  const pondOptions = {
    loop: true,
    autoplay: true,
    animationData: pondAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='absolute bottom-0 left-0 w-full h-[100%]'>
      <Lottie options={pondOptions} height='100%' width='90%' />
    </div>
  );
};

export default PondAnimation;
