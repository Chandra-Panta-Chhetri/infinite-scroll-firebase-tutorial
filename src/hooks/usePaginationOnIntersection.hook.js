import { useRef, useCallback } from "react";

const DEFAULT_OPTIONS = { threshold: 0.9 };

const usePaginationOnIntersection = (
  fetchMore,
  isFetchingMore,
  hasMoreToFetch,
  options = DEFAULT_OPTIONS
) => {
  const observer = useRef();
  const triggerPaginationOnIntersection = useCallback(
    (elementNode) => {
      if (isFetchingMore) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      if (!hasMoreToFetch) return;
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      }, options);
      if (elementNode) {
        observer.current.observe(elementNode);
      }
    },
    [isFetchingMore, fetchMore, hasMoreToFetch, options]
  );

  return triggerPaginationOnIntersection;
};

export default usePaginationOnIntersection;
