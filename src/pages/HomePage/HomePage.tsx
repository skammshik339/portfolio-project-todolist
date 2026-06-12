import { useState } from "react";
import { useTaskStore } from "../../store/TaskStore";
import type { Task } from "../../store/TaskStore";
import styles from "./HomePage.module.css";
import TaskModal from "../../components/TaskModal/TaskModal";
import ValidationModal from '../../components/ValidationModal/ValidationModal'
import SuccessModal from '../../components/SuccessModal/SuccessModal';

export default function HomePage() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Низкий");
  const [category, setCategory] = useState<Task["category"]>("Личное");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg,setSuccessMsg] = useState<string | null>(null)

  const handleCreateTask = () => {
    if (!title.trim()) {
      setErrorMsg("Заголовок не может быть пустым!");
      return;
    }
    if (title.trim().length > 50) {
      setErrorMsg("Заголовок слишком длинный (макс. 50 симв.)");
      return;
    }
    if (desc.trim().length > 300) {
      setErrorMsg("Описание слишком длинное (макс. 300 симв.)");
      return;
    }

    addTask(title, desc, priority, category);
    setTitle("");
    setDesc("");
    setPriority("Низкий");
    setSuccessMsg('Задача успешно создана')
  };
  const getTagClass = (prio: Task["priority"]) => {
    if (prio === "Высокий") return styles["tag-high"];
    if (prio === "Средний") return styles["tag-medium"];
    return styles["tag-low"];
  };

  return (
    <div className={styles["container"]}>
      <section className={styles["creator-section"]}>
        <div className={styles["creator-header"]}>
          <h2>Добавить задачу</h2>
          <span className={styles["plus-icon"]}>+</span>
        </div>
        <div className={styles["form-box"]}>
          <input
            type="text"
            placeholder="Заголовок задачи..."
            className={styles["input-title"]}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles["form-divider"]} />
          <textarea
            placeholder="Описание задачи..."
            className={styles["textarea-desc"]}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className={styles["form-footer"]}>
            <div className={styles["dropdowns-container"]}>
              <details className={styles["dropdown"]}>
                <summary className={styles["dropdown-trigger"]}>
                  <span>Приоритет ({priority})</span>
                </summary>

                <div className={styles["dropdown-menu"]}>
                  {(["Низкий", "Средний", "Высокий"] as const).map((prio) => (
                    <button
                      key={prio}
                      type="button"
                      className={`${styles["dropdown-item"]} ${priority === prio ? styles["active"] : ""}`}
                      onClick={(e) => {
                        setPriority(prio);
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open");
                      }}
                    >
                      Приоритет ({prio})
                    </button>
                  ))}
                </div>
              </details>

              <details className={styles["dropdown"]}>
                <summary className={styles["dropdown-trigger"]}>
                  <span>Категория ({category})</span>
                </summary>

                <div className={styles["dropdown-menu"]}>
                  {(["Работа", "Дом", "Учеба", "Личное", "Другое"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles["dropdown-item"]} ${category === cat ? styles["active"] : ""}`}
                      onClick={(e) => {
                        setCategory(cat);
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open");
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </details>
            </div>
            <button className={styles["btn-create"]} onClick={handleCreateTask}>
              Создать
            </button>
          </div>
        </div>
      </section>

      <section className={styles["sidebar-section"]}>
        <h2>Задачи ({tasks.length})</h2>
        <div className={styles["cards-list"]}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`${styles["card"]} ${task.completed ? styles["card-completed"] : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedTaskId(task.id)}
            >
              <div className={styles["card-header-row"]}>
                <label
                  className={styles["checkbox-container"]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      updateTask(task.id, { completed: !task.completed })
                    }
                  />
                  <span className={styles["checkbox-custom"]} />
                </label>
                <span
                  className={`${styles["card-tag"]} ${getTagClass(task.priority)}`}
                >
                  {task.priority} приоритет
                </span>
              </div>

              <h3>{task.title}</h3>
              {task.desc && <p>{task.desc}</p>}
            </div>
          ))}
        </div>
      </section>
      <TaskModal
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />
      {errorMsg && (
        <ValidationModal message={errorMsg} onClose={() => setErrorMsg(null)} />
      )}
      {
        successMsg && (
        <SuccessModal message={successMsg} onClose={() => setSuccessMsg(null)} />
      )
      }
    </div>
  );
}
