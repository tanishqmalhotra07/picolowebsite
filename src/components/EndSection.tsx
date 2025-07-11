'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Aurora from './Aurora';

const EndSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <footer style={{ contentVisibility: 'auto', containIntrinsicSize: '50vh', willChange: 'transform, opacity' }} className="relative bg-[#02010C] text-white pt-16 pb-20 sm:pb-10 overflow-hidden -mb-10">
      {/* Aurora background - hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 h-[102%] w-full">
          <Aurora colorStops={["#8716EE", "#FF0033", "#F633EF"]} blend={0.3} amplitude={1.0} speed={0.5} />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">

          {/* Left Column - Hidden on mobile */}
          <div className="hidden sm:flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8 sm:col-span-1">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex">
                <Image src="/footer.png" alt="Footer" width={200} height={200} className="h-70 w-75" />
              </div>
            </div>
          </div>

          {/* Right Column - Full width on mobile */}
          <div className="flex flex-col justify-between space-y-3 sm:space-y-4 md:space-y-6 col-span-1 sm:col-span-2">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-center font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-wrap justify-center sm:justify-around text-sm sm:text-base gap-x-4 gap-y-2">
                <a href="#" className="hover:text-purple-400 transition-colors px-2">Home</a>
                <a href="#about" className="hover:text-purple-400 transition-colors px-2">AI Transformation</a>
                <a href="#solutions" className="hover:text-purple-400 transition-colors px-2">AI Agents</a>
                <a href="#services" className="hover:text-purple-400 transition-colors px-2">ROI Estimator</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors px-2">Contact</a>
              </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex flex-col sm:flex-col justify-around items-center mt-2 space-y-4 sm:space-y-0">
              <h3 className="text-lg sm:text-xl md:text-2xl text-center font-semibold">Contact Us</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                  <Image src="/Circled Envelope.png" alt="Email" fill sizes="(max-width: 640px) 24px, 32px" className="object-contain" />
                </div>
                <a href="mailto:picolo.ai.team@gmail.com" className="hover:text-purple-400 transition-colors text-xs sm:text-sm md:text-base underline">picolo.ai.team@gmail.com</a>
              </div>
            </div>
            <hr className="border-gray-700 " />
            <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-around text-xs sm:text-sm text-gray-400 gap-4 sm:gap-0">
              <p className="text-center">&copy; Copyright 2025. All Rights Reserved</p>
              <a href="#" className="text-center hover:text-white transition-colors">Powered By Picolo AI</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EndSection;

