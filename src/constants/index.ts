export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w300',
    medium: 'w500',
    large: 'w780',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    original: 'original',
  },
} as const;

export const STORAGE_KEYS = {
  favorites: 'movie-app-favorites',
} as const;


