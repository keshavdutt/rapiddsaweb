"use client";


declare global {
  interface Window {
    dataLayer: any[];
  }
}

// app/page.js

import Head from 'next/head';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import MainContent from '@/components/MainContent';
import Script from 'next/script';
import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-44GXY4GR6D');
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Cache-control" content="no-cache" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="index, follow" />
        <meta name="googlebot-news" content="index, follow" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <title>Rapid DSA - Prepare for your next interview</title>
        <meta
          name="description"
          content="Rapid DSA helps your to prepare for your tech interview in a planned and fast paced manner."
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/styles.css" />

      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-44GXY4GR6D"
        strategy="afterInteractive"
      />

      <body>
        <Header />
        <Nav />
        <div className="margin_top">
          <MainContent />
        </div>
      </body>
    </>
  );
}
