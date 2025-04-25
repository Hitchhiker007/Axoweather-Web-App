"use client"; // Add this line at the top of your file

import Image from "next/image";
import React, { useState } from 'react';
import FetchWeather from './fetchWeather'; // Import the WeatherApp component


export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>What's The Weather?</h1>
        {/* <TimeDisplay /> */}
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by selecting your location.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Search and see your current locations weather details instantly.
          </li>
          {/* <li className="tracking-[-.01em]">
            Recent searches will repsond quicker due to Redis caching!
          </li> */}
        </ol>

        <FetchWeather />

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Read
        </button>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          See more Projects by Will →
        </a>

        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[#222] text-black dark:text-white p-6 rounded-2xl max-w-lg w-full shadow-lg relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-2 right-3 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">About This App</h2>
            <p className="text-sm leading-relaxed">
              The intention of this app is to allow users to check 
              real-time weather conditions by entering 
              a location. Here we are using Visual Crossing API to fetch weather data, which furthermore caches results via Upstash 
              Redis for faster performance. The results shown are detailed 
              metrics including temperature, wind, humidity, and more. 
            </p>
            <br></br>
            <p className="text-sm leading-relaxed">
              Notice that if a recent location is previously searched, its is quicker using redis than a brand new location. 
            </p>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Built with Next.js, Tailwind CSS, Upstash Redis, and Visual Crossing API.
            </div>
            <div className="mt-4 flex justify-center">
  <button
    onClick={() => setShowDiagram(true)}
    className="border border-solid border-transparent transition-colors flex items-center 
      justify-center bg-foreground text-background gap-2 hover:bg-[#383838] 
      dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    type="button"
  >
    View Architecture Diagram
  </button>
</div>
        
                            </div>
                          </div>
                          )}
                          {showDiagram && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60]">
    <div className="bg-white dark:bg-[#111] text-black dark:text-white p-6 rounded-2xl max-w-3xl w-full shadow-xl relative">
      <button 
        onClick={() => setShowDiagram(false)} 
        className="absolute top-2 right-3 text-xl font-bold"
        aria-label="Close Diagram"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4">System Architecture</h2>
      <Image
        src="/weatherAppArchitecture.jpeg"
        alt="Weather App System Design"
        width={700}
        height={400}
        className="w-full h-auto"
      />
    </div>
  </div>
)}
                  </footer>
                </div>
              );
            }
