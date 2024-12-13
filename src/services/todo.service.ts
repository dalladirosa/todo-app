import { Todo } from '@/interfaces/todo';
import { fetcher } from '@/libs/fetcher';

class TodoService {
  async getTodos() {
    return fetcher<Todo[]>('/todos2', {
      method: 'GET',
    });
  }
}

const todoService = new TodoService();

export default todoService;
