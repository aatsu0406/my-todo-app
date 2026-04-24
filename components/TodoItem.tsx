import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; //完了状態を切り替える関数
  onDelete: (id: string) => void; //削除する関数
}

export default function TodoItem({ todo, onToggle , onDelete}: TodoItemProps) {
const elapsedHours = Math.floor(    //経過時間算出
    (new Date().getTime() - new Date(todo.createdAt).getTime()) / (1000 * 60 * 60)
    );
    
const dateLabel = new Date(todo.createdAt).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const getPriorityStyle = (priority: "低" | "中" | "高") => {
  switch (priority) {
    case "高":
      return "bg-red-50 text-red-700 border-red-200 font-bold";
    case "中":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "低":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 border-l-4 ${todo.isCompleted ? "border-gray-300 bg-gray-50" : "border-blue-500"}`}>
      <div className="flex items-center gap-4">
        {/* チェックボックス（おもてなしの操作感） */}
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer accent-blue-500"
        />
        
        <div className="flex flex-col">
          <span className={`text-lg font-bold ${todo.isCompleted ? "line-through text-gray-400" : "text-slate-900"}`}>
            {todo.title}
          </span>
          <span className="text-xs text-gray-500">
            作成から {elapsedHours} 時間経過
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        {/* 追加：作成日時 */}
        <div className="text-[10px] text-gray-400 font-mono">
          {dateLabel}
        </div>
        {/* 削除ボタン */}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 text-slate-900 hover:text-red-500 transition-colors cursor-pointer"
          title="削除">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {/* 優先度バッジ */}
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
          ${getPriorityStyle(todo.priority)}`}>
          {todo.priority}
        </span>
      </div>
    </div>
  );
}