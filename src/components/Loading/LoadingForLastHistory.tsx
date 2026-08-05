import styles from "./LoadingForLastHistory.module.css";

export const LoadingForLastHistory = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
};