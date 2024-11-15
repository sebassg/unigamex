'use client';

import { useEffect, useState } from 'react';

type Sport = {
  sportName: string;
  category: string;
  maxParticipants: number;
  status: string;
};

export default function SportsList() {
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    // Obtener los deportes del localStorage al cargar el componente
    const storedSports = typeof window !== 'undefined' ? localStorage.getItem('sports') : null;
    if (storedSports) {
      const parsedSports: Sport[] = JSON.parse(storedSports);
      // Filtrar solo los deportes activos
      const activeSports = parsedSports.filter((sport) => sport.status === 'Activo');
      setSports(activeSports);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Deportes Activos</h1>
      
      {sports.length === 0 ? (
        <p className="text-gray-600 text-lg">No hay deportes activos en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {sports.map((sport, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{sport.sportName}</h2>
              <p className="text-gray-700">
                <strong>Categoría:</strong> {sport.category}
              </p>
              <p className="text-gray-700">
                <strong>Máximo de participantes:</strong> {sport.maxParticipants}
              </p>
              <p className="text-green-600 font-medium mt-2">Estado: {sport.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
