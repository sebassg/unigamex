'use client';

import { useEffect, useState } from 'react';
import RegisterUserForm from '@/app/ui/register/RegisterForm'; // Asegúrate de tener este componente

type User = {
  firstName: string;
  lastName: string;
  birthDate: string; // Formato ISO: "YYYY-MM-DD"
  career: string;
  email: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('users') : null;
    if (storedUsers) {
      const parsedUsers: User[] = JSON.parse(storedUsers);
      setUsers(parsedUsers);
    }
  }, []);

  const handleAddUserClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    // Actualiza la lista de usuarios después de registrar uno nuevo
    const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('users') : null;
    if (storedUsers) {
      const parsedUsers: User[] = JSON.parse(storedUsers);
      setUsers(parsedUsers);
    }
  };

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Usuarios Registrados</h1>
        <button
          onClick={handleAddUserClick}
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
          Agregar Usuario
        </button>
      </div>

      {showForm ? (
        <>
          <RegisterUserForm />
          <button
            onClick={handleFormClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Cerrar
          </button>
        </>
      ) : (
        <>
          {users.length === 0 ? (
            <p className="text-gray-600 text-lg">No hay usuarios registrados en este momento.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                  style={{ height: '220px' }} // Tamaño fijo para que se vean más grandes
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Carrera:</strong> {user.career}
                  </p>
                  <p className="text-gray-700">
                    <strong>Edad:</strong> {calculateAge(user.birthDate)} años
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
