import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white h-screen p-5 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-200">
          UniGameX
        </h2>
        <ul>
        <li className="mb-4">
            <Link href="/auth/requisitos-inscripcion" className="text-gray-300 hover:text-white">
              Requisitos de inscripcion
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/auth/home" className="text-gray-300 hover:text-white">
              Deportes
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/auth/student" className="text-gray-300 hover:text-white">
              Estudiantes
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/auth/sport" className="text-gray-300 hover:text-white">
              Registrarse a un deporte 
            </Link>
          </li>

          <li className="mb-4">
            <Link href="/auth/reporte-sport" className="text-gray-300 hover:text-white">
              Reporten
            </Link>
          </li>
          
          
          
          
        </ul>

        <div className="mt-auto flex justify-center">
          <Link href="/auth/logout" className="text-gray-300 hover:text-white">
            Cerrar sesión
          </Link>
        </div>
      </div>

      <div className="flex-1 p-8"></div>
    </div>
  );
};

export default Sidebar;
