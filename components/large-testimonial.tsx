import React, { useState, useEffect } from "react";

export default function LargeTestimonial() {
  // Original video IDs; add more if needed.
  const videoIds = ["togRbicQWEQ", "YS8wIpw01w4", "bfR0Q7dyhJo","NMOtwUGzjFU"];
  const visibleCount = 3;
  // Extend the array by duplicating the first visibleCount items
  const extendedVideos = [...videoIds, ...videoIds.slice(0, visibleCount)];

  // currentIndex is the index of the leftmost slide in view.
  const [currentIndex, setCurrentIndex] = useState(0);
  // Controls whether the CSS transition is enabled.
  const [isTransitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const transitionDuration = 500; // in ms

  const handleNext = () => {
    if (isAnimating) return; // Prevent multiple rapid clicks
    setIsAnimating(true);
    // Only increment if we haven't reached the duplicate slides yet
    if (currentIndex < videoIds.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (currentIndex === 0) {
      // Jump to the duplicate slides at the end without transition,
      // then slide back one step.
      setTransitionEnabled(false);
      setCurrentIndex(videoIds.length);
      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentIndex(videoIds.length - 1);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Release the animation lock after the transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, transitionDuration);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // When currentIndex reaches the duplicate slides (equal to videoIds.length),
  // reset to the original slides without transition for a cyclic effect.
  useEffect(() => {
    if (currentIndex === videoIds.length) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
        // Re-enable transition after resetting the position.
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, videoIds.length]);

  return (
    <section className="mb-[100px] px-4">
      <h2 className="text-5xl font-bold text-center text-blue-500 mt-8">
        What users say...
      </h2>
      <h3 className="text-lg font-semibold text-center text-grey-400 mt-2 md:text-3xl">
        Open, no-holds-bar discussion with our users
      </h3>
      <h3 className="text-base font-medium text-center text-green-500 mt-1 md:text-4xl">
        Driven by user-first thesis
      </h3>

      {/* Slider Container */}
      <div className="mt-12 relative w-[1228px] h-[300px] mx-auto overflow-hidden">
        <div
          className={`flex ${
            isTransitionEnabled ? "transition-transform duration-500" : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 400}px)` }}
        >
          {extendedVideos.map((videoId, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] h-[300px] m-1 p-[3px] rounded-2xl bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"
            >
              <div className="overflow-hidden rounded-2xl bg-black w-full h-full">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute rotate-180 left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
        >
        &#x27A9;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
        >
          &#x27A9;
        </button>
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.youtube.com/@homescanner-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 hover:bg-blue-600 text-white rounded"
        >
          Watch more on Youtube
        </a>
      </div>
    </section>
  );
}
