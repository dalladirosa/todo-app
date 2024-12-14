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
  const mockSetTodos = jest.fn();

  it('should render todo item', () => {
    render(<TodoItem todo={todo} setTodos={mockSetTodos} />);

    expect(screen.getByText(todo.task)).toBeInTheDocument();
    expect(screen.getByText(todo.category)).toBeInTheDocument();
    expect(screen.getByText(todo.createdAt)).toBeInTheDocument();
  });

  it('should check todo item and apply completed styles when completed', () => {
    const completedTodo = { ...todo, completed: true };

    render(<TodoItem todo={completedTodo} setTodos={mockSetTodos} />);

    const checkbox = screen.getByRole('checkbox');
    const title = screen.getByTestId('todo-title');

    expect(checkbox).toBeChecked();
    expect(title).toHaveClass('line-through opacity-50');
  });

  it('should check todo item and apply completed styles when clicked', async () => {
    let localTodos = [todo];

    const setTodos = jest.fn((callback) => {
      localTodos = callback(localTodos);
      // Force a re-render with the updated todo
      rerender(<TodoItem todo={localTodos[0]} setTodos={setTodos} />);
    });

    const { rerender } = render(<TodoItem todo={todo} setTodos={setTodos} />);

    const checkbox = screen.getByRole('checkbox');
    const title = screen.getByTestId('todo-title');

    expect(checkbox).not.toBeChecked();
    expect(title).not.toHaveClass('line-through opacity-50');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(title).toHaveClass('line-through opacity-50');
  });
});
