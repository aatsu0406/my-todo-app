// app/page.tsx
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/todo";

export default function Home() {
  const mockTodos: Todo[] = [ //モックにてUI確認
  {
    id: "1",
    title: "Next.jsのApp Routerを理解する",
    isCompleted: false,
    createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
    priority: "high",
    deadline: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3), // 3日後
  }
]

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">TODOリスト
        </h1>
        <div className="space-y-4">
          {mockTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </main>
  );
}