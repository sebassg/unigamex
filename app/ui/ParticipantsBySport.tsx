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
  

  useEffect(() => {
    const storedSports = localStorage.getItem('sports');
    const storedUsers = localStorage.getItem('users');

    if (storedSports && storedUsers) {
      const sportsData: Sport[] = JSON.parse(storedSports);
      const usersData: User[] = JSON.parse(storedUsers);

      setSports(sportsData);

      if (sportsData.length > 0) {
        const initialSport = sportsData[0];
        setSelectedSport(initialSport);

        const enrolledUsers = usersData.filter((user) =>
          initialSport.participants.includes(Number(user.idNumber))
        );

        setParticipants(enrolledUsers);
      }
    }
  }, []);

  const handleSportChange = (sportName: string) => {
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

 
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl mt-8 font-bold text-gray-800 mb-4">
        Reporte de Estudiantes por Deporte
      </h1>

      {sports.length > 0 ? (
        <>
          <div className="mb-6">
            <label htmlFor="sportSelect" className="text-gray-700 font-medium">
              Seleccionar deporte:
            </label>
            <select
              id="sportSelect"
              className="ml-2 p-2 w-[20rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleSportChange(e.target.value)}
            >
              {sports.map((sport) => (
                <option key={sport.sportName} value={sport.sportName}>
                  {sport.sportName}
                </option>
              ))}
            </select>
          </div>

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
