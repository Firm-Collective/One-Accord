import { useEffect, useState, useRef } from 'react';

const useScroll = (dependency: any, pagination: any): React.MutableRefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [prevMaxPageSize, setPrevMaxPageSize] = useState(0);

  // scroll to when the component mounts
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, []);

  // logic when user scrolls to top of page
  useEffect(() => {
    const container = containerRef.current;
    const onScroll = () => {
      if (container?.scrollTop === 0) {
        setPrevScrollHeight(container.scrollHeight);
        pagination?.incrementPagination();
      }
    };

    if (container) {
      container.addEventListener('scroll', onScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', onScroll);
      }
    };
  });

  // Restore the scroll position after new data is fetched and rendered
  useEffect(() => {
    const handleScroll = async () => {
      const maxPageSize = await pagination?.getMaxPageSize();
      const container = containerRef.current;

      // scroll to bottom if new post has been made
      if (maxPageSize > prevMaxPageSize || prevScrollHeight === 0) {
        if (container) {
          container.scrollTop = container.scrollHeight - container.clientHeight;
        }
        setPrevMaxPageSize(maxPageSize);
        setPrevScrollHeight(0);
      } else if (container && prevScrollHeight > 0) {
        // scroll to previous scroll height if scrolling up
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight;
      }
    };

    handleScroll();
  }, [dependency, prevScrollHeight, pagination, prevMaxPageSize]);

  return containerRef;
};

export default useScroll;
