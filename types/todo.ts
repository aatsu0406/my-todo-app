//型定義は拡張子tsで行う
export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
}