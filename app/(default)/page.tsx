'use client';
import './page.css';
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

import SliderAnimation from "@/components/slideranimation";
import Hero from "@/components/hero-home";
import BusinessCategories from "@/components/business-categories";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";
import Cta from "@/components/cta";
export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        // value: ["#FFE34F", "#4FA0FF", "#FF9519", "#2DD702", "#FF1F00"],
        value: ["#4FA0FF", "#C0C0C0", "#808080", "#2DD702"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 30 },
      },
      links: {
        enable: true,
        distance: 500,
        color: "#808080",
        opacity: 0.4,
        width: 0,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none" as const,
        random: true,
        straight: true,
        outModes: "out" as const,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.8,
            width: 100,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return (
    <div className="relative  z-20">
      <Particles
        className="absolute inset-0 -z-10"
        options={particlesOptions}
        init={particlesInit}
      />
      <div className="relative z-10">
        <div className="mt-[125px] mx-auto w-[100%] lg:w-[95%] h-fit px-4 sm:px-6 pb-[25px] bg-[#f4f4f6] rounded-xl">
          <Hero />
          <div className="">
            <BusinessCategories />
          </div>
          {/* Full width slider section */}
          <div className="mt-[80px] lg:block hidden relative left-[50%] right-[50%] mx-[-50vw] w-screen">
            <h2 className="my-[15px] text-[40px] font-bold text-center text-[#477dd7]">All listings in one place</h2>
            <SliderAnimation />
          </div>
          <div className='my-[180px]'>
            <FeaturesPlanet />
          </div>
          <LargeTestimonial />
          <video autoPlay loop muted playsInline className="w-full h-auto">
            <source src="/video/HomeScanner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Cta />
        </div>
      </div>
    </div>
  );
}
