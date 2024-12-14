import { Todo } from '@/interfaces/todo';
import { cn } from '@/utils';

import { Dispatch, SetStateAction } from 'react';

import dayjs from 'dayjs';

interface TodoItemProps {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

function TodoItem(props: TodoItemProps) {
  const { todo, setTodos } = props;

  if (!todo) {
    return null;
  }

  const handleCheckboxChange = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === props.todo.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  };

  return (
    <div
      className="flex w-full flex-row items-center gap-4 bg-white p-5"
      data-testid={`todo-item-${todo.id}`}
    >
      <input
        checked={todo.completed}
        onChange={handleCheckboxChange}
        className="p-2.5"
        type="checkbox"
        name="todo-checkbox"
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <div className="ml-4 flex flex-col gap-2">
        <p
          data-testid="todo-title"
          className={cn('text-lg font-bold text-black', {
            'line-through opacity-50': todo.completed,
          })}
        >
          {todo.task}
        </p>
        <p className="text-xs text-secondary-black">{todo.category}</p>
      </div>
      <p className="ml-auto text-xs text-secondary-black">
        {dayjs(todo.createdAt).format('YYYY/MM/D HH:mm')}
      </p>
    </div>
  );
}

export default TodoItem;
