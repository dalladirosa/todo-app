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

    await userEvent.click(personalFilter);

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

    await userEvent.click(workFilter);

    expect(await findByTestId(`todo-item-${todos[0].id}`)).toBeInTheDocument();
    expect(queryByTestId(`todo-item-${todos[1].id}`)).not.toBeInTheDocument();
  });

  it('should maintain completed status when filtering by personal category', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId } = rendered!;

    // First mark the personal todo as completed
    const personalTodoCheckbox = await findByTestId(
      `todo-checkbox-${todos[1].id}`,
    );
    await userEvent.click(personalTodoCheckbox);

    // Then filter by personal category
    const personalFilter = await findByTestId('todo-list-filter-personal');
    await userEvent.click(personalFilter);

    // Verify personal todo is still visible and completed
    const personalTodo = await findByTestId(`todo-item-${todos[1].id}`);
    expect(personalTodo).toBeInTheDocument();
    expect(personalTodoCheckbox).toBeChecked();
  });

  it('should maintain completed status when filtering by work category', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId } = rendered!;

    // First mark the work todo as completed
    const workTodoCheckbox = await findByTestId(`todo-checkbox-${todos[0].id}`);
    await userEvent.click(workTodoCheckbox);

    // Then filter by personal category
    const workFilter = await findByTestId('todo-list-filter-work');
    await userEvent.click(workFilter);

    // Verify work todo is still visible and completed
    const workTodo = await findByTestId(`todo-item-${todos[0].id}`);
    expect(workTodo).toBeInTheDocument();
    expect(workTodoCheckbox).toBeChecked();
  });

  it('should maintain completed status when filtering by all category', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId } = rendered!;

    // First mark all todos as completed
    const firstTodoCheckbox = await findByTestId(
      `todo-checkbox-${todos[0].id}`,
    );
    const secondTodoCheckbox = await findByTestId(
      `todo-checkbox-${todos[1].id}`,
    );
    await userEvent.click(firstTodoCheckbox);
    await userEvent.click(secondTodoCheckbox);

    // Then filter by personal category
    const personalFilter = await findByTestId('todo-list-filter-personal');
    await userEvent.click(personalFilter);

    // Verify personal todo is still visible and completed
    const personalTodo = await findByTestId(`todo-item-${todos[1].id}`);
    expect(personalTodo).toBeInTheDocument();
    expect(secondTodoCheckbox).toBeChecked();

    // Then filter by all category
    const allFilter = await findByTestId('todo-list-filter-all');
    await userEvent.click(allFilter);

    // Verify all todos are still visible and completed
    const firstTodo = await findByTestId(`todo-item-${todos[0].id}`);
    const secondTodo = await findByTestId(`todo-item-${todos[1].id}`);
    expect(firstTodo).toBeInTheDocument();
    expect(secondTodo).toBeInTheDocument();
    expect(firstTodoCheckbox).toBeChecked();
    expect(secondTodoCheckbox).toBeChecked();
  });

  it('should filter todos by work category when work filter is clicked', async () => {
    let rendered;

    await act(async () => {
      rendered = render(<TodoList todosPromise={Promise.resolve(todos)} />);
    });

    const { findByTestId, queryByTestId } = rendered!;

    const workFilter = await findByTestId('todo-list-filter-work');

    await userEvent.click(workFilter);

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
      `todo-checkbox-${todos[1].id}`,
    );

    await userEvent.click(firstTodoCheckbox);

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
