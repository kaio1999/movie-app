import { useEffect, useRef } from 'react';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export function HomePage() {
  const { movies, loading, error, hasMore, loadMore } = useMovies();
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Filmes Populares</h1>
      {loading && movies.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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

