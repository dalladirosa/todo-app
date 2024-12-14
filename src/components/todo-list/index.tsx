'use client';

import { Todo, TodoFilter } from '@/interfaces/todo';

import { use, useState } from 'react';

import dayjs from 'dayjs';

import TodoItem from './todo-item';
import TodoListFilter from './todo-list-filter';

interface TodoListProps {
  todosPromise: Promise<Todo[]>;
}

function TodoList({ todosPromise }: TodoListProps) {
  const [filter, setFilter] = useState<TodoFilter>('All');
  const [todos, setTodos] = useState<Todo[]>(use(todosPromise));

  const visibleTodos = todos
    .filter(
      (todo) =>
        filter === 'All' ||
        todo.category.toLowerCase() === filter.toLowerCase(),
    )
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
    });

  return (
    <div className="container">
      <TodoListFilter filter={filter} setFilter={setFilter} />

      <div className="flex flex-col gap-4">
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
