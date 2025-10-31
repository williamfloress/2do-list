import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';

/**
 * Error Boundary Component - Catches React errors and displays a fallback UI
 * 
 * This component catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 * 
 * Usage:
 * Wrap components with <ErrorBoundary>
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  /**
   * Update state so the next render will show the fallback UI
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error information to console
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  /**
   * Handle retry
   */
  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😵</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Algo salió mal
              </h1>
              <p className="text-gray-600">
                La aplicación encontró un error inesperado
              </p>
            </div>

            {/* Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <details className="text-sm text-red-800">
                  <summary className="font-semibold mb-2 cursor-pointer">
                    Detalles del error (solo en desarrollo)
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}

            {/* Error Message */}
            {this.state.error && (
              <ErrorMessage 
                message={this.state.error.message || 'Ha ocurrido un error inesperado'}
                onRetry={this.handleReset}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Ir al inicio
              </button>
            </div>

            {/* Help Text */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Si el problema persiste, por favor contacta al soporte
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

