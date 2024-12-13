import { Todo } from '@/interfaces/todo';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoItem from './todo-item';

const todo: Todo = {
  id: 1,
  category: 'work',
  task: 'Todo Item',
  completed: false,
  createdAt: '2024/12/13 11:24',
};

describe('TodoItem', () => {
  it('should render todo item', () => {
    render(<TodoItem todo={todo} />);

    expect(screen.getByText(todo.task)).toBeInTheDocument();
    expect(screen.getByText(todo.category)).toBeInTheDocument();
    expect(screen.getByText(todo.createdAt)).toBeInTheDocument();
  });

  it('should check todo item and apply completed styles when completed', () => {
    const completedTodo = { ...todo, completed: true };

    render(<TodoItem todo={completedTodo} />);

    const checkbox = screen.getByTestId(`todo-item-checkbox-${todo.id}`);
    const title = screen.getByTestId(`todo-item-title-${todo.id}`);

    expect(checkbox).toBeChecked();
    expect(title).toHaveClass('line-through opacity-50');
  });

  it('should check todo item and apply completed styles when clicked', () => {
    render(<TodoItem todo={todo} />);

    const checkbox = screen.getByTestId(`todo-item-checkbox-${todo.id}`);
    const title = screen.getByTestId(`todo-item-title-${todo.id}`);

    expect(checkbox).not.toBeChecked();
    expect(title).not.toHaveClass('line-through opacity-50');

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(title).toHaveClass('line-through opacity-50');
  });
});
