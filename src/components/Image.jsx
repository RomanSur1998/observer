import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({ url, alt }) => {
  const ref = useRef(null);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="lazy-image-container">
      {isView ? <img src={url} alt={alt} className="img" /> : null}
    </div>
  );
};

export default LazyImage;
