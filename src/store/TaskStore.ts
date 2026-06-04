import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  desc: string;
  priority: "Низкий" | "Средний" | "Высокий";
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  getTasks: () => Task[];
  addTask: (title: string, desc: string, priority: Task["priority"]) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updatedFields: Partial<Omit<Task, "id">>) => void;
}

const STORAGE_KEY = "my-todo-tasks";

const loadTasksFromStorage = (): Task[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: loadTasksFromStorage(),
  getTasks: () => get().tasks,

  addTask: (title, desc, priority) => {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      priority,
      completed: false,
    };

    const updatedTasks = [newTask, ...get().tasks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  updateTask: (id, updatedFields) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },
}));
