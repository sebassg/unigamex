'use client';
import { useState, FormEvent } from 'react';
import { sportSchema } from '../schemas/sportSchema';
import { z } from 'zod';

type Errors = {
  sportName?: string;
  category?: string;
  maxParticipants?: string;
  status?: string;
};

export default function RegisterSportForm() {
  const [formData, setFormData] = useState({
    sportName: '',
    category: 'Individual',
    maxParticipants: 2,
    status: 'Activo',
    participants: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    const storedSports = typeof window !== 'undefined' ? localStorage.getItem('sports') : null;
    const sports = storedSports ? JSON.parse(storedSports) : [];

    const existingSport = sports.find((sport: { sportName: string }) => sport.sportName.toLowerCase() === formData.sportName.toLowerCase());
    if (existingSport) {
      setErrors((prevErrors: Errors) => ({
        ...prevErrors,
        sportName: 'Ya existe un deporte con ese nombre',
      }));
      return;
    }

    try {
      sportSchema.parse(formData);

      sports.push(formData);
      localStorage.setItem('sports', JSON.stringify(sports));

      setFormData({
        sportName: '',
        category: 'Individual',
        maxParticipants: 2,
        status: 'Activo',
        participants: [],
      });

      setIsSuccess(true); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Errors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof Errors;
          formattedErrors[field] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'maxParticipants' ? Number(value) : value,
    }));
  };

  const closeSuccessMessage = () => {
    setIsSuccess(false);
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registrar Deporte</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sportName" className="block text-sm font-medium text-gray-700">Nombre del Deporte</label>
          <input 
            type="text" 
            name="sportName" 
            value={formData.sportName}
            onChange={handleChange} 
            placeholder="Ingresa el nombre del deporte"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.sportName && <p className="text-red-500 text-xs mt-1">{errors.sportName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Individual">Individual</option>
            <option value="En equipo">En equipo</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Número máximo de participantes</label>
          <input 
            type="number" 
            name="maxParticipants" 
            value={formData.maxParticipants}
            onChange={handleChange} 
            placeholder="Número máximo de participantes"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.maxParticipants && <p className="text-red-500 text-xs mt-1">{errors.maxParticipants}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Registrar
        </button>
      </form>

      {isSuccess && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-green-600 font-medium">¡Deporte registrado exitosamente!</p>
            <button
              onClick={closeSuccessMessage}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
