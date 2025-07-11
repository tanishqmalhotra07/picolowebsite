'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue
} from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Orb from './Orb';
import ProfileCard from './ProfileCard';
import './ProfileCard.css';
import './embla.css';

const solutionsData = [
  {
    "name": "AI Sales Experience Advisor",
    "industry": "D2C & Ecommerce",
    "description": "Handles customer queries, assists in product discovery, and reinforces your brand experience — 24/7",
    "image": "AI Sales Experience Advisor"
  },
  {
    "name": "AI Showroom Specialist",
    "industry": "Car & Bike Dealerships",
    "description": "Your digital showroom rep — sharing model details, answering queries, scheduling test drives, and capturing leads",
    "image": "AI Showroom Specialist"
  },
  {
    "name": "AI Frontdesk Facilitator",
    "industry": "Clinics and Spas",
    "description": "Manages bookings, follow-ups, and inquiries across WhatsApp, website, and Instagram — 24/7.",
    "image": "AI Frontdesk Facilitator"
  },
  {
    "name": "Booking Boost Agent",
    "industry": "Interior Design Studios",
    "description": "Qualifies prospects, gathers requirements, and handles back-and-forth — so you close faster",
    "image": "Booking Boost Agent"
  },
  {
    "name": "Guest Guidance Agent",
    "industry": "Hotels, Restaurants & Cafes (HoReCa)",
    "description": "Books tables, rooms, or experiences via WhatsApp — while capturing leads and syncing calendars.",
    "image": "Guest Guidance Agent"
  },
  {
    "name": "Inquiry Intelligence Agent",
    "industry": "Wholesalers & Distributors",
    "description": "Sends pricing, GST, and delivery info instantly — and keeps leads warm with proactive follow-ups.",
    "image": "Inquiry Intelligence Agent"
  },
  {
    "name": "Glamour Growth Partner",
    "industry": "Clinics and Spas",
    "description": "Nurtures leads, shares portfolios, retargets missed clients, and fills your calendar 24/7.",
    "image": "Glamour Growth Partner"
  },
  {
    "name": "Custom AI Agent",
    "industry": "For Your Business",
    "description": "We can develop custom AI agents tailored to your specific business needs and requirements.",
    "image": "updates"
  }
];

const content = [
  {
    title: 'Identify',
    description:
      'We help you to identify high impact AI opportunities and build a step by step AI transformation strategy to bring them to life.',
  },
  {
    title: 'Educate',
    description:
      'We train and support your team with the right tools and know-how to embed AI across your entire organization.',
  },
  {
    title: 'Develop',
    description:
      'We design, build, and scale custom AI solutions that solve your most pressing business needs and create a lasting competitive advantage.',
  },
];

interface NavItemProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ scrollYProgress, index, title }) => {
  const sectionDuration = 0.20;
  const sectionOverlap = 0;
  const startTime = 0.2 + index * (sectionDuration - sectionOverlap);
  const endTime = startTime + sectionDuration;
  const midpoint = startTime + sectionDuration / 2;

  const opacity = useTransform(
    scrollYProgress,
    [startTime, midpoint, endTime],
    [0.5, 1, 0.5]
  );

  return (
    <motion.span 
      style={{ opacity }}
      className="md:text-xl md:font-semibold md:tracking-wider"
    >
      {title.toUpperCase()}
    </motion.span>
  );
};

interface ContentItem {
  title: string;
  description: string;
}

interface ContentAnimationProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  item: ContentItem;
}

const ContentAnimation: React.FC<ContentAnimationProps> = ({ scrollYProgress, index, item }) => {
  const sectionDuration = 0.20;
  const sectionOverlap = 0;

  const startTime = 0.2 + index * (sectionDuration - sectionOverlap);
  const endTime = startTime + sectionDuration;
  
  // Add pin effect - stay visible for longer
  const pinDuration = 0.10;
  const animInStart = startTime;
  const animInEnd = startTime + sectionDuration * 0.1;
  const animStayStart = animInEnd;
  const animStayEnd = endTime - sectionDuration * 0.1 - pinDuration;
  const animOutStart = animStayEnd + pinDuration;
  const animOutEnd = endTime;

  const opacity = useTransform(
    scrollYProgress,
    [animInStart, animInEnd, animStayStart, animStayEnd, animOutStart, animOutEnd],
    [0, 1, 1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [animInStart, animInEnd, animStayStart, animStayEnd, animOutStart, animOutEnd],
    [0.8, 1, 1, 1, 1, 0.8]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      className="flex flex-col md:flex-row items-center justify-center"
    >
      {/* Desktop layout */}
      <h3 className="hidden md:block text-5xl md:text-6xl font-bold text-white pointer-events-none">{item.title}</h3>
      <p className="hidden md:block absolute top-1/2 -translate-y-1/2 right-16 w-64 text-right text-white text-base pointer-events-none">
        {item.description}
      </p>
      
      {/* Mobile layout */}
      <div className="flex flex-col items-center md:hidden w-full h-full">
        <h3 className="text-4xl sm:text-5xl font-bold text-white pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">{item.title}</h3>
        <p className="text-white text-sm sm:text-base text-center px-4 w-[85%] pointer-events-none absolute bottom-25 left-1/2 -translate-x-1/2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

const OrbSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Check if on mobile device
  const isMobile = useIsMobile();
  
  // State for orb interactivity
  const [, setIsOrbInteractive] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    dragFree: true
  });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', () => {
      // Always keep the orb interactive regardless of scroll position
      setIsOrbInteractive(true);
    });
    return unsubscribe;
  }, [scrollYProgress]);
  
  // Keep orb visible without expansion or disappearance
  const orbFinalScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1]
  );
  
  const orbFinalOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.4, 0.6, 0.65, 0.8, 1],
    [1, 1, 1, 0, 0, 0, 0, 0]
  );

  // Orb Squeeze and Stretch animation
  const transitionPoint1 = 0.4; // End of Identify
  const transitionPoint2 = 0.6;  // End of Educate
  const transitionPoint3 = 0.8; // End of Develop
  const pulseDuration = 0.08; // Duration for the portal effect - increased for smoother transition

  const portalScale = useTransform(
    scrollYProgress,
    [
      0,
      0.2, // Start of Identify
      // First transition (out of Identify)
      transitionPoint1 - pulseDuration,
      transitionPoint1,
      transitionPoint1 + pulseDuration,
      // Second transition (out of Educate)
      transitionPoint2 - pulseDuration,
      transitionPoint2,
      transitionPoint2 + pulseDuration,
      // Third transition (out of Develop)
      transitionPoint3 - pulseDuration,
      transitionPoint3,
      transitionPoint3 + pulseDuration,
    ],
    [
      isMobile ? 4 : 3,    // initial scale - larger on mobile for reveal effect
      isMobile ? 0.93 : 0.93, // scale at 0.2 (start of Identify) - same on mobile
      // First portal effect
      isMobile ? 0.93 : 0.93, // normal during Identify - same on mobile
      isMobile ? 0.4 : 0.4,  // close portal - more dramatic squeeze
      isMobile ? 0.93 : 0.93, // open portal back to normal (start of Educate) - same on mobile
      // Second portal effect
      isMobile ? 0.93 : 0.93, // normal during Educate - same on mobile
      isMobile ? 0.4 : 0.4,  // close portal - more dramatic squeeze
      isMobile ? 0.93 : 0.93, // open portal back to normal (start of Develop) - same on mobile
      // Third portal effect
      isMobile ? 0.93 : 0.93, // normal during Develop - same on mobile
      isMobile ? 0.4 : 0.4,  // close portal - more dramatic squeeze
      isMobile ? 1 : 1,    // open portal back to final size - same on mobile
    ]
  );

  // Combine portal scale with final expansion
  const orbScaleX = useTransform(
    [portalScale, orbFinalScale],
    (latest: number[]) => latest[0] * latest[1]
  );
  const orbScaleY = useTransform(
    [portalScale, orbFinalScale],
    (latest: number[]) => latest[0] * latest[1]
  );

  // Add rotation during transitions
  const portalRotate = useTransform(
    scrollYProgress,
    [
      transitionPoint1 - pulseDuration,
      transitionPoint1 + pulseDuration,
      transitionPoint2 - pulseDuration,
      transitionPoint2 + pulseDuration,
      transitionPoint3 - pulseDuration,
      transitionPoint3 + pulseDuration,
    ],
    [0, 45, 45, 90, 90, 135]
  );

  // Orb initial Y position for mobile reveal animation
  const orbInitialY = useTransform(
    scrollYProgress,
    [0, 0.2],
    isMobile ? ['50%', '0%'] : ['0%', '0%']
  );

  // Initial text animation - fixed to ensure visibility
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2], ['0%', '-100%']);

  // Final elements container opacity
  const navOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.8, 0.85], [0, 1, 1, 0]);

  const identifySectionOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.35, 0.4],
    [0, 1, 1, 0]
  );
  
  // Educate section opacity and animations
  const educateSectionOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.55, 0.6],
    [0, 1, 1, 0]
  );
  const educatePointerEvents = useTransform(educateSectionOpacity, (v) => (v > 0 ? 'auto' : 'none'));
  
  // Sideways animation for the two orbs in educate section
  const leftOrbX = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [-350, isMobile ? -50 : -150] // Closer to center on desktop, original on mobile
  );
  
  const rightOrbX = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [350, isMobile ? 50 : 150] // Closer to center on desktop, original on mobile
  );
  
  const orbsY = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [0, isMobile ? -80 : 0] // Move orbs down on desktop, original on mobile
  );
  
  // Develop section opacity and animations
  const developSectionOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  const developPointerEvents = useTransform(developSectionOpacity, (v) => (v > 0 ? 'auto' : 'none'));
  
  // Amazing incoming and outgoing animation for the three orbs in develop section
  const developLeftOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    [-400, isMobile ? -100 : -350, isMobile ? -80 : -280, -400]
  );
  const developMiddleOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    [0, 0, 0, 0]
  );
  const developRightOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    [400, isMobile ? 100 : 350, isMobile ? 80 : 280, 400]
  );

  const developLeftOrbY = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    isMobile ? [200, -80, -80, 200] : [0, 0, 0, 0] // Original on mobile, centered on desktop
  );
  const developMiddleOrbY = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    isMobile ? [200, -80, -80, 200] : [0, 0, 0, 0] // Original on mobile, centered on desktop
  );
  const developRightOrbY = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    isMobile ? [200, -80, -80, 200] : [0, 0, 0, 0] // Original on mobile, centered on desktop
  );

  const finalElementsOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.2],
    [0, 1]
  );

  // Solutions animation - reduced scrolling
  const solutionsOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.81],
    [0, 1]
  );
  const solutionsScale = useTransform(
    scrollYProgress,
    [0.8, 0.81],
    [0.8, 1]
  );

  const solutionsPointerEvents = useTransform(
    scrollYProgress,
    [0.799, 0.8],
    ['none', 'auto']
  );

  return (
    <section
      id="about"
      ref={targetRef}
      className="relative h-[500vh] md:h-[600vh] lg:h-[600vh] w-full"
      style={{ background: '#02010C', contain: 'paint layout' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden gpu-accelerated" style={{ willChange: 'transform', contain: 'paint layout' }}>
        {/* Initial Text */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center text-white pointer-events-none"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center px-4">
            From idea to impact, Your <span className="text-purple-400 font-semibold">AI<br/>journey </span>
            starts here
          </h2>
        </motion.div>

        {/* Orb - optimized for hover and mobile */}
        <motion.div
          style={{
            scaleX: orbScaleX,
            scaleY: orbScaleY,
            rotate: portalRotate, // Apply rotation
            y: orbInitialY, // Animate Y position for mobile reveal
            opacity: orbFinalOpacity,
            willChange: 'transform, opacity',
            contain: 'layout paint size',
            zIndex: 10 // Ensure consistent z-index
          }}
          className="absolute inset-0 flex items-center justify-center scale-100 bg-[#02010C] pointer-events-auto orb-container"
          initial={false}
        >
          <div className="w-full h-full pointer-events-auto">
            {isMobile ? (
              <img 
                src="/mobile-identify-orb.png" 
                alt="Identify Orb"
                className="orb-image"
              />
            ) : (
              <Orb 
                interactive={true} 
                hoverIntensity={0.3} 
                rotateOnHover={true} 
                forceHoverState={false}
              />
            )}
          </div>
        </motion.div>

        {/* Identify Section Content */}
        <motion.div 
          style={{ 
            opacity: identifySectionOpacity,
            zIndex: 20 // Ensure consistent z-index
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
        </motion.div>
        
        {/* Educate Section with single orb image for mobile */}
        <motion.div
          style={{
            opacity: educateSectionOpacity,
            pointerEvents: educatePointerEvents,
            zIndex: 20 // Ensure consistent z-index
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          initial={false}
          layoutId="educate-section"
        >
          <div 
            className="relative w-full h-64 flex items-center justify-center"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('educate-hover-start'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('educate-hover-end'))}
          >
            {/* Mobile: Single centered orb image */}
            {isMobile ? (
              <motion.div 
                className="absolute w-80 h-80"
                style={{ 
                  y: orbsY,
                  scale: 1,
                  willChange: 'transform',
                  contain: 'strict',
                  backfaceVisibility: 'hidden',
                  pointerEvents: educatePointerEvents
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="/mobile-educate-orb.png" 
                  alt="Educate Orb"
                  className="orb-image"
                />
              </motion.div>
            ) : (
              <>
                {/* Left Orb - desktop only */}
                <motion.div 
                  className="absolute w-80 h-80"
                  style={{ 
                    x: leftOrbX,
                    y: orbsY,
                    scale: 1.6,
                    willChange: 'transform',
                    contain: 'strict',
                    backfaceVisibility: 'hidden',
                    pointerEvents: educatePointerEvents
                  }}
                  initial={false}
                  layoutId="left-orb"
                >
                  <Orb 
                    interactive={false} 
                    hoverIntensity={0.15} 
                    rotateOnHover={true}
                    syncId="educate"
                    hue={-100} // Blue-purple hue
                  />
                </motion.div>
                
                {/* Right Orb - desktop only */}
                <motion.div 
                  className="absolute w-80 h-80"
                  style={{ 
                    x: rightOrbX,
                    y: orbsY,
                    scale: 1.6,
                    willChange: 'transform',
                    contain: 'strict',
                    backfaceVisibility: 'hidden',
                    pointerEvents: educatePointerEvents
                  }}
                  initial={false}
                  layoutId="right-orb"
                >
                  <Orb 
                    interactive={false} 
                    hoverIntensity={0.15} 
                    rotateOnHover={true}
                    syncId="educate"
                    hue={-100} // Purple-pink hue
                  />
                </motion.div>
              </>
            )}
            
            {/* Educate heading in the intersection of orbs */}
            <div className={`absolute z-50 ${isMobile ? 'top-1/2 translate-y-12' : '-translate-y-0'}`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
                Educate
              </h2>
            </div>
            
            {/* Description for Educate section - right side on desktop, centered on mobile */}
            <div className={`absolute z-50 ${isMobile ? 'top-1/2 translate-y-24 left-1/2 -translate-x-1/2 w-[85%] text-center' : 'right-16 top-1/2 -translate-y-1/2 w-64 text-right'}`}>
              <p className="text-white text-base pointer-events-none">
                We train and support your team with the right tools and know-how to embed AI across your entire organization.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Develop Section with single orb image for mobile */}
        <motion.div
          style={{
            opacity: developSectionOpacity,
            pointerEvents: developPointerEvents,
            zIndex: 20 // Ensure consistent z-index
          }}
          className="absolute inset-0 z-25 flex flex-col items-center justify-center"
          initial={false}
          layoutId="develop-section"
        >
          <div 
            className="relative w-full h-64 flex items-center justify-center"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('develop-hover-start'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('develop-hover-end'))}
          >
            {/* Mobile: Single centered orb image */}
            {isMobile ? (
              <motion.div 
                className="absolute w-80 h-80"
                style={{
                  y: developMiddleOrbY,
                  scale: 1,
                  willChange: 'transform',
                  contain: 'strict',
                  backfaceVisibility: 'hidden',
                  pointerEvents: developPointerEvents
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="/mobile-develop-orb.png" 
                  alt="Develop Orb"
                  className="orb-image"
                />
              </motion.div>
            ) : (
              <>
                {/* Left Orb - desktop only */}
                <motion.div 
                  className="absolute w-80 h-80"
                  style={{
                    x: developLeftOrbX,
                    y: developLeftOrbY,
                    scale: 1.3,
                    willChange: 'transform',
                    contain: 'strict',
                    backfaceVisibility: 'hidden',
                    pointerEvents: developPointerEvents
                  }}
                  initial={false}
                  layoutId="develop-left-orb"
                >
                  <Orb 
                    interactive={false} 
                    hoverIntensity={0.1} 
                    rotateOnHover={true}
                    syncId="develop"
                    hue={-20} // Green-yellow hue
                  />
                </motion.div>
                
                {/* Middle Orb - desktop only */}
                <motion.div 
                  className="absolute w-80 h-80"
                  style={{
                    x: developMiddleOrbX,
                    y: developMiddleOrbY,
                    scale: 1.6,
                    willChange: 'transform',
                    contain: 'strict',
                    backfaceVisibility: 'hidden',
                    pointerEvents: developPointerEvents
                  }}
                  initial={false}
                  layoutId="develop-middle-orb"
                >
                  <Orb 
                    interactive={false} 
                    hoverIntensity={0.1} 
                    rotateOnHover={true}
                    syncId="develop"
                    hue={-40} // Yellow-orange hue
                  />
                </motion.div>
                
                {/* Right Orb - desktop only */}
                <motion.div 
                  className="absolute w-80 h-80"
                  style={{
                    x: developRightOrbX,
                    y: developRightOrbY,
                    scale: 1.3,
                    willChange: 'transform',
                    contain: 'strict',
                    backfaceVisibility: 'hidden',
                    pointerEvents: developPointerEvents
                  }}
                  initial={false}
                  layoutId="develop-right-orb"
                >
                  <Orb 
                    interactive={false} 
                    hoverIntensity={0.2} 
                    rotateOnHover={true}
                    syncId="develop"
                    hue={-60} // Orange-red hue
                  />
                </motion.div>
              </>
            )}
            
            {/* Develop heading below the orbs */}
            <div className={`absolute z-50 ${isMobile ? 'top-1/2 translate-y-12' : 'top-1/2 -translate-y-1/2'}`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
                Develop
              </h2>
            </div>
            
            {/* Description below the orbs */}
            <div className={`absolute z-50 ${isMobile ? 'top-1/2 translate-y-24 left-1/2 -translate-x-1/2 w-[85%] text-center' : 'top-1/2 translate-y-55 left-1/2 -translate-x-1/2 w-96 text-center'}`}>
              <p className="text-white text-base pointer-events-none">
                We design, build, and scale custom AI solutions that solve your most pressing business needs and create a lasting competitive advantage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Content */}
        {/* Only show the Identify section content, not Educate */}
        <motion.div
          style={{ 
            opacity: finalElementsOpacity,
            pointerEvents: 'none'
          }}
          className="absolute inset-0 z-30"
        >
          {/* Left side navigation - vertical on desktop, horizontal on mobile */}
          <motion.div style={{ opacity: navOpacity }} className="absolute top-1/2 -translate-y-1/2 left-16 hidden md:flex flex-col space-y-8 text-sm md:text-lg text-white">
            {content.map((item, index) => (
              <NavItem
                key={item.title}
                scrollYProgress={scrollYProgress}
                index={index}
                title={item.title}
              />
            ))}
          </motion.div>
          
          {/* Mobile navigation - horizontal */}
          <motion.div style={{ opacity: navOpacity }} className="absolute top-16 left-0 right-0 mx-auto flex md:hidden w-fit space-x-4 text-sm text-white">
            {content.map((item, index) => (
              <NavItem
                key={item.title}
                scrollYProgress={scrollYProgress}
                index={index}
                title={item.title}
              />
            ))}
          </motion.div>

          {/* Centered text and bottom-right text container - only for Identify */}
          <div className="absolute inset-0 pointer-events-none">
            {content.filter(item => item.title === 'Identify').map((item) => (
              <ContentAnimation
                key={item.title}
                scrollYProgress={scrollYProgress}
                index={0} // Force index to 0 for Identify
                item={item}
              />
            ))}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          id="solutions"
          style={{
            opacity: solutionsOpacity,
            scale: solutionsScale,
            pointerEvents: solutionsPointerEvents
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#02010C]"
        >
          <div className="w-full flex flex-col items-center justify-center flex-grow">
            <div className="text-center mt-8 sm:mt-12 lg:mb-10">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-regular text-white px-4">
              <span className="text-purple-400 text-center">AI Agents</span> that talk, type, and turn 
              </h2>
              <h3 className="text-3xl mt-3 sm:text-3xl md:text-4xl lg:text-5xl font-regular text-center text-white px-4">
              conversations into conversions
              </h3>
            </div>
            <div className="embla w-full max-w-7xl px-4 sm:px-6 md:px-10 relative">
              <div className="embla__viewport solutions-carousel-viewport" ref={emblaRef}>
                <div className="embla__container">
                  {solutionsData.map((solution, i) => (
                    <div className="embla__slide" key={i}>
                      <ProfileCard
                        name={solution.name}
                        industry={solution.industry}
                        description={solution.description}
                        image={solution.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Navigation Buttons */}
              <button onClick={scrollPrev} className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 z-50 p-2 sm:p-3 bg-black/40 rounded-full hover:bg-black/70 transition-colors border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button onClick={scrollNext} className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 z-50 p-2 sm:p-3 bg-black/40 rounded-full hover:bg-black/70 transition-colors border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrbSection;