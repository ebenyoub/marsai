import { FilmType } from '@/types/home';

const API_URL = import.meta.env.VITE_API_URL;

export const isMockMode = !API_URL;

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (isMockMode) {
    console.warn(`Mocking API request to ${path}`);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple mocks based on path
    if (path.includes('/auth/login')) {
      return {
        token: 'mock-token',
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'admin' },
      } as unknown as T;
    }
    if (path.includes('/auth/register')) {
      return {
        token: 'mock-token',
        user: { id: 1, firstName: 'New', lastName: 'User', email: 'new@example.com', role: 'user' },
      } as unknown as T;
    }
    if (path.includes('/auth/profile')) {
      return {
        user: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'admin' },
      } as unknown as T;
    }
    if (path.includes('/movies')) {
      return {
        success: true,
        data: [
          {
            id: 1,
            title: "L'Aube de l'IA",
            director: 'Marie Curie',
            duration: 60,
            thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            id: 2,
            title: 'Marseille 2050',
            director: 'Jean Reno',
            duration: 55,
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
            id: 3,
            title: 'Le Silence des Machines',
            director: 'Luc Besson',
            duration: 45,
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9457',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        ],
      } as unknown as T;
    }

    return {} as T;
  }

  const headers: Record<string, string> = {
    ...options.headers as Record<string, string>,
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const result = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(result.message || 'API Error');
  }

  return result;
}

export const mockSubmitFilm = async (data: Partial<FilmType>) => {
  console.error('Film submitted (mock):', data);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true };
};
