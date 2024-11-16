'use client';
import { useState, useEffect, FormEvent } from 'react';

export default function FormRegisterSportStudent() {
  const [formData, setFormData] = useState({
    student: '',
    sport: ''
  });

  const [errors, setErrors] = useState<{ student?: string; sport?: string }>({});

  const [students, setStudents] = useState<{ firstName: string, lastName: string, email: string, status: string, idNumber: number, career: string, birthDate: Date, password: string }[]>([]);
  const [sports, setSports] = useState<{ sportName: string, category: string, maxParticipants: number, status: string, participants: number[], sportId: string }[]>([]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Estado para modal de éxito

  useEffect(() => {
    const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('users') : null;
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const storedSports = JSON.parse(localStorage.getItem('sports') || '[]');
    
    setStudents(users);
    setSports(storedSports);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.student) {
      setErrors((prev) => ({ ...prev, student: 'Debe seleccionar un estudiante' }));
      return;
    }

    if (!formData.sport) {
      setErrors((prev) => ({ ...prev, sport: 'Debe seleccionar un deporte' }));
      return;
    }

    const selectedSport = sports.find(sport => sport.sportName === formData.sport);

    if (selectedSport) {
      if (selectedSport.participants.length >= selectedSport.maxParticipants) {
        setErrors((prev) => ({ ...prev, sport: 'El deporte ya está lleno' }));
        return;
      }

      if (selectedSport.participants.includes(Number(formData.student))) {
        setErrors((prev) => ({ ...prev, student: 'Este estudiante ya está inscrito en este deporte' }));
        return;
      }

      selectedSport.participants.push(Number(formData.student));

      const updatedSports = sports.map(sport => 
        sport.sportName === formData.sport ? selectedSport : sport
      );
      localStorage.setItem('sports', JSON.stringify(updatedSports));

      setFormData({ student: '', sport: '' });
      setIsSuccessModalOpen(true); // Mostrar modal de éxito
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Reset form or redirect if needed
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[35rem] ">
        <h2 className="text-2xl font-semibold text-center py-8 text-gray-800 mb-6">Inscribir Estudiante a un Deporte</h2>

        <form onSubmit={handleSubmit}>
          {/* Select de estudiantes */}
          <div className="mb-4">
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">Seleccionar Estudiante</label>
            <select
              name="student"
              value={formData.student}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
              <option value="">Seleccione un estudiante</option>
              {students.length > 0 ? (
                students.map((student) => (
                  <option key={student.idNumber} value={String(student.idNumber)}>
                    {student.firstName} {student.lastName} ({student.idNumber})
                  </option>
                ))
              ) : (
                <option disabled>No hay estudiantes disponibles</option>
              )}
            </select>
            {errors.student && <p className="text-red-500 text-xs mt-1">{errors.student}</p>}
          </div>

          {/* Select de deportes */}
          <div className="mb-4">
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Seleccionar Deporte</label>
            <select
              name="sport"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              className="w-full mt-2 mb-8 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
              <option value="">Seleccione un deporte</option>
              {sports.length > 0 ? (
                sports.map((sport, index) => (
                  <option key={index} value={sport.sportName}>
                    {sport.sportName} ({sport.participants?.length || 0}/{sport.maxParticipants} participantes)
                  </option>
                ))
              ) : (
                <option disabled>No hay deportes disponibles</option>
              )}
            </select>
            {errors.sport && <p className="text-red-500 text-xs mt-1">{errors.sport}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
            Inscribir
          </button>
        </form>
      </div>

      {/* Modal de éxito */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold text-center text-blue-500">¡Éxito!</h3>
            <p className="mt-2 text-center text-gray-700">Estudiante Registrado al deporte Correctamente</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeSuccessModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </>
  );
}
