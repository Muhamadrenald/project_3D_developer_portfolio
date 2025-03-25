import React, { useState, useEffect } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { BallCanvas } from "./canvas/Ball";

const Tech = () => {
  const [visibleBalls, setVisibleBalls] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (loadedCount < Math.min(technologies.length, 8)) {
      // Load 8 pertama lebih cepat
      const timer = setTimeout(() => {
        setVisibleBalls((prev) => [...prev, technologies[loadedCount].icon]);
        setLoadedCount((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  const loadMore = () => {
    const remaining = technologies.length - loadedCount;
    const nextBalls = technologies
      .slice(loadedCount, loadedCount + Math.min(4, remaining))
      .map((t) => t.icon);
    setVisibleBalls((prev) => [...prev, ...nextBalls]);
    setLoadedCount((prev) => prev + nextBalls.length);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[60vh] mb-6">
        {" "}
        {/* Tinggi lebih kecil */}
        <BallCanvas icons={visibleBalls} />
      </div>

      {loadedCount < technologies.length && (
        <button
          onClick={loadMore}
          className="px-5 py-2 bg-tertiary text-white rounded-lg hover:bg-primary transition-all"
        >
          Load More ({technologies.length - loadedCount} remaining)
        </button>
      )}
    </div>
  );
};

export default SectionWrapper(Tech, "");
