'use client';

import { useState } from 'react';
import Hyperspeed from './components/hyperspeed';
import LetterGlitch from './components/letterglitch';
import Terminal from './components/terminal';

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showHyperspeed, setShowHyperspeed] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const handleStartSequence = () => {
    // Hide terminal and glitch immediately (they have their own fade)
    setShowTerminal(false);
    // Hide hyperspeed after 2 seconds with smooth fade
    setTimeout(() => {
      setShowHyperspeed(false);
      // Show video after hyperspeed fades (2s fade + 0.5s buffer)
      setTimeout(() => {
        setShowVideo(true);
      }, 2000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 w-full h-full m-0 p-0 overflow-hidden bg-black">
      {/* Background Layer - LetterGlitch */}
      <div className={`absolute inset-0 z-0 transition-all duration-[2000ms] ease-in-out ${showTerminal ? 'opacity-100' : 'opacity-0'}`}>
        <LetterGlitch
          glitchColors={["#D856BF", "#6750A2", "#C247AC", "#03B3C3", "#0E5EA5", "#324555"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          characters="MOSAIC INAUGURATION"
        />
      </div>

      {/* Foreground Layer - Hyperspeed - ALWAYS MOUNTED, just opacity changes */}
      <div className={`absolute inset-0 z-10 transition-all duration-[2000ms] ease-in-out ${showHyperspeed ? 'opacity-50' : 'opacity-0'}`}>
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 20,
            islandWidth: 4,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 0.5,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.02,
            brokenLinesLengthPercentage: 0.05,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [30, 40],
            movingCloserSpeed: [-30, -40],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>

      {/* Terminal Overlay */}
      {showTerminal && <Terminal onStartSequence={handleStartSequence} />}

      {/* Video Player */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-[fadeIn_2000ms_ease-in]">
          <video
            autoPlay
            className="w-full h-full object-cover"
            onEnded={() => {
              // Optional: What happens after video ends
              // setShowVideo(false);
            }}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            playsInline
          >
            <source src="/vidFinal.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}