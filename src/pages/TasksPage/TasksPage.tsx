import { useState } from "react";
import { useTaskStore } from "../../store/TaskStore";
import type { Task } from '../../store/TaskStore';
import { ChevronRight } from "lucide-react";
import styles from "./TasksPage.module.css";
import TaskModal from "../../components/TaskModal/TaskModal";

export default function Tasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const getTagClass = (prio: Task["priority"]) => {
    if (prio === "Высокий") return styles["tag-high"];
    if (prio === "Средний") return styles["tag-medium"];
    return styles["tag-low"];
  };

  return (
    <div className={styles["container"]}>
      <section className={styles["tasks-section"]}>
        <div className={styles["tasks-list"]}>
          {tasks.length == 0 ? <h1 className={styles['empty-header']}>Задач пока нет</h1> :tasks.map((task) => (
            <div
              key={task.id}
              className={`${styles["task-tile"]} ${task.completed ? styles["completed"] : ""}`}
              onClick={() => setSelectedTaskId(task.id)}
            >
              <div className={styles["tile-header"]}>
                <label className={styles["checkbox-wrapper"]} onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTask(task.id, { completed: !task.completed })}
                  />
                  <span className={styles["checkbox-box"]} />
                </label>
                <span className={`${styles["priority-tag"]} ${getTagClass(task.priority)}`}>
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
          ))}
        </div>
      </section>


    
      <TaskModal taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
    </div>
  );
}
