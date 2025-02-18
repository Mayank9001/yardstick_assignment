import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personal Finance Visualizer</h1>
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.primary}`}>Add Transaction</button>
        <button className={`${styles.button} ${styles.secondary}`}>Go to Dashboard</button>
      </div>
      <ul className={styles.transactionList}>
        <li className={styles.transactionItem}>
          <span className={styles.transactionDetails}>Sample Transaction - $50 (Food)</span>
          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.primary}`}>Edit</button>
            <button className={`${styles.button} ${styles.secondary}`}>Delete</button>
          </div>
        </li>
      </ul>
      <div className={styles.insightsContainer}>
        <p className={`${styles.insightItem} ${styles.warning}`}>⚠ You have used 80% of your Food budget.</p>
        <p className={`${styles.insightItem} ${styles.danger}`}>⚠ You’ve exceeded your Transport budget!</p>
      </div>
    </div>
  );
}
