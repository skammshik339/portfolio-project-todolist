import { Check, ChevronDown, Trash2, X, Save } from "lucide-react";
import type { Task } from "../../store/TaskStore";
import styles from "./TaskModal.module.css";
import { useTaskStore } from "../../store/TaskStore";
import { useEffect, useState } from "react";
import ValidationModal from "../ValidationModal/ValidationModal";

interface TaskModalProps {
  taskId: number | null;
  onClose: () => void;
}

export default function TaskModal({ taskId, onClose }: TaskModalProps) {
  const initialTask = useTaskStore(
    (state) => state.tasks.find((t) => t.id === taskId) || null,
  );

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Низкий");
  const [completed, setCompleted] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDesc(initialTask.desc);
      setPriority(initialTask.priority);
      setCompleted(initialTask.completed);
    }
    setIsConfirmingDelete(false);
  }, [taskId, initialTask]);

  const handleSave = () => {
    if (!taskId) return;

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
    updateTask(taskId, {
      title: title.trim(),
      desc: desc.trim(),
      priority,
      completed,
    });

    onClose();
  };

  if (!initialTask) return null;

  return (
    <>
    <div className={styles["overlay"]}>
      <div className={styles["modal-box"]} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles["btn-close"]}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <div className={styles["modal-content"]}>
          <input
            type="text"
            className={styles["edit-title"]}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок задачи..."
          />

          <details className={styles["dropdown"]}>
            <summary className={styles["dropdown-trigger"]}>
              <span>Приоритет ({priority})</span>
              <ChevronDown size={14} className={styles["dropdown-chevron"]} />
            </summary>
            <div className={styles["dropdown-menu"]}>
              {(["Низкий", "Средний", "Высокий"] as const).map((prio) => (
                <button
                  key={prio}
                  type="button"
                  className={`${styles["dropdown-item"]} ${priority === prio ? styles["active"] : ""}`}
                  onClick={(e) => {
                    setPriority(prio);
                    e.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >
                  Приоритет ({prio})
                </button>
              ))}
            </div>
          </details>

          <textarea
            className={styles["edit-desc"]}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Описание задачи..."
          />

          <div className={styles["modal-footer"]}>
            <div className={styles["footer-left"]}>
              {!isConfirmingDelete ? (
                <button
                  className={styles["btn-delete"]}
                  onClick={() => setIsConfirmingDelete(true)}
                >
                  <Trash2 size={16} />
                  <span>Удалить</span>
                </button>
              ) : (
                <div className={styles["confirm-box"]}>
                  <span className={styles["confirm-text"]}>Точно?</span>
                  <button
                    className={styles["btn-confirm-yes"]}
                    onClick={() => {
                      deleteTask(initialTask.id);
                      onClose();
                    }}
                  >
                    Да
                  </button>
                  <button
                    className={styles["btn-confirm-no"]}
                    onClick={() => setIsConfirmingDelete(false)}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
            <div className={styles["footer-right"]}>
              <button
                className={`${styles["btn-status"]} ${completed ? styles["completed"] : ""}`}
                onClick={() => setCompleted(!completed)}
              >
                <Check size={16} />
                <span>{completed ? "Выполнено" : "Выполнить"}</span>
              </button>
              <button className={styles["btn-save"]} onClick={handleSave}>
                <Save size={16} />
                <span>Сохранить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {errorMsg && (
        <ValidationModal message={errorMsg} onClose={() => setErrorMsg(null)} />
      )}
      </>
  );
}
