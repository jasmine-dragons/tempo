import Typography from "../Typography";
import styles from "./style.module.scss";
import Image from "next/image";

const AnimatedLogo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Typography variant="header" className={styles.header}>
          tempo.
        </Typography>
      </div>
      <Image
        className={styles.vinyl}
        src="/icons/vinyl.svg"
        width={332}
        height={332}
        alt="vinyl"
      />
    </div>
  );
};

export default AnimatedLogo;
