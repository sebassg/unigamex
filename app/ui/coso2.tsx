
'use client';
import { useState, FormEvent } from 'react';

export default function FormRegisterSportStudent() {
  const [formData, setFormData] = useState({
    student: '', 
    sport: '', // Agregado para almacenar el deporte seleccionado
  });

  const [errors, setErrors] = useState<{ student?: string; sport?: string }>({});

  // Cargar los usuarios desde el localStorage
  const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('users') : null;
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  // Cargar los deportes desde el localStorage
  const storedSports = typeof window !== 'undefined' ? localStorage.getItem('sports') : null;
  const sports = storedSports ? JSON.parse(storedSports) : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validación para asegurarse de que se seleccionaron un estudiante y un deporte
    if (!formData.student) {
      setErrors((prev) => ({ ...prev, student: 'Debe seleccionar un estudiante' }));
      return;
    }

    if (!formData.sport) {
      setErrors((prev) => ({ ...prev, sport: 'Debe seleccionar un deporte' }));
      return;
    }

    // Aquí puedes manejar la lógica para registrar al estudiante en el deporte seleccionado
    console.log('Estudiante:', formData.student);
    console.log('Deporte:', formData.sport);

    // Limpiar los campos después de enviar el formulario
    setFormData({
      student: '',
      sport: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Actualizar el campo correspondiente
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registrar Deporte</h2>

        <form onSubmit={handleSubmit}>
          {/* Select de estudiantes */}
          <div className="mb-4">
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">Seleccionar Estudiante</label>
            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione un estudiante</option>
              {users.map((user: { firstName: string; lastName: string; idNumber: string }) => (
                <option key={user.idNumber} value={user.idNumber}>
                  {user.firstName} {user.lastName} ({user.idNumber})
                </option>
              ))}
            </select>
            {errors.student && <p className="text-red-500 text-xs mt-1">{errors.student}</p>}
          </div>

          {/* Select de deporte */}
          <div className="mb-4">
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Seleccionar Deporte</label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione un deporte</option>
              {sports.map((sport: { name: string; id: string }) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
            {errors.sport && <p className="text-red-500 text-xs mt-1">{errors.sport}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
} 

