import React from 'react';
import { useTranslation } from 'react-i18next';

export const AuthLogo: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3">
        {/* Logo Icon */}
        <div className="relative">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm opacity-90" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/60 rounded-full" />
        </div>

        {/* Logo Text */}
        <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-2xl font-bold text-foreground">
            MAHER {isRTL && 'ماهر'}
          </div>
          <div className="text-sm text-muted-foreground">
            {isRTL ? 'نظام إدارة الأصول' : 'Asset Management System'}
          </div>
        </div>
      </div>
    </div>
  );
};