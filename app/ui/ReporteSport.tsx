'use client';

import { useState, useEffect, FormEvent } from 'react';

export default function Reporte() {
  const [sports, setSports] = useState<{ sportName: string, participants: number[], maxParticipants: number }[]>([]);
  const [students, setStudents] = useState<{ firstName: string, lastName: string ,posicion:string }[]>([]); // Almacena los usuarios sin idNumber
  const [selectedSport, setSelectedSport] = useState('');
  const [participants, setParticipants] = useState<{ firstName: string, lastName: string }[]>([]); // Lista de participantes con datos completos

  // Cargar datos desde localStorage
  useEffect(() => {
    const storedSports = JSON.parse(localStorage.getItem('sports') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); // Cargar estudiantes desde localStorage
    setSports(storedSports);
    setStudents(storedUsers); // Establecer los estudiantes en el estado

    console.log('Deportes cargados:', storedSports); // Depuración
    console.log('Estudiantes cargados:', storedUsers); // Depuración
  }, []);

  // Manejar envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const sport = sports.find(s => s.sportName === selectedSport);
    console.log('Deporte seleccionado:', sport); // Depuración

    if (sport && sport.participants) {
      // Obtener participantes usando la posición (índice) de los estudiantes
      const enrolledStudents = sport.participants
        .map(index => students[index]) // Usar el índice para acceder a los estudiantes
        .filter(Boolean) as { firstName: string, lastName: string , posicion:string}[]; // Filtrar los estudiantes encontrados

      console.log('Estudiantes inscritos:', enrolledStudents); // Depuración
      setParticipants(enrolledStudents); // Establecer los estudiantes participantes
    } else {
      setParticipants([]); // Si no hay participantes, limpiar la lista
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Ver Participantes en los Deportes</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Seleccionar Deporte</label>
            <select
              name="sport"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione un deporte</option>
              {sports.map((sport, index) => (
                <option key={index} value={sport.sportName}>
                  {sport.sportName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Comprobar
          </button>
        </form>

        {/* Mostrar directamente la variable participants */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Participantes (Datos Crudos)</h3>
          <pre className="text-gray-800">{JSON.stringify(participants, null, 2)}</pre>
        </div>

        {participants.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Participantes</h3>
            <ul className="list-disc pl-5">
              {participants.map((student, index) => (
                <li key={index} className="text-gray-800">
                  {student.firstName} {student.lastName} {/* Mostrar nombre completo */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedSport && participants.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No hay participantes inscritos en este deporte.</p>
        )}
      </div>
    </div>
  );
}
