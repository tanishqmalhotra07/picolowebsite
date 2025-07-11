'use client'; 
import type { Metadata } from 'next';
import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContactFormProvider } from '@/context/ContactFormContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Picolo AI',
  description: 'Supercharge Your Workflow with AI Precision.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	
	const CHATBOT_API_URL_FULL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  const CHATBOT_BASE_URL = CHATBOT_API_URL_FULL
                            ? CHATBOT_API_URL_FULL.replace('/chat', '')
                            : undefined;

  // Effect to ping the backend on component mount (page load)
  useEffect(() => {
    // Only attempt to ping if the base URL is available
    if (CHATBOT_BASE_URL) {
      console.log('Pinging chatbot backend to prevent cold start:', CHATBOT_BASE_URL);
      fetch(CHATBOT_BASE_URL) // Ping the root URL, not /chat
        .then(response => {
          if (response.ok) {
            console.log('Chatbot backend ping successful.');
          } else {
            console.error('Chatbot backend ping failed:', response.status, response.statusText);
          }
        })
        .catch(error => {
          console.error('Error during chatbot backend ping:', error);
        });
    } else {
      console.warn('NEXT_PUBLIC_CHATBOT_API_URL not set, skipping backend ping on page load.');
    }
  }, []);
  
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <StyledComponentsRegistry>
          <ContactFormProvider>
            <Header />
            <SmoothScrolling>{children}</SmoothScrolling>
            <Footer />
          </ContactFormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
