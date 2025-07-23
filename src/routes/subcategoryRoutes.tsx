import SubCatgeoryForm from '@/pages/SubCategory/SubCategoryForm';
import { SubCategoryList } from '@/pages/SubCategory/SubCategoryList';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const SubCategoryRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SubCategoryList />} />
      <Route path="add" element={<SubCatgeoryForm />} />
      <Route path="edit/:id" element={<SubCatgeoryForm />} />
    </Routes>
  );
};

export default SubCategoryRoutes;
