'use client';

import { useState } from 'react';

type ValidationCriteria = {
  isEnrolled: boolean;
  hasNoSanctions: boolean;
  minimumCredits: number;
};

export default function EnrollmentForm() {
  const [criteria, setCriteria] = useState<ValidationCriteria>({
    isEnrolled: false,
    hasNoSanctions: false,
    minimumCredits: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (field: keyof ValidationCriteria) => {
    setCriteria((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCriteria((prev) => ({ ...prev, minimumCredits: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    localStorage.setItem('validInscripcion', JSON.stringify(criteria));

    console.log('Criterios actualizados:', criteria);

    setShowModal(true);
  };

  return (
    <div >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Inscripción</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={criteria.isEnrolled}
                onChange={() => handleCheckboxChange('isEnrolled')}
              />
              <span className="ml-2 text-gray-700">Estar matriculado</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={criteria.hasNoSanctions}
                onChange={() => handleCheckboxChange('hasNoSanctions')}
              />
              <span className="ml-2 text-gray-700">No tener sanciones</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Créditos mínimos</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={criteria.minimumCredits}
              onChange={handleCreditsChange}
              min="0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Actualizar
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">¡Actualización exitosa!</h2>
            <p className="text-gray-600 mb-6">Los criterios han sido guardados correctamente.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
