import { useState, useEffect } from "react";
import { useTaskStore } from "../../store/TaskStore";
import { useStatisticsStore } from "../../store/StatisticsStore";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BarChart2, Clock, CheckCircle2, List, Calendar, Info } from "lucide-react";
import styles from "./StatisticsPage.module.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticsPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const createdTasksHistory = useStatisticsStore((state) => state.createdTasksHistory);
  const completedTasksHistory = useStatisticsStore((state) => state.completedTasksHistory);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    completionRate: 0,
    tasksByCategory: {} as Record<string, number>,
    tasksByPriority: {} as Record<string, number>,
    weeklyStats: {
      createdThisWeek: 0,
      completedThisWeek: 0,
    },
  });

  useEffect(() => {
    // Calculate statistics
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    // Safely handle potentially undefined data
    const safeCreatedHistory = createdTasksHistory || [];
    const safeCompletedHistory = completedTasksHistory || [];
    const safeTasks = tasks || [];

    // Count total created tasks (including deleted ones)
    const totalCreatedTasks = safeCreatedHistory.length;
    const totalCompletedTasks = safeCompletedHistory.length;
    const completionRate = totalCreatedTasks > 0 ? Math.round((totalCompletedTasks / totalCreatedTasks) * 100) : 0;

    // Count tasks by category
    const tasksByCategory: Record<string, number> = {
      "Работа": 0,
      "Дом": 0,
      "Учеба": 0,
      "Личное": 0,
      "Другое": 0,
    };

    // Count tasks by priority
    const tasksByPriority: Record<string, number> = {
      "Высокий": 0,
      "Средний": 0,
      "Низкий": 0,
    };

    // Count weekly stats
    let createdThisWeek = 0;
    let completedThisWeek = 0;

    // Count current tasks by category and priority
    safeTasks.forEach(task => {
      // Count by category
      if (task.category && tasksByCategory[task.category] !== undefined) {
        tasksByCategory[task.category]++;
      }

      // Count by priority
      if (task.priority && tasksByPriority[task.priority] !== undefined) {
        tasksByPriority[task.priority]++;
      }
    });

    // Count created this week from history (including deleted tasks)
    safeCreatedHistory.forEach(historyTask => {
      if (historyTask.createdAt) {
        const createdDate = new Date(historyTask.createdAt);
        if (createdDate >= startOfWeek) {
          createdThisWeek++;
        }
      }
    });

    // Count completed tasks from history (including deleted ones)
    safeCompletedHistory.forEach(historyTask => {
      if (historyTask.completedAt) {
        const completedDate = new Date(historyTask.completedAt);
        if (completedDate >= startOfWeek) {
          completedThisWeek++;
        }
      }
    });

    setStats({
      totalTasks: totalCreatedTasks,
      completedTasks: totalCompletedTasks,
      completionRate,
      tasksByCategory,
      tasksByPriority,
      weeklyStats: {
        createdThisWeek,
        completedThisWeek,
      },
    });
  }, [tasks]);

  // Data for charts
  const categoryData = {
    labels: Object.keys(stats.tasksByCategory),
    datasets: [
      {
        data: Object.values(stats.tasksByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        borderWidth: 1,
      },
    ],
  };

  const priorityData = {
    labels: Object.keys(stats.tasksByPriority),
    datasets: [
      {
        data: Object.values(stats.tasksByPriority),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles["container"]}>
      <section className={styles["stats-section"]}>
        <h1 className={styles["page-title"]}>
          <BarChart2 size={24} className={styles["title-icon"]} />
          Статистика задач
        </h1>

        <div className={styles["summary-cards"]}>
          <div className={styles["summary-card"]}>
            <div className={styles["card-icon"]} style={{ backgroundColor: 'rgba(54, 162, 235, 0.2)' }}>
              <List size={20} color="#36A2EB" />
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["card-value"]}>{stats.totalTasks}</div>
              <div className={styles["card-label"]}>Всего создано</div>
            </div>
          </div>

          <div className={styles["summary-card"]}>
            <div className={styles["card-icon"]} style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
              <CheckCircle2 size={20} color="#4BC0C0" />
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["card-value"]}>{stats.completedTasks}</div>
              <div className={styles["card-label"]}>Всего выполнено</div>
            </div>
          </div>

          <div className={styles["summary-card"]}>
            <div className={styles["card-icon"]} style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
              <Clock size={20} color="#FF6384" />
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["card-value"]}>{stats.completionRate}%</div>
              <div className={styles["card-label"]}>Общий процент</div>
            </div>
          </div>

          <div className={styles["summary-card"]}>
            <div className={styles["card-icon"]} style={{ backgroundColor: 'rgba(153, 102, 255, 0.2)' }}>
              <Calendar size={20} color="#9966FF" />
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["card-value"]}>{stats.weeklyStats.createdThisWeek}</div>
              <div className={styles["card-label"]}>Создано этой неделе</div>
            </div>
          </div>

          <div className={styles["summary-card"]}>
            <div className={styles["card-icon"]} style={{ backgroundColor: 'rgba(255, 159, 64, 0.2)' }}>
              <CheckCircle2 size={20} color="#FF9F00" />
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["card-value"]}>{stats.weeklyStats.completedThisWeek}</div>
              <div className={styles["card-label"]}>Выполнено этой неделе</div>
            </div>
          </div>
        </div>

        <div className={styles["charts-container"]}>
          <div className={styles["chart-card"]}>
            <h3 className={styles["chart-title"]}>Распределение по категориям</h3>
            <div className={styles["chart-wrapper"]}>
              <Pie data={categoryData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} />
            </div>
          </div>

          <div className={styles["chart-card"]}>
            <h3 className={styles["chart-title"]}>Распределение по приоритетам</h3>
            <div className={styles["chart-wrapper"]}>
              <Pie data={priorityData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} />
            </div>
          </div>
        </div>

        <div className={styles["weekly-cleanup-warning"]}>
          <Info size={16} className={styles["warning-icon"]} />
          <span>Все выполненные задачи и статистика автоматически сбрасываются каждый понедельник в 00:00</span>
          <Clock size={16} className={styles["warning-icon"]} />
        </div>

        <div className={styles["weekly-stats"]}>
          <h3 className={styles["section-title"]}>Недельная статистика</h3>
          <div className={styles["weekly-grid"]}>
            <div className={styles["weekly-item"]}>
              <div className={styles["weekly-value"]}>{stats.weeklyStats.createdThisWeek}</div>
              <div className={styles["weekly-label"]}>Создано задач</div>
            </div>
            <div className={styles["weekly-item"]}>
              <div className={styles["weekly-value"]}>{stats.weeklyStats.completedThisWeek}</div>
              <div className={styles["weekly-label"]}>Выполнено задач</div>
            </div>
            <div className={styles["weekly-item"]}>
              <div className={styles["weekly-value"]}>{stats.totalTasks - stats.weeklyStats.createdThisWeek}</div>
              <div className={styles["weekly-label"]}>С прошлых недель</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}