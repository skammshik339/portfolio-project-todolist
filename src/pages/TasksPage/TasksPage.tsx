import { useState, useEffect } from "react";
import { useTaskStore } from "../../store/TaskStore";
import type { Task } from '../../store/TaskStore';
import { ChevronRight } from "lucide-react";
import styles from "./TasksPage.module.css";
import TaskModal from "../../components/TaskModal/TaskModal";

export default function Tasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [filterOption, setFilterOption] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const getTagClass = (prio: Task["priority"]) => {
    if (prio === "Высокий") return styles["tag-high"];
    if (prio === "Средний") return styles["tag-medium"];
    return styles["tag-low"];
  };

  const getFilterLabel = () => {
    switch (filterOption) {
      case "newest": return "Сначала новые";
      case "oldest": return "Сначала старые";
      case "high-priority": return "Сначала высокий приоритет";
      case "low-priority": return "Сначала низкий приоритет";
      default: return "Фильтр";
    }
  };

  useEffect(() => {
    let result = [...tasks];

    if (searchQuery) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filterOption) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "high-priority":
        const priorityOrder = { "Высокий": 1, "Средний": 2, "Низкий": 3 };
        result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case "low-priority":
        const priorityOrderLow = { "Высокий": 3, "Средний": 2, "Низкий": 1 };
        result.sort((a, b) => priorityOrderLow[a.priority] - priorityOrderLow[b.priority]);
        break;
      default:
        break;
    }

    setFilteredTasks(result);
  }, [tasks, filterOption, searchQuery]);

  return (
    <div className={styles["container"]}>
      <section className={styles["tasks-section"]}>
        <div className={styles["controls"]}>
          <div className={styles["search-container"]}>
            <input
              type="text"
              placeholder="Поиск задач..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles["search-input"]}
            />
          </div>
          <div className={styles["filter-container"]}>
            <details className={styles["dropdown"]}>
              <summary className={styles["dropdown-trigger"]}>
                <span>{getFilterLabel()}</span>
              </summary>
              <div className={styles["dropdown-menu"]}>
                <button
                  type="button"
                  className={`${styles["dropdown-item"]} ${filterOption === "newest" ? styles["active"] : ""}`}
                  onClick={(e) => {
                    setFilterOption("newest");
                    e.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >
                  Сначала новые
                </button>
                <button
                  type="button"
                  className={`${styles["dropdown-item"]} ${filterOption === "oldest" ? styles["active"] : ""}`}
                  onClick={(e) => {
                    setFilterOption("oldest");
                    e.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >
                  Сначала старые
                </button>
                <button
                  type="button"
                  className={`${styles["dropdown-item"]} ${filterOption === "high-priority" ? styles["active"] : ""}`}
                  onClick={(e) => {
                    setFilterOption("high-priority");
                    e.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >
                  Сначала высокий приоритет
                </button>
                <button
                  type="button"
                  className={`${styles["dropdown-item"]} ${filterOption === "low-priority" ? styles["active"] : ""}`}
                  onClick={(e) => {
                    setFilterOption("low-priority");
                    e.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >
                  Сначала низкий приоритет
                </button>
              </div>
            </details>
          </div>
        </div>
        <div className={styles["tasks-list"]}>
          {filteredTasks.length === 0 ? (
            <h1 className={styles["empty-header"]}>Задач не найдено</h1>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`${styles["task-tile"]} ${task.completed ? styles["completed"] : ""}`}
                onClick={() => setSelectedTaskId(task.id)}
              >
                <div className={styles["tile-header"]}>
                  <label
                    className={styles["checkbox-wrapper"]}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        updateTask(task.id, { completed: !task.completed })
                      }
                    />
                    <span className={styles["checkbox-box"]} />
                  </label>
                  <span
                    className={`${styles["priority-tag"]} ${getTagClass(task.priority)}`}
                  >
                    {task.priority} приоритет
                  </span>
                </div>

                <div className={styles["tile-body"]}>
                  <h3>{task.title}</h3>
                  {task.desc && <p>{task.desc}</p>}
                </div>

                <div className={styles["tile-footer"]}>
                  <span className={styles["action-text"]}>Подробнее</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <TaskModal
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />
    </div>
  );
}