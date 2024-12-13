import { handlers } from '@/mocks/handlers';

import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';

const server = setupServer(...handlers);

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
