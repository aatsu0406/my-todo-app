"use client";

import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (title: string, priority: "低" | "中" | "高") => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"低" | "中" | "高">("中");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // 空っぽなら何もしない
    
    onAdd(title, priority);
    setTitle(""); // 入力欄を空にする
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2 items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-600 mb-1">
          新しいタスク
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="何をやる？"
          className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          優先度
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "低" | "中" | "高")}
          className="p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
        >
          <option value="低">低</option>
          <option value="中">中</option>
          <option value="高">高</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
      >
        追加
      </button>
    </form>
  );
}