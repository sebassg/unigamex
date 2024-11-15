'use client';
import { useState, FormEvent } from 'react';
import { registrationSchema, FormData } from '../../schemas/registrationSchemas';
import InputField from './InputField';
import FormError from './FormError';
import { z } from 'zod';
import bcrypt from 'bcryptjs'; 

type FormErrors = {
  [key: string]: string | undefined;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
    career: '',
    birthDate: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [idError, setIdError] = useState<string>(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      
      registrationSchema.parse(formData);
      setErrors({});
      
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      
      const existingUser = users.find((user: { idNumber: string }) => user.idNumber === formData.idNumber);
      if (existingUser) {
        setIdError('Ya existe un usuario con ese número de identificación');
        setIsModalOpen(true); 
        return; 
      }

      
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const newUser = { 
        ...formData, 
        password: hashedPassword, 
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      console.log('Formulario enviado con éxito:', formData);
      setIdError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setIdError(''); 
  };

  return (
   
      <div className="bg-white p-6 py-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-0">Registro</h2>
        
        <form onSubmit={handleSubmit}>
          <InputField 
            label="Nombres"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="Ingrese su nombre"
          />

          <InputField 
            label="Apellidos"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Ingrese su apellido"
          />

          <InputField 
            label="Correo Electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Ingrese su correo electrónico"
          />

          <InputField 
            label="Número de Identificación"
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            error={errors.idNumber}
            placeholder="Ingrese su número de identificación"
          />

          <InputField 
            label="Carrera Académica"
            type="text"
            name="career"
            value={formData.career}
            onChange={handleChange}
            error={errors.career}
            placeholder="Ingrese su carrera"
          />

          <div className="mb-2">
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.birthDate && <FormError errorMessage={errors.birthDate} />}
          </div>

          <InputField 
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Ingrese su contraseña"
          />

          <button
            type="submit"
            className="w-full py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Registrar
          </button>
        </form>
      

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold text-center text-red-500">Error</h3>
            <p className="mt-2 text-center text-gray-700">{idError}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
