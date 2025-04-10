"use client"; // Add this line at the top of your file

import Image from "next/image";
import React, { useState } from 'react';
import FetchWeather from './fetchWeather'; // Import the WeatherApp component
import TimeDisplay from "./TimeDisplay";

export default function Home() {

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
        <a
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
        </a>
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
      </footer>
    </div>
  );
}
