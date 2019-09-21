const setOs = osString => {
  let os = 'desktop';
  if (/windows phone/i.test(osString)) {
    os = 'Windows Phone';
  }
  if (/android/i.test(osString)) {
    os = 'Android';
  }
  if (/iPad|iPhone|iPod/.test(osString) && !window.MSStream) {
    os = 'iOS';
  }
  return {
    type: 'SET_OS',
    payload: os
  };
};

export default setOs;
