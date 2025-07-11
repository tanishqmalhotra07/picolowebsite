'use client';

import React, { useRef } from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openForm } = useContactForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="contact"
        className="bg-[#02010C] text-white py-10 lg:mb-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-6">
          <motion.div className="text-left" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Ready to Power Up with AI?</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8">We&apos;d love to talk about how we can work together.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-8 mb-6 space-y-4 sm:space-y-0">
              <a href="mailto:picolo.ai.team@gmail.com" className="flex items-center hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative mr-3">
                  <Image src="/Circled Envelope.png" alt="Email" fill sizes="(max-width: 640px) 32px, 40px" className="object-contain" />
                </div>
                <span className="text-sm sm:text-base underline">picolo.ai.team@gmail.com</span>
              </a>
            </div>
            <hr className="border-gray-600 my-6" />
            <div className="flex justify-around items-center my-6 max-w-md">
              <a href="https://www.instagram.com/picolo.ai?igsh=MXhvYTRwb2JibmFmcA==" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <span className="font-semibold text-sm sm:text-base">Instagram:</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                  <Image src="/Instagram.png" alt="Instagram" fill sizes="(max-width: 640px) 32px, 40px" className="object-contain" />
                </div>
              </a>
              <a href="https://www.linkedin.com/company/picolo-ai-agents/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <span className="font-semibold text-sm sm:text-base">LinkedIn:</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                  <Image src="/LinkedIn.png" alt="LinkedIn" fill sizes="(max-width: 640px) 32px, 40px" className="object-contain" />
                </div>
              </a>
            </div>
            <hr className="border-gray-600 my-6" />
            <p className="text-sm sm:text-base md:text-lg">Fill out the form to chat with a <span className="text-blue-400">Picolo team</span> member about business needs and get your questions answered.</p>
          </motion.div>
          <motion.div className="flex justify-center md:justify-end items-center md:pr-8 mt-8 md:mt-0" variants={itemVariants}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8716EE] to-[#FF0033] rounded-full blur-lg"></div>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-0.5 bg-gradient-to-br from-[#8716EE] to-[#FF0033] transition-transform duration-300 ease-in-out group-hover:scale-95">
                <div className="w-full h-full bg-[#10001D] rounded-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative mb-3 sm:mb-4">
                    <Image src="/Contact.png" alt="Contact Icon" fill sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px" className="object-contain" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Got something to share? Hover here and let&apos;s chat</p>
                  <button 
                    onClick={openForm} 
                    className="bg-gray-300 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
                  >
                    Drop us a line!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <hr className="border-gray-700 mt-8" />
      </motion.section>

      
    </>
  );
};

export default Contact;
