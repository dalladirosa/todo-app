import { Todo } from '@/interfaces/todo';

import TodoList from '.';
import { act } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const todos: Todo[] = [
  {
    id: 1,
    category: 'work',
    task: 'Task 1',
    completed: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 2,
    category: 'personal',
    task: 'Task 2',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

describe('TodoList', () => {
  it('should render all todos', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId } = rendered!;

    const todoItem1 = await findByTestId(`todo-item-${todos[0].id}`);
    expect(todoItem1).toBeInTheDocument();

    const todoItem2 = await findByTestId(`todo-item-${todos[1].id}`);
    expect(todoItem2).toBeInTheDocument();
  });

  it('should render todos ordered by createdAt desc', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findAllByTestId } = rendered!;

    const todoItems = await findAllByTestId(/^todo-item-/);

    expect(todoItems[0]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[1].id}`,
    );
    expect(todoItems[1]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[0].id}`,
    );
  });

  it('should filter todos by personal category when personal filter is clicked', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId, queryByTestId } = rendered!;

    const personalFilter = await findByTestId('todo-list-filter-personal');

    await act(async () => {
      await userEvent.click(personalFilter);
    });

    expect(await findByTestId(`todo-item-${todos[1].id}`)).toBeInTheDocument();
    expect(queryByTestId(`todo-item-${todos[0].id}`)).not.toBeInTheDocument();
  });

  it('should filter todos by work category when work filter is clicked', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId, queryByTestId } = rendered!;

    const workFilter = await findByTestId('todo-list-filter-work');

    await act(async () => {
      await userEvent.click(workFilter);
    });

    expect(await findByTestId(`todo-item-${todos[0].id}`)).toBeInTheDocument();
    expect(queryByTestId(`todo-item-${todos[1].id}`)).not.toBeInTheDocument();
  });

  it('should show completed todos at the bottom when marked as completed', async () => {
    const todosWithCompleted = [...todos];

    let rendered;

    await act(async () => {
      rendered = render(
        <TodoList todosPromise={Promise.resolve(todosWithCompleted)} />,
      );
    });

    const { findByTestId, findAllByTestId } = rendered!;

    let todoItems = await findAllByTestId(/^todo-item-/);

    expect(todoItems[0]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[1].id}`,
    );
    expect(todoItems[1]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[0].id}`,
    );

    const firstTodoCheckbox = await findByTestId(
      `todo-item-checkbox-${todos[1].id}`,
    );

    await act(async () => {
      await userEvent.click(firstTodoCheckbox);
    });

    todoItems = await findAllByTestId(/^todo-item-/);

    expect(todoItems[0]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[0].id}`,
    );
    expect(todoItems[1]).toHaveAttribute(
      'data-testid',
      `todo-item-${todos[1].id}`,
    );
  });
});
