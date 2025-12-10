import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { EmptyState } from '../components/EmptyState';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { movies, loading, error, hasMore, loadMore, totalResults } = useMovies({ query });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadMore]);

  if (!query.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Digite um termo para buscar"
          message="Use a barra de busca no topo para encontrar filmes"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Resultados para: <span className="text-orange-400">"{query}"</span>
        </h1>
        <p className="text-gray-300">
          Encontrados {totalResults > 0 ? totalResults : loading ? '...' : 0} filme{totalResults !== 1 ? 's' : ''}
        </p>
      </div>
      {loading && movies.length === 0 ? (
        <Loading />
      ) : movies.length === 0 ? (
        <EmptyState
          title="Nenhum filme encontrado"
          message={`Não encontramos filmes para "${query}". Tente buscar com outros termos.`}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} highlightTerm={query} />
            ))}
          </div>
          {loading && movies.length > 0 && (
            <div className="flex justify-center mt-8">
              <Loading />
            </div>
          )}
          <div ref={loadMoreRef} className="h-10" />
        </>
      )}
    </div>
  );
}

