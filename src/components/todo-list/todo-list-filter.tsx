import { TodoFilter } from '@/interfaces/todo';

import { Dispatch, SetStateAction } from 'react';

import { Badge } from '../ui/badge';

const FILTER_OPTIONS: TodoFilter[] = ['All', 'Personal', 'Work'];

interface TodoListFilterProps {
  filter: TodoFilter;
  setFilter: Dispatch<SetStateAction<TodoFilter>>;
}

function TodoListFilter({ filter, setFilter }: TodoListFilterProps) {
  const handleFilterClick = (option: TodoFilter) => () => {
    setFilter(option);
  };

  return (
    <div className="mb-2.5 flex flex-row items-center gap-2 p-2.5">
      <span className="text-xs font-bold text-dark-brown">Filter:</span>
      <div className="flex items-center gap-3">
        {FILTER_OPTIONS.map((option, key) => (
          <Badge
            variant={filter === option ? 'default' : 'secondary'}
            onClick={handleFilterClick(option)}
            key={`${key}-${option}`}
            data-testid={`todo-list-filter-${option.toLowerCase()}`}
          >
            {option}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default TodoListFilter;
