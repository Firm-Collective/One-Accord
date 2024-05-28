import { useEffect, useRef } from 'react';

const useScrollToBottom = (dependency: any): React.MutableRefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, [dependency]);

  return containerRef;
};

export default useScrollToBottom;
