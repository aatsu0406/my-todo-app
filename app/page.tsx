"use client";

import { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ロード時にLocalStorageから読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem("my-todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // todosが変わるたびにLocalStorageへ保存
  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  // 【作成】TODO追加
  const addTodo = (title: string, priority: "低" | "中" | "高") => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      createdAt: new Date(),
      priority,
    };
    setTodos([newTodo, ...todos]);
  };

  // 【更新】完了状態の切り替え
  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  }; 

  // 【削除】TODO削除
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);  // 指定されたID以外のTODOを残す
    setTodos(newTodos);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {  //ステータスが同じ場合は作成日時でソート
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.isCompleted ? 1 : -1; //ステータスが異なる場合は未完了を優先
  });

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">TODOリスト</h1>
        <AddTodoForm onAdd={addTodo} />
        <div className="space-y-4">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={toggleTodo} // ここで関数を渡す
                onDelete={deleteTodo}   // ここで関数を渡す
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-lg font-bold text-slate-800">今することは何もありません！</h3>
              <p className="text-sm text-slate-500 mt-1">
                新しいタスクを追加して、TODOリストを充実させましょう。
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}