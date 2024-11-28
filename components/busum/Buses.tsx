import styles from "./Buses.module.css";
import Link from "next/link";
const Buses = () => {
  return (
    <div className={styles.parallaxBackground}>
      <div className="grid gap-8 grid-cols-3 justify-center"></div>
    </div>
  );
};

export default Buses;
