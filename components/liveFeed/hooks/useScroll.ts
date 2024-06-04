import { useEffect, useState, useRef } from 'react';

const useScroll = (dependency: any, pagination: any): React.MutableRefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [prevMaxPageSize, setPrevMaxPageSize] = useState(0);

  /**
   * Scroll to bottom of container when component mounts
   */
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, []);

  /**
   * Logic when user scrolls to top of container
   * When user scrolls to top of container, load more posts.
   */
  useEffect(() => {
    const container = containerRef.current;
    const onScroll = () => {
      // if user scrolls to top of container
      if (container?.scrollTop === 0) {
        // save prev scroll height to return to it after new posts are added
        setPrevScrollHeight(container.scrollHeight);
        // load more posts by incrementing pagination
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

  /**
   * Logic when new posts are rendered to the page
   */
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
