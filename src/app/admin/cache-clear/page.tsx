"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';


const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const clearCache = async () => {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(cache => caches.delete(cache)));
        console.log('Cache cleared');
      } else {
        console.log('Cache API not supported');
      }
      router.back(); 
      return;
    };

    clearCache();
  }, [router]);

  return (
    <div>Clearing cache...</div>
  );
};

export default Page;