'use client';

import { useEffect, useState } from 'react';
import RegisterSportForm from '@/app/ui/RegisterSportForm';

type Sport = {
  sportName: string;
  category: string;
  maxParticipants: number;
  status: string;
};

export default function SportsList() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedSports = typeof window !== 'undefined' ? localStorage.getItem('sports') : null;
    if (storedSports) {
      const parsedSports: Sport[] = JSON.parse(storedSports);
      const activeSports = parsedSports.filter((sport) => sport.status === 'Activo');
      setSports(activeSports);
    }
  }, []);

  const handleAddSportClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    // Actualiza la lista de deportes después de registrar uno nuevo
    const storedSports = typeof window !== 'undefined' ? localStorage.getItem('sports') : null;
    if (storedSports) {
      const parsedSports: Sport[] = JSON.parse(storedSports);
      const activeSports = parsedSports.filter((sport) => sport.status === 'Activo');
      setSports(activeSports);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Deportes Activos</h1>
        <button
          onClick={handleAddSportClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Agregar Deporte
        </button>
      </div>

      {showForm ? (
        <>
          <RegisterSportForm />
          <button
            onClick={handleFormClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
            Cerrar
          </button>
       
              </>
      ) : (
        <>
          {sports.length === 0 ? (
            <p className="text-gray-600 text-lg">No hay deportes activos en este momento.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              {sports.map((sport, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {sport.sportName}
                  </h2>
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
        </>
      )}
    </div>
  );
}
