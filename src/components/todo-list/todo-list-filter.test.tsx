import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoListFilter from './todo-list-filter';

describe('TodoListFilter', () => {
  const mockSetFilter = jest.fn();

  it('should render the filter options', () => {
    render(<TodoListFilter filter="All" setFilter={mockSetFilter} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('should render the filter options with the correct data-testid and default filter option', () => {
    render(<TodoListFilter filter="All" setFilter={mockSetFilter} />);

    const allFilter = screen.getByTestId('todo-list-filter-all');
    const personalFilter = screen.getByTestId('todo-list-filter-personal');
    const workFilter = screen.getByTestId('todo-list-filter-work');

    expect(allFilter).toBeInTheDocument();
    expect(allFilter.classList.contains('bg-light-green')).toBe(true);
    expect(personalFilter.classList.contains('bg-brown')).toBe(true);
    expect(workFilter.classList.contains('bg-brown')).toBe(true);
  });

  it('should allow changing the selected filter option', async () => {
    const { rerender } = render(
      <TodoListFilter filter="All" setFilter={mockSetFilter} />,
    );

    const allFilter = screen.getByTestId('todo-list-filter-all');
    const personalFilter = screen.getByTestId('todo-list-filter-personal');
    const workFilter = screen.getByTestId('todo-list-filter-work');

    // Initially "All" should be selected
    expect(allFilter).toBeInTheDocument();
    expect(allFilter.classList.contains('bg-light-green')).toBe(true);
    expect(personalFilter.classList.contains('bg-brown')).toBe(true);
    expect(workFilter.classList.contains('bg-brown')).toBe(true);

    // Click Personal filter
    await userEvent.click(personalFilter);

    rerender(<TodoListFilter filter="Personal" setFilter={mockSetFilter} />);

    // Personal should now be selected
    expect(allFilter.classList.contains('bg-brown')).toBe(true);
    expect(personalFilter.classList.contains('bg-light-green')).toBe(true);
    expect(workFilter.classList.contains('bg-brown')).toBe(true);

    // Click Work filter
    await userEvent.click(workFilter);

    rerender(<TodoListFilter filter="Work" setFilter={mockSetFilter} />);

    // Work should now be selected
    expect(allFilter.classList.contains('bg-brown')).toBe(true);
    expect(personalFilter.classList.contains('bg-brown')).toBe(true);
    expect(workFilter.classList.contains('bg-light-green')).toBe(true);
  });
});
