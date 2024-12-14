import { Todo } from '@/interfaces/todo';
import { fetcher } from '@/libs/fetcher';

class TodoService {
  async getTodos() {
    return fetcher<Todo[]>('/todos2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.X_API_KEY!,
      },
    });
  }
}

const todoService = new TodoService();

export default todoService;
