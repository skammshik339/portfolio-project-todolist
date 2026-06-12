import { create } from "zustand";
import { useStatisticsStore } from "./StatisticsStore";

export interface Task {
  id: number;
  title: string;
  desc: string;
  priority: "Низкий" | "Средний" | "Высокий";
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
  category: "Работа" | "Дом" | "Учеба" | "Личное" | "Другое";
}

interface TaskState {
  tasks: Task[];
  getTasks: () => Task[];
  addTask: (title: string, desc: string, priority: Task["priority"], category: Task["category"]) => void;
  updateTask: (id: number, updatedFields: Partial<Omit<Task, "id">>) => void;
  set: (state: Partial<TaskState>) => void;
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

  addTask: (title: string, desc: string, priority: Task["priority"], category: Task["category"] = "Личное") => {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      priority,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
      category,
    };

    // Log created task to statistics
    useStatisticsStore.getState().addCreatedTask({
      id: newTask.id,
      title: newTask.title,
      category: newTask.category,
      priority: newTask.priority,
      createdAt: newTask.createdAt,
    });

    const updatedTasks = [newTask, ...get().tasks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  // Delete functionality removed - tasks can no longer be deleted
  // deleteTask: (id) => {
  //   const updatedTasks = get().tasks.filter((task) => task.id !== id);
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  //   set({ tasks: updatedTasks });
  // },

  updateTask: (id, updatedFields) => {
    const updatedTasks = get().tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, ...updatedFields };
        // Handle completion time
        if (updatedFields.completed !== undefined) {
          updatedTask.completedAt = updatedFields.completed ? Date.now() : null;

          // Log to statistics when task is completed
          if (updatedFields.completed === true) {
            useStatisticsStore.getState().addCompletedTask({
              id: task.id,
              title: task.title,
              category: task.category,
              priority: task.priority,
              completedAt: Date.now(),
            });
          } else if (updatedFields.completed === false && task.completed === true) {
            // Remove from statistics when task is uncompleted
            useStatisticsStore.getState().removeCompletedTask(task.id);
          }
        }
        return updatedTask;
      }
      return task;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },
  set,
}));
