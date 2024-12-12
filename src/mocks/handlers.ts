import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: 1, title: 'Learn Testing', completed: false },
      { id: 2, title: 'Write Tests', completed: true },
    ]);
  }),
];
