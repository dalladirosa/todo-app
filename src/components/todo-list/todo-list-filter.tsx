import { Badge } from '../ui/badge';

const FILTER_OPTIONS = ['All', 'Personal', 'Work'];

function TodoListFilter() {
  return (
    <div>
      Filter:
      <div>
        {FILTER_OPTIONS.map((option, key) => (
          <Badge
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
