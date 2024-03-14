import React, { useState, useEffect, useRef } from "react";

import Image from "./components/Image";
import { images } from "./data";
import useGetSizeContainer from "./hooks/useGetSizeContainer";
import { Pagination } from "@mui/material";
//
const App = () => {
  const ref = useRef(null);
  const resizeRef = useRef(null);
  const paginationRef = useRef(null);
  const size = useGetSizeContainer;
  console.log(size(resizeRef), "Использование hooks");

  // ! Counter - InterSection observer

  const [count, setCount] = useState(0);
  const [styles, setStyles] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCount((prev) => prev + 1);
        }
      });
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ! Counter - InterSection observer

  // * Counter - ResizeObserver observer

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        console.log("Изменения  размера блока", entry.contentRect.width);
        if (entry.contentRect.width < 1000) {
          setStyles(true);
        } else {
          setStyles(false);
        }
      });
    });
    if (resizeRef.current) {
      resizeObserver.observe(resizeRef.current);
    }
    return () => {
      if (resizeRef.current) {
        resizeObserver.unobserve(resizeRef.current);
      }
    };
  }, []);

  // * Counter - ResizeObserver observer
  // todo Select mui observer
  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (mutation) {
          console.log("Изменение  пагинации", mutation);
        }
      });
    });

    if (paginationRef.current) {
      observer.observe(paginationRef.current, {
        attributes: true,
        childList: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  // todo Select mui observer

  return (
    <div className="container" ref={resizeRef}>
      <ul>
        {images.map((item) => {
          return (
            <li key={item} className={`image `}>
              <Image url={item} />
            </li>
          );
        })}
      </ul>
      <p className="flex">{count}</p>
      <div>
        <Pagination
          ref={paginationRef}
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>

      <footer ref={ref} className={styles ? "min" : null}>
        footer
      </footer>
    </div>
  );
};

export default App;
