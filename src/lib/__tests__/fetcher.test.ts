import { server } from '@/mocks/server';

import { APIError, fetcher } from '../fetcher';
import { HttpResponse, http } from 'msw';

describe('fetcher', () => {
  it('should fetch data successfully', async () => {
    const mockData = { message: 'success' };
    server.use(
      http.get('/api/test', () => {
        return HttpResponse.json(mockData);
      }),
    );

    const result = await fetcher<typeof mockData>('/test');
    expect(result).toEqual(mockData);
  });

  it('should handle API errors', async () => {
    const errorMessage = 'Not found';
    server.use(
      http.get('/api/test', () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: errorMessage,
        });
      }),
    );

    await expect(fetcher('/test')).rejects.toThrow(APIError);
    await expect(fetcher('/test')).rejects.toHaveProperty('status', 404);
  });

  it('should handle network errors', async () => {
    server.use(
      http.get('/api/test', () => {
        return HttpResponse.error();
      }),
    );

    await expect(fetcher('/test')).rejects.toThrow(APIError);
  });
});
