'use client';
import { useState, useEffect } from 'react';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  career: string;
  idNumber: string;
  birthDate: string;
};

type Sport = {
  sportName: string;
  category: string;
  maxParticipants: number;
  status: string;
  participants: number[];
};

export default function ParticipantsBySport() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'category'>('all');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    const storedSports = localStorage.getItem('sports');
    const storedUsers = localStorage.getItem('users');

    if (storedSports && storedUsers) {
      const sportsData: Sport[] = JSON.parse(storedSports);
     
      setSports(sportsData);
    }
  }, []);

  const handleSportChange = (sportName: string) => {
    if (sportName === "") {
      setSelectedSport(null);
      setParticipants([]);
      return;
    }

    const sport = sports.find((s) => s.sportName === sportName);
    if (sport) {
      setSelectedSport(sport);

      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const enrolledUsers = users.filter((user) =>
          sport.participants.includes(Number(user.idNumber))
        );

        setParticipants(enrolledUsers);
      }
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'category') => {
    setFilter(newFilter);
    setSelectedSport(null);
    setParticipants([]);
    setCategory('');
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSelectedSport(null);
    setParticipants([]);
  };

  const filteredSports = filter === 'all' ? sports : sports.filter(sport => sport.category === category);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl mt-8 font-bold text-gray-800 mb-4">
        Reporte de Estudiantes por Deporte
      </h1>

      {sports.length > 0 ? (
        <>
          <div className="mb-6 flex items-center">
            <label htmlFor="sportSelect" className="text-gray-700 font-medium mr-4">
              Seleccionar deporte:
            </label>
            <select
              id="sportSelect"
              className="ml-2 p-2 w-[20rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSport ? selectedSport.sportName : ""}
              onChange={(e) => handleSportChange(e.target.value)}
            >
              <option value="">--Seleccione un Deporte--</option>
              {filteredSports.map((sport) => (
                <option key={sport.sportName} value={sport.sportName}>
                  {sport.sportName}
                </option>
              ))}
            </select>

            <div className="ml-6 flex items-center">
              <label className="text-gray-700 font-medium mr-4">Filtrar por:</label>
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="all"
                  name="filter"
                  value="all"
                  checked={filter === 'all'}
                  onChange={() => handleFilterChange('all')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="all" className="ml-2 text-gray-700">Todos</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="category"
                  name="filter"
                  value="category"
                  checked={filter === 'category'}
                  onChange={() => handleFilterChange('category')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <label htmlFor="category" className="ml-2 text-gray-700">Categoría</label>
              </div>
            </div>
          </div>

          {filter === 'category' && (
            <div className="mb-6 flex items-center">
              <label className="text-gray-700 font-medium mr-4">Categoría:</label>
              <select
                className="ml-2 p-2 w-[20rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">--Seleccione una Categoría--</option>
                <option value="Individual">Individual</option>
                <option value="En equipo">En equipo</option>
              </select>
            </div>
          )}

          {selectedSport && participants.length > 0 ? (
            <table className="table-auto border-collapse mt-8 border border-gray-200 w-full max-w-4xl bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left">Nombre</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Documento</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Correo</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Carrera</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.idNumber} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {participant.firstName} {participant.lastName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{participant.idNumber}</td>
                    <td className="border border-gray-200 px-4 py-2">{participant.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{participant.career}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No hay participantes inscritos en este deporte.</p>
          )}
        </>
      ) : (
        <p className="text-gray-600">No hay deportes disponibles.</p>
      )}
    </div>
  );
}
