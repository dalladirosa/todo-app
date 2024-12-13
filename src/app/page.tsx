import TodoList from '@/components/todo-list';
import todoService from '@/services/todo.service';

export default function Home() {
  const todosPromise = todoService.getTodos();

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="container flex flex-col items-center px-8 py-9 lg:max-w-screen-md lg:px-0">
        <TodoList todosPromise={todosPromise} />
      </main>
    </div>
  );
}
