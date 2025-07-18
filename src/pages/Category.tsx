import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Category {
  id: string;
  name: string;
  category: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance' | 'repair';
  purchaseDate: string;
  serialNumber: string;
}

export const Category: React.FC = () => {
  

  return (
    <div className="space-y-6">
      {/* Page Header */}
        <h1>Category...</h1>
    </div>
  );
};