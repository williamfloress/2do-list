import React from 'react';

/**
 * Componente para mostrar mensajes de error
 * @param {string} message - Mensaje de error a mostrar
 * @param {function} onRetry - Función para reintentar (opcional)
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded transition-colors duration-200"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

