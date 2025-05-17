import { AppHeader} from "@/app/_ui/app/AppHeader";
import styles from "../page.module.css";

export default function Guides() {
  return (
    <div className={styles.page}>
        <AppHeader />
      <main className={styles.main}>
          <h1>Guides</h1>
      </main>
    </div>
  );
}
