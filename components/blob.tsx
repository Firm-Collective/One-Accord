import { useEffect, useState } from 'react';

export default function Blob() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ['#DA7A84', '#F34F66', '#50c5e2', '#BBCFF3', '#F2DDCF', '#cc7b44', '#75A6AD', '#E2A9B0'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [colors.length]); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <>
      <div
        className={`absolute -z-[5] w-[420px] h-[456px] rounded-full opacity-55 blur-3xl animate-blob`}
        style={{
          backgroundColor: colors[currentColorIndex],
          transition: 'background-color 2s ease-in-out',
        }}
      ></div>
    </>
  );
}
