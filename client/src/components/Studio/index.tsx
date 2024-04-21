import { useState } from "react";
import GenerativeAudio from "../GenerativeAudio";
import styles from "./style.module.scss";
import Typography from "../Typography";
import AnimatedLogo from "../AnimatedLogo";

export interface AudioProps {
  prompt: string;
  loading: boolean;
  file: Blob | null;
}

const Studio = () => {
  const [stop, setStop] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <AnimatedLogo />
      <div className={styles.music}>
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <GenerativeAudio stop={stop} restart={restart} />
        <div className={styles.buttons}>
          <button
            onClick={() => setRestart((r) => !r)}
            className={styles.button}
          >
            <Typography variant="body">replay all tracks.</Typography>
          </button>
          <button onClick={() => setStop((r) => !r)} className={styles.button}>
            <Typography variant="body">stop all tracks.</Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Studio;
