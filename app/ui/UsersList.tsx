'use client';

import { useEffect, useState } from 'react';
import RegisterUserForm from '@/app/ui/register/RegisterForm';

type User = {
  firstName: string;
  lastName: string;
  birthDate: string;
  career: string;
  email: string;
};

export default function   UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);

 
  useEffect(() => {
    const storedUsers = typeof window !== 'undefined' ? localStorage.getItem('users') : null;
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleAddUserClick = () => {
    setShowForm(true);
  };


  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age -= 1;
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
          
        </>
      ) : (
        <>
          {users.length === 0 ? (
            <div className="flex justify-center items-center w-full">
              <p className="text-gray-600 text-lg">No hay usuarios registrados en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                  style={{ height: '220px' }}
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
