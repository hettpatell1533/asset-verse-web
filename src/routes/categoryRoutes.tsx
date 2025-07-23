import CategoryForm from '@/pages/Category/CategoryForm';
import { CategoryList } from '@/pages/Category/CategoryList';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const CategoryRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="add" element={<CategoryForm />} />
      <Route path="edit/:id" element={<CategoryForm />} />
    </Routes>
  );
};

export default CategoryRoutes;
