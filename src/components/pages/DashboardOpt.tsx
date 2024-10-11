// src/components/Dashboard.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import GridAtom from '../atoms/grid';

const DashboardOpt: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Obtener el parámetro "id" si está presente

  return (
    <GridAtom style={{zIndex: 9}}>
      <h1>Dashboard Page Opt</h1>
      {id ? (
        <p>Showing data for ID: {id}</p>
      ) : (
        <p>No ID provided. Showing default dashboard.</p>
      )}
    </GridAtom>
  );
};

export default DashboardOpt;
