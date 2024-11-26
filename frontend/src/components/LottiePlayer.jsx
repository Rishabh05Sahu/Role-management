import React from 'react';
import '@dotlottie/player-component';

const LottiePlayer = () => {
  return (
    <dotlottie-player
      src="https://lottie.host/cf8abddf-1181-4e2d-b16b-ac8784cb670e/DX6LlsWhjY.lottie"
      background="transparent"
      speed="1"
      style={{ width: '300px', height: '300px' }}
      loop
      autoplay
    ></dotlottie-player>
  );
};

export default LottiePlayer;
