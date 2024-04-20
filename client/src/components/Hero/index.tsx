import { ChangeEventHandler } from "react";
import Typography from "../Typography";
import styles from "./style.module.scss";
import Image from "next/image";

interface HeroProps {
  user: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Hero = ({ user, onChange }: HeroProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Typography variant="header" className={styles.header}>
          tempo.
        </Typography>
        <Typography variant="body" className={styles.artist}>
          by:{" "}
          <input
            className={styles.input}
            type="text"
            value={user}
            onChange={onChange}
          />
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

export default Hero;
