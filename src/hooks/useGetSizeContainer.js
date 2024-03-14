import React, { useState, useEffect } from "react";

const useGetSizeContainer = (ref) => {
  const [size, setSize] = useState();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.disconnect();
      }
    };
  }, [ref]);

  return size;
};

export default useGetSizeContainer;
