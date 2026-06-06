import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles["container"]}>
      <main className={styles["main-content"]}>
        <h1 className={styles["title"]}>Todolist</h1>
        <p className={styles["subtitle"]}>
          Простой и удобный инструмент для планирования ваших ежедневных дел, 
          контроля задач и повышения личной продуктивности.
        </p>

        <div className={styles["divider"]} />

        <h3 className={styles["steps-title"]}>Как пользоваться приложением:</h3>
        
        <div className={styles["steps-list"]}>
          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>1</span>
            <span className={styles["step-text"]}>
              Заполните заголовок и описание в блоке «Добавить задачу».
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>2</span>
            <span className={styles["step-text"]}>
              Выберите приоритет (Низкий, Средний или Высокий) для правильной сортировки фокуса.
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>3</span>
            <span className={styles["step-text"]}>
              Нажмите «Создать» — задача мгновенно появится в вашем списке дел.
            </span>
          </div>

          <div className={styles["step-item"]}>
            <span className={styles["step-number"]}>4</span>
            <span className={styles["step-text"]}>
              Кликайте по карточке задачи для её редактирования, изменения статуса выполнения или удаления.
            </span>
          </div>
        </div>
      </main>

      <footer className={styles["footer"]}>
        <a 
          href="https://t.me/skamshik339" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles["tg-link"]}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span>Написать в Telegram</span>
        </a>
        <div className={styles["copyright"]}>
          created by aleksey-borovikov-dev
          <img src="src/assets/images/logo.jpg" className={styles['logo']}/>
        </div>
      </footer>
    </div>
  );
}
