import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
const elapsedHours = Math.floor(    //経過時間算出
    (new Date().getTime() - new Date(todo.createdAt).getTime()) / (1000 * 60 * 60)
    );

return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 border-l-4 border-blue-500">
      <div className="flex flex-col">
        <span className={`text-lg text-slate-900 font-bold ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
          {todo.title}
        </span>
        {/* これがおもてなし！作成からの時間を表示 */}
        <span className="text-xs text-gray-500">
          作成から {elapsedHours} 時間経過
        </span>
      </div>

      <div className="flex gap-2">
        {/* 優先度をバッジみたいに見せるのもええな */}
        <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-900 font-medium">
          {todo.priority}
        </span>
      </div>
    </div>
  );
}