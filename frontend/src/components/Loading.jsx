/**
 * Componente Loading - Indicador de Carga
 * 
 * Este componente proporciona diferentes tipos de indicadores de carga
 * para mejorar la experiencia del usuario durante operaciones asíncronas.
 * 
 * Características:
 * - Múltiples variantes (spinner, skeleton, dots, pulse)
 * - Diferentes tamaños (sm, md, lg, xl)
 * - Colores personalizables
 * - Mensajes opcionales
 * - Diseño responsive
 * 
 * Uso:
 * <Loading variant="spinner" size="md" message="Cargando..." />
 * <Loading variant="skeleton" lines={3} />
 * <Loading variant="dots" />
 */

import React from 'react';

/**
 * Componente Loading con múltiples variantes
 * 
 * @param {string} variant - Tipo de loading: 'spinner', 'skeleton', 'dots', 'pulse'
 * @param {string} size - Tamaño: 'sm', 'md', 'lg', 'xl'
 * @param {string} color - Color del loading: 'primary', 'secondary', 'white', 'gray'
 * @param {string} message - Mensaje opcional a mostrar
 * @param {number} lines - Número de líneas para skeleton (solo variant="skeleton")
 * @param {string} className - Clases CSS adicionales
 */
const Loading = ({ 
  variant = 'spinner', 
  size = 'md', 
  color = 'primary', 
  message = '', 
  lines = 3,
  className = '' 
}) => {
  // Configuración de tamaños
  const sizeConfig = {
    sm: {
      spinner: 'h-4 w-4',
      dots: 'h-1 w-1',
      skeleton: 'h-3',
      text: 'text-sm'
    },
    md: {
      spinner: 'h-8 w-8',
      dots: 'h-2 w-2',
      skeleton: 'h-4',
      text: 'text-base'
    },
    lg: {
      spinner: 'h-12 w-12',
      dots: 'h-3 w-3',
      skeleton: 'h-6',
      text: 'text-lg'
    },
    xl: {
      spinner: 'h-16 w-16',
      dots: 'h-4 w-4',
      skeleton: 'h-8',
      text: 'text-xl'
    }
  };

  // Configuración de colores
  const colorConfig = {
    primary: {
      spinner: 'border-indigo-600',
      dots: 'bg-indigo-600',
      skeleton: 'bg-indigo-200',
      text: 'text-indigo-600'
    },
    secondary: {
      spinner: 'border-gray-600',
      dots: 'bg-gray-600',
      skeleton: 'bg-gray-200',
      text: 'text-gray-600'
    },
    white: {
      spinner: 'border-white',
      dots: 'bg-white',
      skeleton: 'bg-white/20',
      text: 'text-white'
    },
    gray: {
      spinner: 'border-gray-400',
      dots: 'bg-gray-400',
      skeleton: 'bg-gray-200',
      text: 'text-gray-500'
    }
  };

  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color];

  // Renderizar spinner
  const renderSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-t-transparent ${currentSize.spinner} ${currentColor.spinner}`}></div>
  );

  // Renderizar dots
  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${currentSize.dots} ${currentColor.dots} rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  );

  // Renderizar skeleton
  const renderSkeleton = () => (
    <div className="space-y-2 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${currentSize.skeleton} ${currentColor.skeleton} rounded animate-pulse`}
          style={{
            width: i === lines - 1 ? '75%' : '100%',
            animationDelay: `${i * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );

  // Renderizar pulse
  const renderPulse = () => (
    <div className={`${currentSize.spinner} ${currentColor.dots} rounded-full animate-pulse`}></div>
  );

  // Renderizar el indicador según la variante
  const renderIndicator = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'skeleton':
        return renderSkeleton();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Indicador de carga */}
      {renderIndicator()}
      
      {/* Mensaje opcional */}
      {message && (
        <p className={`${currentSize.text} ${currentColor.text} font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * Componente Loading para páginas completas
 * Centrado en la pantalla con fondo
 */
export const PageLoading = ({ message = 'Cargando...', variant = 'spinner' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loading 
      variant={variant} 
      size="lg" 
      color="primary" 
      message={message}
    />
  </div>
);

/**
 * Componente Loading para botones
 * Pequeño y discreto
 */
export const ButtonLoading = ({ color = 'white' }) => (
  <Loading 
    variant="spinner" 
    size="sm" 
    color={color}
    className="inline-block"
  />
);

/**
 * Componente Loading para listas
 * Múltiples líneas skeleton
 */
export const ListLoading = ({ lines = 5, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
