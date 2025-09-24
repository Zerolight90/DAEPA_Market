import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const SharingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">나눔 페이지</h1>
        <p className="text-lg text-muted-foreground">나눔 물품을 찾아보거나 등록해보세요.</p>
      </main>
      <Footer />
    </div>
  );
};

export default SharingPage;