import { Todo } from '@/interfaces/todo';

import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(`${process.env.API_BASE_URL}/todos2`, () => {
    return HttpResponse.json([
      {
        id: 1,
        category: 'work',
        task: 'Finish Firebase API',
        createdAt: '2024-03-15T10:30:00.000Z',
        completed: false,
      },
      {
        id: 2,
        category: 'personal',
        task: 'Schedule dentist appointment',
        createdAt: '2024-03-14T15:20:00.000Z',
        completed: true,
      },
      {
        id: 3,
        category: 'work',
        task: 'Buy groceries for the week',
        createdAt: '2024-03-14T09:15:00.000Z',
        completed: false,
      },
      {
        id: 4,
        category: 'work',
        task: 'Review pull requests',
        createdAt: '2024-03-13T16:45:00.000Z',
        completed: true,
      },
      {
        id: 5,
        category: 'work',
        task: 'Go to the gym',
        createdAt: '2024-03-13T08:00:00.000Z',
        completed: false,
      },
      {
        id: 6,
        category: 'personal',
        task: 'Call mom',
        createdAt: '2024-03-12T19:30:00.000Z',
        completed: false,
      },
      {
        id: 7,
        category: 'work',
        task: 'Prepare presentation for meeting',
        createdAt: '2024-03-12T14:20:00.000Z',
        completed: true,
      },
      {
        id: 8,
        category: 'personal',
        task: 'Order new headphones',
        createdAt: '2024-03-11T11:10:00.000Z',
        completed: false,
      },
      {
        id: 9,
        category: 'personal',
        task: 'Schedule annual check-up',
        createdAt: '2024-03-11T10:00:00.000Z',
        completed: false,
      },
      {
        id: 10,
        category: 'work',
        task: 'Update documentation',
        createdAt: '2024-03-10T16:30:00.000Z',
        completed: true,
      },
    ] as Todo[]);
  }),
];
