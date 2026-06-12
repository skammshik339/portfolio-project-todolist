import { create } from "zustand";
import { useTaskStore } from "./TaskStore";

export interface CreatedTask {
  id: number;
  title: string;
  category: string;
  priority: string;
  createdAt: number;
}

export interface CompletedTask {
  id: number;
  title: string;
  category: string;
  priority: string;
  completedAt: number;
}

interface StatisticsState {
  createdTasksHistory: CreatedTask[];
  completedTasksHistory: CompletedTask[];
  addCreatedTask: (task: CreatedTask) => void;
  addCompletedTask: (task: CompletedTask) => void;
  removeCompletedTask: (taskId: number) => void;
  clearWeeklyStats: () => void;
}

const STATISTICS_KEY = "task-statistics";

const loadStatisticsFromStorage = (): {created: CreatedTask[], completed: CompletedTask[]} => {
  if (typeof window === "undefined") return {created: [], completed: []};
  const saved = localStorage.getItem(STATISTICS_KEY);

  try {
    if (saved) {
      const parsed = JSON.parse(saved);

      // Handle old format (when we only stored completed tasks)
      if (Array.isArray(parsed)) {
        return {created: [], completed: parsed};
      }

      // Handle new format
      if (parsed && typeof parsed === 'object') {
        return {
          created: Array.isArray(parsed.created) ? parsed.created : [],
          completed: Array.isArray(parsed.completed) ? parsed.completed : []
        };
      }
    }
  } catch (error) {
    console.error("Error loading statistics:", error);
  }

  return {created: [], completed: []};
};

export const useStatisticsStore = create<StatisticsState>((set, get) => ({
  createdTasksHistory: loadStatisticsFromStorage().created,
  completedTasksHistory: loadStatisticsFromStorage().completed,

  addCreatedTask: (task) => {
    const updatedHistory = [...get().createdTasksHistory, task];
    const stats = {
      created: updatedHistory,
      completed: get().completedTasksHistory
    };
    localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    set({ createdTasksHistory: updatedHistory });
  },

  addCompletedTask: (task) => {
    const updatedHistory = [...get().completedTasksHistory, task];
    const stats = {
      created: get().createdTasksHistory,
      completed: updatedHistory
    };
    localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    set({ completedTasksHistory: updatedHistory });
  },

  removeCompletedTask: (taskId) => {
    const updatedHistory = get().completedTasksHistory.filter(task => task.id !== taskId);
    const stats = {
      created: get().createdTasksHistory,
      completed: updatedHistory
    };
    localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    set({ completedTasksHistory: updatedHistory });
  },

  clearWeeklyStats: () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    // Keep only tasks created/completed before this week
    const oldCreated = get().createdTasksHistory.filter(task => {
      const createdDate = new Date(task.createdAt);
      return createdDate < startOfWeek;
    });

    const oldCompleted = get().completedTasksHistory.filter(task => {
      const completedDate = new Date(task.completedAt);
      return completedDate < startOfWeek;
    });

    const stats = {
      created: oldCreated,
      completed: oldCompleted
    };
    localStorage.setItem(STATISTICS_KEY, JSON.stringify(stats));
    set({
      createdTasksHistory: oldCreated,
      completedTasksHistory: oldCompleted
    });

    // Also clear completed tasks from main store
    const currentTasks = useTaskStore.getState().tasks;
    const activeTasks = currentTasks.filter(task => !task.completed);
    localStorage.setItem("my-todo-tasks", JSON.stringify(activeTasks));
    useTaskStore.getState().set({ tasks: activeTasks });
  },
}));
