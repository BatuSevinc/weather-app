import React, { useEffect, useState } from 'react';

const AnimatedText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text && text.length > 0) {
      setDisplayedText(text);
    }
  }, [text]);

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {displayedText.split('').map((letter, index) => (
        <span key={index} className='mb-4 text-slate-100/60'>{letter}</span>
      ))}
    </div>
  );
};

export default AnimatedText;