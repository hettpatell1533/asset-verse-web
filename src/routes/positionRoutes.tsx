
import PositionForm from '@/pages/Position/PositionForm';
import {  PositionList } from '@/pages/Position/PositionList';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const PositionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PositionList />} />
      <Route path="add" element={<PositionForm />} />
      <Route path="edit/:id" element={<PositionForm />} />
    </Routes>
  );
};

export default PositionRoutes;
