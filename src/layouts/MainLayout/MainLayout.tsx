import { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../context/theme/ThemeContext";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const context = useContext(ThemeContext);

  if (!context) {
    return <Outlet />;
  }

  const { theme, toggleTheme } = context;

  return (
    <div className={styles["layout-wrapper"]}>
        <button
              className={styles["theme-toggle"]}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-top"]}>
          <div className={styles["logo"]}>
            <h2>Todolist</h2>
          </div>

          <nav className={styles["nav-menu"]}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
              }
            >
             О нас
            </NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
              }
            >
              Главная
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
              }
            >
              Задачи
            </NavLink>

            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`
              }
            >
              Статистика
            </NavLink>
          </nav>
        </div>
      </div>

      <main className={styles["content-area"]}>
        <Outlet />
      </main>
    </div>
  );
}
