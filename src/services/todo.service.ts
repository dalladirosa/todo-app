import { fetcher } from '@/libs/fetcher';

class TodoService {
  async getTodos() {
    return fetcher('/todos2', {
      method: 'GET',
    });
  }
}

const todoService = new TodoService();

export default todoService;
