import React, { useEffect, useState } from 'react'


const AnimatedText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(interval);
        setDisplayedText('PATRION');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);
  const letterColors = ['black', 'white', 'black', 'black', 'black', 'black', 'black'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {displayedText.split('').map((letter, index) => (
        <span key={index} className='mb-4' style={{ color: letterColors[index] }}>{letter}</span>
      ))}
    </div>
  );
};

export default AnimatedText