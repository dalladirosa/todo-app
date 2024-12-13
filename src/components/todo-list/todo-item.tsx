import { Todo } from '@/interfaces/todo';

type TodoItemProps = {
  todo: Todo;
};

function TodoItem(props: TodoItemProps) {
  const { todo } = props;

  if (!todo) {
    return null;
  }
  console.log(`todo-item-${todo.id}`);

  return (
    <div className="flex flex-row gap-4" data-testid={`todo-item-${todo.id}`}>
      <input
        type="checkbox"
        name="todo-item"
        id="todo-item"
        data-testid={`todo-item-checkbox-${todo.id}`}
      />
      <div className="flex flex-col gap-2">
        <p data-testid={`todo-item-title-${todo.id}`}>{todo.task}</p>
        <p>{todo.category}</p>
      </div>
      <p>{todo.createdAt}</p>
    </div>
  );
}

export default TodoItem;
