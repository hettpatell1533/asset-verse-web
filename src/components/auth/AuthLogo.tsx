import React from 'react';
import { useTranslation } from 'react-i18next';

export const AuthLogo: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="mb-8 flex justify-center">
      <img
        src="/images/ASMLogo.png"
        alt="Logo"
        className="max-w-[52%]"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      />
    </div>
  );
};