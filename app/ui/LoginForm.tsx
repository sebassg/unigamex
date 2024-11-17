'use client';

import { useState, FormEvent } from 'react';
import bcrypt from 'bcryptjs';  
import jwt from 'jwt-simple';  
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');  

    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      setError('No hay usuarios registrados');
      return;
    }

    const users = JSON.parse(storedUsers);
    const user = users.find((user: { email: string }) => user.email === formData.email);

    if (!user) {
      setError('Usuario no encontrado');
      return;
    }

  
    const isPasswordValid = await bcrypt.compare(formData.password, user.password);
    if (!isPasswordValid) {
      setError('Contraseña incorrecta');
      return;
    }

    
    const payload = { email: user.email, id: user.idNumber };  
    const secret = 'sasa"#$%&/(/&%$#"#$%&/()(/&%$#"#$%&/(duwidnj&%$#"#$%&/(dwbdh"#$%&chye#$%&/hcey#$%&/cbg#$%&/bce';  
    const token = jwt.encode(payload, secret);  
    
    localStorage.setItem('authToken', token);

    console.log('Inicio de sesión exitoso');
    router.push('/auth/home'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
