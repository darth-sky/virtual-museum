import React from 'react';
import CandiKiri from './CandiKiri';
import CandiKanan from './CandiKanan';

export default function CandiBentar2D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-between items-end opacity-85">
      {/* Sisi Candi paling kiri menempel di pojok */}
      <CandiKiri />

      {/* Sisi Candi paling kanan menempel di pojok */}
      <CandiKanan />
    </div>
  );
}