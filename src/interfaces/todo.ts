export interface Todo {
  id: number;
  category: 'work' | 'personal';
  task: string;
  createdAt: string;
  completed: boolean;
}

export type TodoFilter = 'All' | 'Personal' | 'Work';
