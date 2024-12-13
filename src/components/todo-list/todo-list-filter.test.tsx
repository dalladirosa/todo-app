import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoListFilter from './todo-list-filter';

describe('TodoListFilter', () => {
  it('should render the filter options', () => {
    render(<TodoListFilter />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('should render the filter options with the correct data-testid and default filter option', () => {
    render(<TodoListFilter />);

    const allFilter = screen.getByTestId('todo-list-filter-all');
    const personalFilter = screen.getByTestId('todo-list-filter-personal');
    const workFilter = screen.getByTestId('todo-list-filter-work');

    expect(allFilter).toBeInTheDocument();
    expect(allFilter).toHaveClass('bg-primary');
    expect(personalFilter).not.toHaveClass('bg-primary');
    expect(workFilter).not.toHaveClass('bg-primary');
  });

  it('should allow changing the selected filter option', () => {
    render(<TodoListFilter />);

    const allFilter = screen.getByTestId('todo-list-filter-all');
    const personalFilter = screen.getByTestId('todo-list-filter-personal');
    const workFilter = screen.getByTestId('todo-list-filter-work');

    // Initially "All" should be selected
    expect(allFilter).toHaveClass('bg-primary');
    expect(personalFilter).not.toHaveClass('bg-primary');
    expect(workFilter).not.toHaveClass('bg-primary');

    // Click Personal filter
    userEvent.click(personalFilter);

    // Personal should now be selected
    expect(allFilter).not.toHaveClass('bg-primary');
    expect(personalFilter).toHaveClass('bg-primary');
    expect(workFilter).not.toHaveClass('bg-primary');

    // Click Work filter
    userEvent.click(workFilter);

    // Work should now be selected
    expect(allFilter).not.toHaveClass('bg-primary');
    expect(personalFilter).not.toHaveClass('bg-primary');
    expect(workFilter).toHaveClass('bg-primary');
  });
});
