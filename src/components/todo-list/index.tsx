'use client';

import { Todo } from '@/interfaces/todo';

import { use } from 'react';

import TodoItem from './todo-item';
import TodoListFilter from './todo-list-filter';

interface TodoListProps {
  todosPromise: Promise<Todo[]>;
}

function TodoList({ todosPromise }: TodoListProps) {
  const todos = use(todosPromise);

  return (
    <div>
      <TodoListFilter />

      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
