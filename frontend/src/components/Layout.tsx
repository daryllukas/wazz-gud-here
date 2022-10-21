import React from 'react';
import { useModalContext } from '../context/Modal';
import { AboutModal } from './AboutModal';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { aboutModalVisible } = useModalContext();
  return (
    <>
      <div className="grid min-h-screen grid-rows-[64px_1fr_auto]">
        <Header />
        <main className="bg-primary py-8 px-2 lg:px-0">{children}</main>
        <Footer />
      </div>
      {aboutModalVisible && <AboutModal />}
    </>
  );
};
