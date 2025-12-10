interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function Error({ message = 'Ocorreu um erro ao carregar os dados.', onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="text-red-400 text-6xl mb-4">⚠️</div>
      <p className="text-gray-300 text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}


