import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthHero } from './AuthHero';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div 
      className={`min-h-screen flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Left side - Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right side - Hero */}
      <AuthHero />
    </div>
  );
};