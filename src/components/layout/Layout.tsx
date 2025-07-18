import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '../../lib/utils';
import Footer from '../ui/footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={cn(
      "min-h-screen bg-background",
      state.language === 'ar' ? 'rtl' : 'ltr'
    )}>
      <div className="flex h-[93.4vh]">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header onMenuClick={handleSidebarToggle} />
          
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
};