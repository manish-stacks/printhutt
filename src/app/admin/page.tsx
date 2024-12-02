'use client';  

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/login');
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
