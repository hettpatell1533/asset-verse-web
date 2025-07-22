import React from 'react';
import { useTranslation } from 'react-i18next';

export const AuthLogo: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      <img src='../../../public/assets/asm-logo.png' className='w-48' width={464} height={238} alt="ASM" />
    </div>
  );
};